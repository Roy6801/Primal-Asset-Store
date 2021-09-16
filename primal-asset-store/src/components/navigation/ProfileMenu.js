const ProfileMenu = ({ googleId, setToken }) => {
  return (
    <div>
      <h6>{googleId}</h6>
      <button>View Profile</button>
      <button>View Account</button>
      <h6>Coins - _</h6>
      <h6>Downloads - _</h6>
      <h6>Projects - _</h6>
      <h6>Favorites - _</h6>
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
