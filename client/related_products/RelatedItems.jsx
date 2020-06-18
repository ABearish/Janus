import React, { useEffect, useState } from "react";
import { GridList, makeStyles } from "@material-ui/core";
import RelatedItemsCard from "./RelatedItemsCard";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
}));

const RelatedItems = (props) => {
  const { relatedProducts, id, onGetRelated, info } = props;

  const [limit, setLimit] = useState(0);

  useEffect(() => {
    onGetRelated(id);
  }, []);

  const classes = useStyles();
  const increase = () => {
    if (limit >= relatedProducts.state.length - 1) {
      setLimit(relatedProducts.state.length - 1);
    } else {
      setLimit(limit + 1);
    }
  };

  const decrease = () => {
    if (limit === 0) {
      setLimit(0);
    } else {
      setLimit(limit - 1);
    }
  };
  const decreaseButtonAction = () => {
    if (limit === 0) {
      return (
        <ArrowBackIosIcon visibility="hidden" className={classes.arrows} />
      );
    } else if (limit.length === 0) {
      return (
        <IconButton aria-label={`setting`} onClick={decrease}>
          <ArrowBackIosIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          aria-label={`setting`}
          onClick={decrease}
          className={classes.arrows}
        >
          <ArrowBackIosIcon />
        </IconButton>
      );
    }
  };
  const increaseButtonAction = () => {
    if (limit === relatedProducts.state.length - 3) {
      return <ArrowForwardIosIcon visibility="hidden" />;
    } else if (limit.length === 0) {
      return (
        <IconButton
          aria-label={`setting`}
          onClick={increase}
          visibility="hidden"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          aria-label={`setting`}
          onClick={increase}
          visibility="hidden"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      );
    }
  };

  const getReleatedItems = () => {
    if (!relatedProducts.state) {
      return null;
    } else {
      return (
        <GridList className={classes.gridList} cols={12}>
          {decreaseButtonAction()}
          {relatedProducts.state.slice(limit, limit + 3).map((item, i) => {
            if (i === limit || i < limit + 3) {
              return (
                <RelatedItemsCard key={i} item={item} id={id} info={info} />
              );
            } else {
              return null;
            }
          })}
          {increaseButtonAction()}
        </GridList>
      );
    }
  };
  return <div>{getReleatedItems()}</div>;
};
export default RelatedItems;
