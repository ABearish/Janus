import React from "react";
import {
  IconButton,
  makeStyles,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { getDefaultImg } from "./../utility/relatedUtility.js";

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
}));

const AddOutFitCard = ({ addOutfit, id, styles }) => {
  const displayPhoto = () => {
    let photoResults = getDefaultImg(styles);
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

  const classes = useStyles();
  return (
    <GridListTile cols={12}>
      {displayPhoto()}
      <GridListTileBar
        titlePosition="top"
        title="Add to Outfits"
        subtitle=" "
        actionIcon={
          <IconButton
            aria-label="primary"
            className={classes.icon}
            onClick={() => {
              addOutfit(id, styles);
            }}
          >
            <AddIcon />
          </IconButton>
        }
      />
      <GridListTileBar
        titlePosition="bottom"
        actionIcon={<IconButton aria-label={`primary`}></IconButton>}
      />
    </GridListTile>
  );
};

export default AddOutFitCard;
