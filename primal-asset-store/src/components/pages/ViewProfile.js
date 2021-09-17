import { useState } from "react";
import NotFound from "../NotFound";
import service from "../functions/service";

const ViewProfile = () => {
  const [user, setUser] = useState();

  const googleId = JSON.parse(
    window.localStorage.getItem("primal-UIG-asset-store-G10")
  ).googleId;

  console.log(user);

  if (!user) {
    service
      .verify(googleId)
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return <NotFound />;
  } else {
    return <div></div>;
  }
};

export default ViewProfile;
