import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { cartPath, homePath, myProfilePath, signInPath } from "../config";
import { connect } from "react-redux";

let NavLinkColor = ({ isActive }) => (isActive ? "activeNav" : "idleNav") + ``; // other classes

let logoText = `Yuumi's Book.`;

const Navbar = (props) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div className="mini-logo logo-fix">{logoText}</div>

      <nav className="main-nav">
        <div className="nav-logo logo-fix ">
          <h2>{logoText}</h2>
        </div>
        <div>
          <NavLink className={({ isActive }) => NavLinkColor({ isActive })} to={homePath} end>
            Products {props.currentlyFilteredLength ? `now (${props.currentlyFilteredLength})` : ""}
          </NavLink>
        </div>
        <div>
          <NavLink className={({ isActive }) => NavLinkColor({ isActive })} to={cartPath} end>
            Cart {props.cartLength ? `(${props.cartLength})` : ""}
          </NavLink>
        </div>
        <div>
          {!props.username ? (
            <NavLink className={({ isActive }) => NavLinkColor({ isActive })} to={signInPath} end>
              Onboarding
            </NavLink>
          ) : (
            <NavLink className={({ isActive }) => NavLinkColor({ isActive })} to={myProfilePath}>
              {props.username} | <button onClick={handleLogout}>Logout</button>
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

let mapStateToProps = (state) => ({
  cartLength: state.handleCart.cartProducts.length,
  currentlyFilteredLength: state.handleProducts.currentlyFilteredLength,
  username: state.handleSession.username,
});

export default connect(mapStateToProps)(Navbar);
