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
      <form style={{ backgroundColor: "yellow" }}>
        <div>
          <label>Avatar</label>
          <img src={user.imageURL} />
        </div>
        <div>
          <label>Username</label>
          <input
            value={user.userName}
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
          <label>Email Id 1</label>
          <label>{user.email1}</label>
        </div>
        <div>
          <label>Email Id 2</label>
          <input
            value={user.email2}
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
            value={user.phoneNumber}
            placeholder="Edit Phone Number"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, phoneNumber: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Bio</label>
          <input
            value={user.bio}
            placeholder="Edit Your Bio"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, bio: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={user.securityPin}
            placeholder="Set Password"
            disabled={!edit}
            onChange={(e) => {
              setUser({ ...user, securityPin: e.target.value });
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
      </form>
    );
  }
};

export default ViewProfile;
