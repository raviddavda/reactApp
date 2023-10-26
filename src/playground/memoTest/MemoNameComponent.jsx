import { Typography } from "@mui/material";
import { memo } from "react";

const MemoNameComponent = ({ children }) => {
  console.log("MemoNameComponent rerender");
  return <Typography>{children}</Typography>;
};

export default memo(MemoNameComponent);
