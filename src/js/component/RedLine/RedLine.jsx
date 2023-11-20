import React from "react";
import "./redLine.css";

const RedLine=({ type })=> {
  return <div className={`${type === "small" ? "small" : "redLine"}`}></div>;
}

export default RedLine