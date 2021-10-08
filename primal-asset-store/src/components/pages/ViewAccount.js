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
          <div className="buttonsave">
            <button
              id="btnid"
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
          </div>
          <div className="buttoncancel">
            <button id="btnid" onClick={(e) => window.location.reload()}>
              Cancel
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="buttonsave">
          <button
            id="btnid"
            className="center"
            type="submit"
            onClick={(e) => {
              setEdit(true);
            }}
          >
            Edit
          </button>
        </div>
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
      <div className="profilebackground ">
        <div className=" components-acc">
          <div className="  center">
            <div className="label">
              <label>Email Id 1</label>
            </div>
            <div className="input-field">
              <label className="input-box">{user.email1}</label>
            </div>
          </div>
          <div className="  center">
            <div className="label">
              <label>Email Id 2</label>
            </div>
            <div className="input-field">
              <input
                className="input-box"
                value={user.email2 ? user.email2 : ""}
                placeholder="Edit Email Id 2"
                disabled={!edit}
                onChange={(e) => {
                  setUser({ ...user, email2: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="  center">
            <div className="label">
              <label>Phone No.</label>
            </div>
            <div className="input-field">
              <input
                className="input-box"
                value={user.phoneNumber ? user.phoneNumber : ""}
                placeholder="Edit Phone Number"
                disabled={!edit}
                onChange={(e) => {
                  setUser({ ...user, phoneNumber: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="  center">
            <div className="label">
              <label>Password</label>
            </div>
            <div className="input-field">
              <input
                className="input-box"
                value={user.password ? user.password : ""}
                placeholder="Set Password"
                disabled={!edit}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="  center">
            <div className="label">
              <label>Coins</label>
            </div>
            <div className="input-field">
              <label className="input-box">{user.coins}</label>
            </div>
          </div>
          <div className="  center">
            <div className="label">
              <label>Account Created On</label>
            </div>
            <div className="input-field">
              <label className="input-box">{user.accountCreationDate}</label>
            </div>
          </div>
          <div className="  center">
            <div className="label">
              <label>Assets Downloaded</label>
            </div>
            <div className="input-field">
              <label className="input-box">{user.assetsDownloaded}</label>
            </div>
          </div>
          <div className="  center">
            <div className="label">
              <label>Assets Purchased</label>
            </div>
            <div className="input-field">
              <label className="input-box">{user.assetsPurchased}</label>
            </div>
          </div>
          <div className="  center">
            <div className="label">
              <label>Plan</label>
            </div>
            <div className="input-field">
              <label className="input-box">{user.planId}</label>
            </div>
          </div>
          <div>
            <div style={{ display: "inline-block" }}>
              <SEButton />
            </div>
            <div className="buttondel">
              <button
                id="btnid"
                type="button"
                onClick={(e) => {
                  setDel(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ViewAccount;
