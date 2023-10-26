import React, { Fragment, useState } from "react";
import MemoCarComp from "./MemoCarComp";
import { Button, TextField, Typography } from "@mui/material";

const CarPage = () => {
  const [addCar, setAddCar] = useState([
    { name: "Tesle", km: 1000 },
    { name: "porche", km: 2000 },
    { name: "audi", km: 3000 },
  ]);

  return (
    <Fragment>
      <Typography>add new car</Typography>
      <TextField label="name" size="small" />
      <Button>add</Button>
      {addCar.map((car, index) => (
        <MemoCarComp key={index}>{car}</MemoCarComp>
      ))}
    </Fragment>
  );
};

export default CarPage;
