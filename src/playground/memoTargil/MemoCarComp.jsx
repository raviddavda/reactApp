import { Typography } from "@mui/material";
import React, { memo } from "react";

const MemoCarComp = ({ children }) => {
  console.log("car render");
  return <Typography>{children}</Typography>;
};

export default memo(MemoCarComp);
