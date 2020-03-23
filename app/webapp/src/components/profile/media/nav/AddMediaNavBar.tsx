import React, { FunctionComponent } from "react";
import NavBar from "~/components/pure/affordances/NavBar";

const AddMediaNavBar: FunctionComponent<{}> = ({ children }) => {
  return (
    <div>
      <NavBar title="Manage media">{children}</NavBar>
    </div>
  );
};

export default AddMediaNavBar;
