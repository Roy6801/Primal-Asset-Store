const ProfileMenu = ({ googleId, setToken }) => {
  return (
    <div>
      <h6>{googleId}</h6>
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
