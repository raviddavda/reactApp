import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CardEditComponent = ({
  src,
  title,
  subtitle,
  phone,
  adress,
  cardNum,
}) => {
  const [cardInputs, setCardInputs] = useState({
    src: "",
    title: "",
    subtitle: "",
    phone: "",
    adress: "",
    cardNum: "",
  });

  const handleCardInputs = (e) => {
    setCardInputs((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Box>
      <Card sx={{ textAlign: "start", width: "30rem" }}>
        <TextField type="file" id="src" size="small" />
        <CardMedia component="video" src={cardInputs.src} autoPlay loop muted />
        <CardContent>
          <CardHeader title={title} subheader={subtitle} sx={{ p: 0, mb: 1 }} />
          <TextField
            type="text"
            id="title"
            label="Title"
            fullWidth
            size="small"
            value={cardInputs.title}
            onChange={handleCardInputs}
          />
          <TextField
            sx={{ mb: 1, mt: 1 }}
            type="text"
            id="subtitle"
            label="Subtitle"
            fullWidth
            size="small"
            value={cardInputs.subtitle}
            onChange={handleCardInputs}
          />
          <Divider />
          <Box sx={{ mt: 1 }}>
            <Typography fontWeight={700} variant="subtitle1" component="span">
              Phone:&nbsp;
            </Typography>
            <TextField
              type="text"
              id="phone"
              label="Phone"
              fullWidth
              size="small"
              value={cardInputs.phone}
              onChange={handleCardInputs}
            />
            <Typography fontWeight={700} variant="subtitle1" component="span">
              Adress:&nbsp;
            </Typography>
            <TextField
              type="text"
              id="adress"
              label="Adress"
              fullWidth
              size="small"
              value={cardInputs.adress}
              onChange={handleCardInputs}
            />
            <Typography fontWeight={700} variant="subtitle1" component="span">
              Card Number:&nbsp;
            </Typography>
            <TextField
              type="text"
              id="cardNum"
              label="Card Number"
              fullWidth
              size="small"
              value={cardInputs.value}
              onChange={handleCardInputs}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton>
              <CheckCircleIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardEditComponent;
