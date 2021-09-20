import { useState, useRef } from "react";
import NotFound from "../NotFound";
import service from "../functions/service";
import Deletion from "../elements/Deletion";
import "../stylesheets/ViewProfile.css";

const ViewAccount = () => {
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const userData = useRef(user);

  var googleId;
  try {
    googleId = JSON.parse(
      window.localStorage.getItem("primal-UIG-asset-store-G10")
    ).googleId;
  } catch (e) {
    return <NotFound />;
  }

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
        <div>
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
          <button onClick={(e) => window.location.reload()}>Cancel</button>
        </div>
      );
    } else {
      return (
        <button
          type="submit"
          onClick={(e) => {
            setEdit(true);
          }}
        >
          Edit
        </button>
      );
    }
  };

  if (del) {
    return (
      <Deletion confirmKey={user.email1} type="account" setDelete={setDel} />
    );
  }

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
          <label>Email Id 1</label>
          <label>{user.email1}</label>
        </div>
        <div>
          <label>Email Id 2</label>
          <input
            value={user.email2 ? user.email2 : ""}
            placeholder="Edit Email Id 2"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, email2: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Phone No.</label>
          <input
            value={user.phoneNumber ? user.phoneNumber : ""}
            placeholder="Edit Phone Number"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, phoneNumber: e.target.value });
            }}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            value={user.password ? user.password : ""}
            placeholder="Set Password"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Coins</label>
          <label>{user.coins}</label>
        </div>
        <div>
          <label>Account Created On</label>
          <label>{user.accountCreationDate}</label>
        </div>
        <div>
          <label>Assets Downloaded</label>
          <label>{user.assetsDownloaded}</label>
        </div>
        <div>
          <label>Assets Purchased</label>
          <label>{user.assetsPurchased}</label>
        </div>
        <div>
          <label>Plan</label>
          <label>{user.planId}</label>
        </div>
        <SEButton />
        <button
          type="button"
          onClick={(e) => {
            setDel(true);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
};

export default ViewAccount;
