import { useState, useRef } from "react";
import NotFound from "../NotFound";
import service from "../functions/service";
import "../stylesheets/ViewProfile.css";

const ViewProfile = () => {
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(false);
  const [reject, setReject] = useState(false);
  const userData = useRef(user);
  const [userName, setUserName] = useState();

  var googleId;
  try {
    googleId = JSON.parse(
      window.localStorage.getItem("primal-UIG-asset-store-G10")
    ).googleId;
  } catch (e) {
    return <NotFound />;
  }

  const PromptExists = () => {
    if (reject) {
      return <label>Username Exists</label>;
    }
    return null;
  };

  const checkUsername = (e) => {
    const val = e.target.value;
    service
      .usernameExists(val)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          setReject(false);
        }
      })
      .catch((err) => {
        console.log(userName);
        if (userName !== val) {
          setReject(true);
        }
      });
  };

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
              disabled={reject}
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
        <div className="buttonedit">
          <button
            id="btnid"
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

  if (!user) {
    service
      .verify(googleId)
      .then((resp) => {
        userData.current = resp.data;
        setUserName(resp.data.userName);
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return <NotFound />;
  } else {
    return (
      <div className="profilebackground">
        <div className="components">
          <div className="center">
            <div className="label">
              <label>Avatar : </label>
            </div>
            <div className="input-field">
              <img className="input-box" src={user.imageURL} />
            </div>
          </div>
          <div className=" center">
            <div className="label">
              <label>Username :</label>
            </div>
            <div className="input-field">
              <input
                className="input-box"
                value={user.userName ? user.userName : ""}
                placeholder="Set Username"
                disabled={!edit}
                onChange={(e) => {
                  checkUsername(e);
                  setUser({ ...user, userName: e.target.value });
                }}
              />
            </div>
          </div>
          <PromptExists />
          <div className=" center">
            <div className="label">
              <label>First Name :</label>
            </div>
            <div className="input-field">
              <input
                className="input-box"
                value={user.firstName}
                placeholder="Edit First Name"
                disabled={!edit}
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
                }}
              />
            </div>
          </div>
          <div className=" center">
            <div className="label">
              <label>Last Name :</label>
            </div>
            <div className="input-field">
              <input
                className="input-box"
                value={user.lastName}
                placeholder="Edit Last Name"
                disabled={!edit}
                onChange={(e) => {
                  setUser({ ...user, lastName: e.target.value });
                }}
              />
            </div>
          </div>

          <div className=" center">
            <div className="label">
              <label>Bio :</label>
            </div>
            <div className="input-field">
              <textarea
                className="input-box"
                value={user.bio ? user.bio : ""}
                placeholder="Edit Your Bio"
                disabled={!edit}
                onChange={(e) => {
                  setUser({ ...user, bio: e.target.value });
                }}
              />
            </div>
          </div>
          <SEButton />
        </div>
      </div>
    );
  }
};

export default ViewProfile;
