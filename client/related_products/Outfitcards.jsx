import React from "react";
import {
  IconButton,
  Typography,
  makeStyles,
  GridListTile,
  GridListTileBar
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Rating from "@material-ui/lab/Rating";
import { getDefaultImg } from "../utility/relatedUtility.js";
import { salePrice, avgRatings } from "./../utility/relatedUtility.js";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "rgba(255, 255, 255, 1)",
  },
  media: {
    minWidth: 325,
    maxWidth: 325,
    minHeight: 335,
    maxHeight: 335,
  },
  title: {
    color: theme.palette.primary.dark,
  },
}));

const Outfitcards = ({ removeOutfit, item }) => {
  const classes = useStyles();
  const displayPhoto = () => {
    let photoResults = getDefaultImg(item.styles);
    if (photoResults === "No Photo Available") {
      return (
        <img
          className={classes.media}
          src={`https://images.unsplash.com/photo-1577460551100-907ba84418ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1948&q=80`}
        />
      );
    } else {
      return <img className={classes.media} src={photoResults} />;
    }
  };

  const stylePrice = () => {
    let results = salePrice(item.styles);
    if (!results) {
      return (
        <Typography variant="body2" component="p">
          {`$${results}`}
        </Typography>
      );
    } else {
      return (
        <Typography variant="body2" component="p" color="inherit">
          {`$${results}`}
        </Typography>
      );
    }
  };

  const showRating = () => {
    let rating = avgRatings(item.ratings);
    if (!rating) {
      return <Rating name="read-only" value={0} readOnly />;
    } else {
      return <Rating name="read-only" value={rating} readOnly />;
    }
  };
  
  return (
    <GridListTile cols={12}>
      {displayPhoto()}
      <GridListTileBar
        titlePosition="top"
        title={item.results.name}
        subtitle={item.results.category}
        actionIcon={
          <IconButton
            aria-label={`primary`}
            className={classes.icon}
            onClick={() => {
              removeOutfit(item.results.id);
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        }
      />
      <GridListTileBar
        titlePosition="bottom"
        title={stylePrice()}
        actionIcon={
          <IconButton aria-label={`setting`}>{showRating()}</IconButton>
        }
      />
    </GridListTile>
  );
};

export default Outfitcards;
