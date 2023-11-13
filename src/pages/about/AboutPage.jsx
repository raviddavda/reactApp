import { Divider, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const AboutPage = () => {
  return (
    <Fragment>
      <Typography color="primary" component="h1" variant="h1">
        About
      </Typography>
      <Typography component="h5" variant="h5">
        Bcard is a website of a collection of Business Cards available for you
        to view, call, like and make your own business card for other people to
        view.
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Typography>
        Start browsing cards right away by clicking{" "}
        <Typography component={Link} to={ROUTES.HOME}>
          Here
        </Typography>
        .
      </Typography>
    </Fragment>
  );
};

export default AboutPage;
