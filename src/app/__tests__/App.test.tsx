import { describe, test, afterEach } from "@jest/globals";
import {
  cleanup,
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import App from "../App";
import { store } from "../store";

afterEach(cleanup);

// TODO: resolve the warning:
// "Warning: An update to App inside a test was not wrapped in act"
describe("App", () => {
  test("renders", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByTestId("searchInput")).toBeInTheDocument();
  });

  test("initial videos are present", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByTestId("searchInput")).toBeInTheDocument();
    expect(await screen.findByText(/Pants Velour/i)).toBeInTheDocument();
    expect((await screen.findAllByRole("figure")).length).toBe(20);
  });

  test("search", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText(/Death Destruction/i)).toBeInTheDocument();

    // We have 20 videos in the page
    expect((await screen.findAllByRole("figure")).length).toBe(20);

    // Make search
    userEvent.type(screen.getByRole("textbox"), "El Koala Veni paca to");

    await waitForElementToBeRemoved(() =>
      // Make sure that this video is remove from the document
      screen.queryByText(/Death Destruction/i)
    );

    // We have only searched video
    expect((await screen.findAllByRole("figure")).length).toBe(1);
    expect(await screen.findByText(/El Koala/i)).toBeInTheDocument();
  });
});
