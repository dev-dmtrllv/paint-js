import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";
import { ProjectPanel } from "components";
import { modalStore } from "./stores";

import "./index.scss";

// modalStore.open({ title: "New Project...", body: <ProjectPanel /> });

ReactDOM.render(<App />, document.getElementById("root"));