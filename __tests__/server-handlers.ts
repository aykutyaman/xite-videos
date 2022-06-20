import { rest } from "msw";
import { config } from "dotenv";
import { validData } from "./sampleData";

const { REACT_APP_API_ENDPOINT: url } = config().parsed;

export const handlers = [
  rest.get(`${url}`, async (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...validData,
      })
    );
  }),
];
