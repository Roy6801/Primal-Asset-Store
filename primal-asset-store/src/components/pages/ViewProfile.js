import { useState, useRef } from "react";
import NotFound from "../NotFound";
import service from "../functions/service";
import "../stylesheets/ViewProfile.css";

const ViewProfile = () => {
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const userData = useRef(user);

  const googleId = JSON.parse(
    window.localStorage.getItem("primal-UIG-asset-store-G10")
  ).googleId;

  const SEButton = () => {
    const saveNew = (e) => {
      service
        .editProfile(user.googleId, user)
        .then((resp) => {
          console.log(resp.status);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (edit) {
      return (
        <button
          type="submit"
          onClick={(e) => {
            if (userData.current !== user) {
              saveNew(e);
            }
            setEdit(false);
          }}
        >
          Save
        </button>
      );
    } else {
      return (
        <button
          onClick={(e) => {
            setEdit(true);
          }}
        >
          Edit
        </button>
      );
    }
  };

  if (!user) {
    service
      .verify(googleId)
      .then((resp) => {
        userData.current = resp.data;
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return <NotFound />;
  } else {
    return (
      <div style={{ backgroundColor: "yellow" }}>
        <div>
          <label>Avatar</label>
          <img src={user.imageURL} />
        </div>
        <div>
          <label>Username</label>
          <input
            value={user.userName ? user.userName : ""}
            placeholder="Set Username"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, userName: e.target.value });
            }}
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            value={user.firstName}
            placeholder="Edit First Name"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, firstName: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={user.lastName}
            placeholder="Edit Last Name"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, lastName: e.target.value });
            }}
          />
        </div>

        <div>
          <label>Bio</label>
          <input
            value={user.bio ? user.bio : ""}
            placeholder="Edit Your Bio"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, bio: e.target.value });
            }}
          />
        </div>
        <SEButton />
      </div>
    );
  }
};

export default ViewProfile;
