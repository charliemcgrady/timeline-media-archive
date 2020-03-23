import React, { useEffect } from "react";
import * as Uppy from "@uppy/core";
import UploadNavBar from "../UploadNavBar";
import { MediaType } from "~/rgb-commons/types/media";
import UppyWrapper from "../UppyWrapper";
import { CreatePhotosphereRequest } from "~/rgb-commons/types/api";
import {
  Typography,
  Grid,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import getUploadParameters from "~/components/profile/media/upload/getUploadParameters";
import AwsS3 from "@uppy/aws-s3";

const uppy = new Uppy.Uppy({ autoProceed: true });
uppy.use(AwsS3, { getUploadParameters });

const save = (request: CreatePhotosphereRequest) =>
  fetch(`/api/media/photosphere`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructions: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      backgroundColor: "white"
    }
  })
);

const UploadPhotospheres = () => {
  useEffect(
    () => {
      uppy.on("upload-success", (file: Uppy.UppyFile) => {
        save({ zipUrlKey: file.name, marzipanoKey: file.name.split(".")[0] });
      });
    },
    // uppy.on will set up a new event listener every time it is called
    // Make sure it's only called once so we don't end up with duplicate file entries
    []
  );

  const classes = useStyles();

  return (
    <UploadNavBar type={MediaType.PHOTOSPHERE}>
      <Grid container justify="center" className={classes.instructions}>
        <Typography variant="body2">
          <div>
            Contents should be a zip folder with Marizpano tiles,{" "}
            <i>thumbnail.jpg</i>, and <i>original.jpg</i>.
          </div>
        </Typography>
      </Grid>
      <UppyWrapper uppy={uppy} />
    </UploadNavBar>
  );
};

export default UploadPhotospheres;
