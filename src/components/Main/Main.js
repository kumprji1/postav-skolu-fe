import React from "react";

import './Main.scss'

const Main = (props) => {
  return (
    <main>
      <div className="main-content">{props.children}</div>
    </main>
  );
};

export default Main;
