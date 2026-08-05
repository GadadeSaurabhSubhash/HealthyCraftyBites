import "../css_user_service/UserDropdownMenuCSS.css";

function UserDropdownMenu({
  userName,
  email,
  onProfile,
  onOrders,
  onFavourites,
  onLogout,
}) {
  return (
    <div className="user-dropdown-menu">
      {/*==============================
                User Information
            ==============================*/}

      <div className="user-dropdown-header">
        <div className="user-details">
          <h5>{userName}</h5>

          <p>{email}</p>
        </div>
      </div>

      {/*==============================
                Menu Items
            ==============================*/}

      <button onClick={onProfile}>
        <i className="bi bi-person-circle"></i>
        Profile
      </button>

      <button onClick={onOrders}>
        <i className="bi bi-bag-check-fill"></i>
        View Orders
      </button>

      <button onClick={onFavourites}>
        <i className="bi bi-heart-fill"></i>
        View Favourites
      </button>

      <button className="logout-button" onClick={onLogout}>
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </div>
  );
}

export default UserDropdownMenu;
