import * as React from "react";
import "../../index.css";
export default function LoadingSpinner() {
  return (
    <div className="spinner-main">
      <div className="spinner-container ">
        <div className="lds-dual-ring"></div>
      </div>
    </div>
  );
}