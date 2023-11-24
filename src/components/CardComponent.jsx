import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import Tooltip from "@mui/material/Tooltip";

const CardComponent = ({
  _id,
  title,
  subTitle,
  phone,
  address,
  img,
  alt,
  like,
  email,
  onCallCard,
  onDeleteCard,
  onEditCard,
  onFavCard,
}) => {
  const handlePhoneClick = () => {
    onCallCard(_id);
  };
  const handleDeleteCardClick = () => {
    onDeleteCard(_id);
  };
  const handleClickEditCard = () => {
    onEditCard(_id);
  };
  const handleFavCard = () => {
    onFavCard(_id);
  };
  return (
    <Card>
      <CardActionArea component={Link} to={`${ROUTES.CARDPAGE}/${_id}`}>
        <CardMedia
          component="img"
          image={img}
          alt={alt}
          sx={{ maxHeight: "195px" }}
        />
      </CardActionArea>
      <CardContent>
        <CardHeader title={title} subheader={subTitle} sx={{ p: 0, mb: 1 }} />
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Email:{" "}
            </Typography>
            {email}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Address:{" "}
            </Typography>
            {address}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Tooltip title="Call" arrow>
              <IconButton onClick={handlePhoneClick}>
                <PhoneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" arrow>
              <IconButton onClick={handleClickEditCard}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title="Delete" arrow>
              <IconButton onClick={handleDeleteCardClick}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Like" arrow>
              <IconButton onClick={handleFavCard}>
                <FavoriteIcon color={like ? "heart" : ""} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  like: PropTypes.any,
  cardNumber: PropTypes.number,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
};
CardComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};

export default CardComponent;
