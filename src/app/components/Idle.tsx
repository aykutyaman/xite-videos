import { memo } from "react";

const Idle = memo(() => {
  console.log("IDLE::render");
  return <>idle</>;
});

export default Idle;
