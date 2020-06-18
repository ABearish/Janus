import React, { useState, useEffect } from "react";
import Outfitcards from "./Outfitcards";
import { Grid, IconButton } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import AddOutFitCard from "./AddOutFitCard";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";
import DummyCard from './DummyCard'

const OutfitItems = ({
  onDeleteOutfit,
  styles,
  onAddOutfit,
  id,
  info,
  outfit,
  onUpdateOutfit,
}) => {
  const [limit, setLimit] = useState(0);
  useEffect(() => {
    onUpdateOutfit();
  }, []);

  const useStyles = makeStyles(() => ({
    gridList: {
      display: "flex-start",
      justify: "flex-start",
      overflow: "hidden",
      alignItems: "flex-start",
      alignContent: "flex-start",
      flexWrap: "nowrap",
    },
    arrows: {
      size: "small",
    },
    dummyCard: {
      visibility: "hidden",
    },
  }));
  const classes = useStyles();

  // controls the upper limit for the carousel
  const increase = () => {
    if (limit > outfit.length - 1) {
      setLimit(outfit.length - 1);
    } else {
      setLimit(limit + 1);
    }
  };
  // controls the lower limit for the carousel
  const decrease = () => {
    if (limit < 0) {
      setLimit(0);
    } else {
      setLimit(limit - 1);
    }
  };

  // function that controls whether the left arrow button will render or be hidden
  const decreaseButtonAction = () => {
    if (limit === 0) {
      return <ArrowBackIosIcon visibility="hidden" />;
    } else {
      return (
        <IconButton aria-label={`setting`} onClick={decrease}>
          <ArrowBackIosIcon />
        </IconButton>
      );
    }
  };
  // function that controls whether the right arrow button will render or be hidden
  const increaseButtonAction = () => {
    if (limit === outfit.length - 2) {
      return <ArrowForwardIosIcon visibility="hidden" />;
    } else if (outfit.length <= 2) {
      return <ArrowForwardIosIcon visibility="hidden" />;
    } else if (!outfit.length) {
      return <ArrowForwardIosIcon visibility="hidden" />;
    } else {
      return (
        <IconButton aria-label={`setting`} onClick={increase}>
          <ArrowForwardIosIcon />
        </IconButton>
      );
    }
  };

  const getOutfits = () => {
    if (outfit === null) {
      return (
        <Grid
          container
          direction={"row"}
          justify="space-between"
          alignItems="center"
          spacing={3}
          margin="16px 0px 12px 0px"
        >
          <AddOutFitCard
            addOutfit={onAddOutfit}
            id={id}
            styles={styles}
            visibility="hidden"
          />
          <DummyCard className={classes.dummyCard} />
          <DummyCard className={classes.dummyCard} />
        </Grid>
      );
    } else if (outfit.length === 1) {
      return (
        <GridList className={classes.gridList} cols={12}>
          {decreaseButtonAction()}
          <AddOutFitCard addOutfit={onAddOutfit} id={id} styles={styles} />
          {outfit.slice(limit, limit + 2).map((item, i) => {
            return (
              <Outfitcards
                key={Math.random()}
                item={item}
                removeOutfit={onDeleteOutfit}
                info={info}
                styles={styles}
                onUpdateOutfit={onUpdateOutfit}
              />
            );
          })}
          <DummyCard className={classes.dummyCard} />
          {increaseButtonAction()}
        </GridList>
      );
    } else {
      return (
        <GridList className={classes.gridList} cols={12}>
          {decreaseButtonAction()}
          <AddOutFitCard addOutfit={onAddOutfit} id={id} styles={styles} />
          {outfit.slice(limit, limit + 2).map((item, i) => {
            return (
              <Outfitcards
                key={Math.random()}
                item={item}
                removeOutfit={onDeleteOutfit}
                info={info}
                styles={styles}
              />
            );
          })}
          {increaseButtonAction()}
        </GridList>
      );
    }
  };

  return <div>{getOutfits()}</div>;
};

export default OutfitItems;
