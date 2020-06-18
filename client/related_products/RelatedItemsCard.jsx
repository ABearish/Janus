import React, { useEffect } from "react";
import {
  IconButton,
  Typography,
  makeStyles,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ComparisonModal from "./ComparisonModal";
import {
  salePrice,
  avgRatings,
  getDefaultImg,
} from "./../utility/relatedUtility.js";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "rgba(255, 215, 0, 1)",
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

const relatedItemsCard = (props) => {
  const { item, id, info } = props;
  const classes = useStyles();

  useEffect(() => {
    displayComparison();
  }, []);

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
        <Typography variant="body2" component="p">
          {`$${results}`}
        </Typography>
      );
    }
  };
  const displayComparison = () => {
    if (!info && !item) {
      return null;
    } else {
      return <ComparisonModal currentItem={item} info={info} />;
    }
  };
  const showRating = () => {
    let rating = avgRatings(item.ratings);
    if (rating === 0 || undefined) {
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
        title={item.name}
        subtitle={item.category}
        actionIcon={
          <IconButton aria-label={`primary`}>{displayComparison()}</IconButton>
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
export default relatedItemsCard;
