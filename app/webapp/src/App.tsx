import React from "react";
import Routes from "./Routes";
import PhotoswipeBoilerplate from "./components/pure/widgets/photoswipe/PhotoswipeBoilerplate";
import "./App.css";

const App = () => {
  return (
    <div>
      <PhotoswipeBoilerplate />
      <Routes />
    </div>
  );
};

export default App;
