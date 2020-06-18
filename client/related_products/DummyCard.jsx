import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";

const DummyCard = () => {
  const useStyles = makeStyles({
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 8,
    },
    root: {
      visibility: "hidden",
    },
  });
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      container
      direction={"row"}
      justify="space-between"
      alignItems="center"
      spacing={3}
      margin="16px 0px 12px 0px"
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <AddIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          Add to Outfit
        </Typography>
        <Typography className={classes.pos} color="textSecondary"></Typography>
        <Typography variant="body2" component="p">
          <br />
        </Typography>
        <Box
          component="fieldset"
          mb={3}
          borderColor="transparent"
          visibility="hidden"
        >
          <Rating readOnly />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DummyCard;
