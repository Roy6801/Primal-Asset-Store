import { useState } from "react";
import service from "../functions/service";
import SetPay from "./SetPay";

const Publish = () => {
  const [devMode, setDevMode] = useState(0);

  if (!devMode) {
    //request for info
    setDevMode(1);
  }

  if (devMode === -1) {
    return <SetPay />;
  } else if (devMode === 1) {
    return (
      <div>
        <h1>Publish</h1>
      </div>
    );
  }
};

export default Publish;
