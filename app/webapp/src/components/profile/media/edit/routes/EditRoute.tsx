import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import RouteMap from "./RouteMap";

interface Props extends RouteComponentProps<{ id: string }> {}

const EditCollections: FunctionComponent<Props> = ({}) => {
  return (
    <div>
      <RouteMap />
    </div>
  );
};

export default EditCollections;
