import React, { useState } from "react";
import {
  Modal,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import CompareIcon from "@material-ui/icons/Compare";

const getModalStyle = () => {
  const top = 0;
  const left = 0;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
  },
  compareItem: {
    width: "33%",
  },
  icon: {
    color: "rgba(237, 237, 220, 1)",
  },
}));

const ComparisonModal = ({ currentItem, info }) => {
  const makeComparison = (info, currentItem) => {
    let results = {};
    if (info) {
      info.forEach((feature) => {
        results[feature.feature] = {
          left: feature.value,
        };
      });
    }
    if (currentItem) {
      currentItem.forEach((feature) => {
        if (results[feature.feature] !== undefined) {
          results[feature.feature].right = feature.value;
        } else {
          results[feature.feature] = {
            right: feature.value,
          };
        }
      });
    }
    return results;
  };

  let comparisonObj = makeComparison(info.features, currentItem.features);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [displayModal, setDisplayModal] = useState(false);

  const handleClick = () => {
    if (!displayModal) {
      setDisplayModal(true);
    } else {
      setDisplayModal(!displayModal);
    }
  };

  const handleOtherClick = () => {
    setDisplayModal(!displayModal);
  };

  const body = (item, side) => {
    if (item === undefined || item === false || item === null) {
      return <ListItemText className={classes.compareItem}></ListItemText>;
    }

    if (item == true) {
      return (
        <ListItemText
          className={classes.compareItem}
          style={{ contentAlign: side }}
        ></ListItemText>
      );
    } else {
      return (
        <ListItemText
          className={classes.compareItem}
          style={{ textAlign: side }}
        >
          ✔️
        </ListItemText>
      );
    }
  };

  return (
    <div>
      <CompareIcon
        className={classes.icon}
        onClick={handleClick}
        size="small"
      />
      <Modal
        open={displayModal}
        onClose={handleOtherClick}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <List className={classes.paper}>
          <ListItem divider={true}>
            <ListItemText
              className={classes.compareItem}
              style={{ textAlign: "left" }}
            >
              {info.name}
            </ListItemText>
            <ListItemText className={classes.compareItem}></ListItemText>
            <ListItemText
              className={classes.compareItem}
              style={{ textAlign: "right" }}
              primaryTypographyProps={{ align: "right" }}
            >
              {currentItem.name}
            </ListItemText>
          </ListItem>
          {Object.keys(comparisonObj).map((feature, i) => {
            let left = comparisonObj[feature].left;
            let right = comparisonObj[feature].right;
            if (
              (left !== undefined && left !== false && left !== null) ||
              (right !== undefined && right !== false && right !== null)
            ) {
              return (
                <ListItem divider={true} key={i}>
                  {body(left, "left")}
                  <ListItemText
                    className={classes.compareItem}
                    style={{ textAlign: "center" }}
                  >
                    {feature}
                  </ListItemText>
                  {body(right, "right")}
                </ListItem>
              );
            }
          })}
        </List>
      </Modal>
    </div>
  );
};
export default ComparisonModal;
