import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App";
import { store } from "./app/store";

const container = document.querySelector("#app");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
