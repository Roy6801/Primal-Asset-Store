import "../stylesheets/Home.css";

const ProfileMenu = ({ user, setToken }) => {
  return (
    <div className="profile-menu-display">
      <div className="profile-menu-display-section1">
        <h6>{`${user.firstName} ${user.lastName}`}</h6>
        <h6>Coins - _</h6>
        <h6>Downloads - _</h6>
        <h6>Projects - _</h6>
        <h6>Favorites - _</h6>
      </div>
      <div style={{ display: "flex" }}>
        <button>View Profile</button>
        <button>View Account</button>
      </div>
      <button
        onClick={(e) => {
          setToken();
          window.localStorage.removeItem("primal-UIG-asset-store-G10");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileMenu;
