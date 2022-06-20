import { IOError } from "../domain";

// The functions to create domain objects

export const ioError = <T>(message: string, data: T): IOError => ({
  type: "IOError",
  message,
  data,
});
