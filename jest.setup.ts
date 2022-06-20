import "whatwg-fetch";
import "@testing-library/jest-dom";

import { setupServer } from "msw/node";
import { handlers } from "./__tests__/server-handlers";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

// print any request that is not handled by the mock handlers, and goes actually
// to the server
server.listen({
  onUnhandledRequest: "warn",
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
