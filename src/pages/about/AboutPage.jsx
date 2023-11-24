import { Divider, Typography } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const AboutPage = () => {
  return (
    <Fragment>
      <Typography color="primary" component="h1" variant="h1">
        About Us
      </Typography>
      <Typography component="h5" variant="h5">
        Welcome to BCard, the ultimate destination for creating, sharing, and
        discovering innovative business card designs!
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Typography color="primary" component="h2" variant="h2">
        What We Offer
      </Typography>
      <Typography mb={3}>
        <Typography
          component={Link}
          to={ROUTES.HOME}
          variant="h6"
          color="primary"
          sx={{ textDecoration: "underline", mb: 2 }}
        >
          Discover:
        </Typography>{" "}
        Explore a diverse gallery of business card designs crafted by talented
        individuals from around the world. Find inspiration, explore trending
        styles, and discover innovative ideas to make your mark.
      </Typography>
      <Typography mb={3}>
        <Typography
          component={Link}
          to={ROUTES.CARDCREATE}
          variant="h6"
          color="primary"
          sx={{ textDecoration: "underline", mb: 2 }}
        >
          Create:
        </Typography>{" "}
        Unleash your creativity with our intuitive and user-friendly design
        tools. Customize every aspect of your business card, from fonts and
        colors to layout and graphics. Tailor your card to reflect your brand
        and personality effortlessly.
      </Typography>
      <Typography mb={3}>
        <Typography
          component={Link}
          to={ROUTES.REGISTER}
          variant="h6"
          color="primary"
          sx={{ textDecoration: "underline", mb: 2 }}
        >
          Get Involved:
        </Typography>{" "}
        Whether you're an aspiring designer, a seasoned professional, or simply
        passionate about innovative business card designs, BCard welcomes you!
        Join our community, share your creations, and be part of a platform
        dedicated to celebrating uniqueness and creativity.
      </Typography>
      <Typography component="h5" variant="h5">
        Join BCard today and redefine the way you network and showcase your
        identity through stunning business card designs!
      </Typography>
    </Fragment>
  );
};

export default AboutPage;
