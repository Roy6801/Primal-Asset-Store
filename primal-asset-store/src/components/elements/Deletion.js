import { useState } from "react";
import { useHistory } from "react-router-dom";
import service from "../functions/service";
import "../stylesheets/Deletion.css";

const Deletion = ({ confirmKey, type, setDelete }) => {
  const googleId = JSON.parse(
    window.localStorage.getItem("primal-UIG-asset-store-G10")
  ).googleId;

  const history = useHistory();

  const confirmDelete = (e) => {
    if (type === "account") {
      service
        .deleteAccount(googleId)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 204) {
            window.localStorage.removeItem("primal-UIG-asset-store-G10");
            history.push("");
            window.location.reload();
          } else {
            alert("Account Deletion Failed!");
            setDelete(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "asset") {
    }
  };

  const [confirmation, setConfirmation] = useState();

  return (
    <div className="confirm-popup">
      <div id="box-id" className="components-del">
        <div className="center align-box">
          <label className="prompt">Delete Account ?</label>
        </div>
        <div className="center align-box">
          <label>
            Enter '<label id="dellabel">delete/{confirmKey}</label>' for
            confirming deletion of your Account:
          </label>
        </div>
        <div className="center align-box">
          <input
            className="input-container"
            placeholder="Delete Account"
            onChange={(e) => {
              setConfirmation(e.target.value);
            }}
          />
        </div>
        <div className="btn-container">
          <div className="button-box">
            <button
              id="del"
              type="button"
              disabled={!(confirmation === `delete/${confirmKey}`)}
              onClick={(e) => {
                confirmDelete(e);
              }}
            >
              Delete
            </button>
            <div className="button-box">
              <button id="btnid" onClick={(e) => setDelete(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deletion;
