import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import service from "./functions/service";
import "./stylesheets/Home.css";

const SearchBar = ({ typeId }) => {
  const [results, setResults] = useState();

  const searchQuery = (e) => {
    if (e.target.value) {
      service
        .search(typeId, e.target.value)
        .then((resp) => {
          setResults(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setResults();
    }
  };

  const ResultList = () => {
    return (
      <div
        style={{
          backgroundColor: "teal",
          width: "30vw",
          height: "fit-content",
          position: "absolute",
        }}
      >
        {results.map((assetInfo, index) => {
          return (
            <div key={index} style={{ border: "solid black 1px" }}>
              <NavLink to={`/user/view/asset/${assetInfo.assetId}`}>
                <h5>{assetInfo.assetName}</h5>
              </NavLink>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <input
        className="search-bar"
        key="search-input"
        placeholder={"search"}
        onChange={(e) => {
          searchQuery(e);
        }}
      />
      <button className="search-icon">
        <BiSearch size="1.5em" color="white" />
      </button>
      {results ? <ResultList /> : null}
    </div>
  );
};
export default SearchBar;
