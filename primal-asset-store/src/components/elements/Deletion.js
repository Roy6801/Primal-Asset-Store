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
      <label className="prompt">Delete Account ?</label>
      <label>
        Enter 'delete/{confirmKey}' for confirming deletion of your Account:
      </label>
      <input
        placeholder="Delete Account"
        onChange={(e) => {
          setConfirmation(e.target.value);
        }}
      />
      <div>
        <button
          type="button"
          disabled={!(confirmation === `delete/${confirmKey}`)}
          onClick={(e) => {
            confirmDelete(e);
          }}
        >
          Delete
        </button>
        <button onClick={(e) => setDelete(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Deletion;
