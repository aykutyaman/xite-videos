import { useEffect, useMemo, ComponentType, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Video } from "../../domain";
import { AppDispatch } from "../store";
import Fuse from "fuse.js";
import { debounceTime, Subject } from "rxjs";
import Search from "../components/Search";
import { byId as byIdSelector } from "../selectors";

function Container<T>(Component: ComponentType<T>) {
  const result = memo((props: Omit<T, "onChange">) => {
    const dispatch = useDispatch<AppDispatch>();

    const byId = useSelector(byIdSelector);

    const fuse = useMemo(() => {
      const allVideos = Object.keys(byId).map((key) => byId[Number(key)]);

      return new Fuse<Video>(allVideos, {
        keys: ["title", "artist"],
      });
    }, [byId]);

    const query$ = useMemo(() => {
      return new Subject<string>(); // Create a query stream, similar to an event emitter
    }, []);

    useEffect(() => {
      // subscribe to the query$ stream
      query$.pipe(debounceTime(500)).subscribe((query) => {
        const result = fuse.search(query, { limit: 50 }).map((x) => x.item.id);
        dispatch({
          type: "Act::SearchChanged",
          payload: result,
          searchText: query,
        });
      });
      return () => {
        query$.unsubscribe();
      };
    }, []);

    const onChange = useCallback((value: string) => {
      // emit the value to the query$
      query$.next(value);
    }, []);

    return <Component {...(props as T)} onChange={onChange} />;
  });

  result.displayName = "SearchContainer";

  return result;
}

export default Container(Search);
