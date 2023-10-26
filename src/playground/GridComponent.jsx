import { Grid } from "@mui/material";
import React from "react";
import CardComponent from "../components/CardComponent";
import nextKey from "generate-my-key";

let dataFromServer = [
  {
    src: "/assets/videos/brawlhalla.mp4",
    title: "Brawlhalla Highlights",
    subtitle: "Artemis - Scythe",
    alt: "Brawlhalla Video",
    phone: "0524307126",
    adress: "Brawlheaven",
    cardNum: 40004001,
  },
  {
    src: "/assets/videos/brawlhalla2.mp4",
    title: "Brawlhalla Highlights",
    subtitle: "Artemis - Scythe",
    alt: "Brawlhalla Video",
    phone: "0524307126",
    adress: "Brawlheaven",
    cardNum: 40004002,
  },
  {
    src: "/assets/videos/brawlhalla3.mp4",
    title: "Brawlhalla Highlights",
    subtitle: "Yumiko - Hammer",
    alt: "Brawlhalla Video",
    phone: "0524307126",
    adress: "Brawlheaven",
    cardNum: 40004003,
  },
  {
    src: "/assets/videos/brawlhalla4.mp4",
    title: "Brawlhalla Highlights",
    subtitle: "Nix - Blasters",
    alt: "Brawlhalla Video",
    phone: "0524307126",
    adress: "Brawlheaven",
    cardNum: 40004004,
  },
];

const GridComponent = () => {
  return (
    <Grid container spacing={2}>
      {dataFromServer.map((card) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={nextKey()}>
          <CardComponent
            src={card.src}
            title={card.title}
            subtitle={card.subtitle}
            phone={card.phone}
            adress={card.adress}
            cardNum={card.cardNum}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridComponent;
