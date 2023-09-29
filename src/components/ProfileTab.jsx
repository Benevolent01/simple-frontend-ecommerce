import { useEffect } from "react";
import { updateUserInfo } from "../actions";
import { API_HOST, dateFormat } from "../config";
import "../styles/Dashboard.css";
import { connect } from "react-redux";

const ProfileTab = (props) => {
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    let r = await fetch(`${API_HOST}/viewUserInfo/${props.session.username}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${props.session.token}`,
      },
    });
    let data = await r.json();
    props.dispatch(updateUserInfo(data));
  };

  let user = props.userInfo;

  return (
    <>
      {user ? (
        <div className="dashboard-profile-container">
          <h2>My Account ({user.username})</h2>
          <div className="dashboard-profile">
            <ul>
              <li>
                Email: <span className="dashboard-user-span">{user.email || "Not input yet"}</span>
              </li>
              <li>
                First Name: <span className="dashboard-user-span">{user.first_name || "Not input yet"}</span>
              </li>
              <li>
                Last Name: <span className="dashboard-user-span">{user.last_name || "Not input yet"}</span>
              </li>
              <li>
                Star Sign: <span className="dashboard-user-span">{user.star_sign || "Not input yet"}</span>
              </li>
              <li>
                Date of Birth:{" "}
                <span className="dashboard-user-span">
                  {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString(dateFormat) : "Not input yet"}
                </span>
              </li>
              <li>
                Country: <span className="dashboard-user-span">{user.country || "Not input yet"}</span>
              </li>
              <li>
                Address: <span className="dashboard-user-span">{user.address || "Not input yet"}</span>
              </li>
              <li>
                Phone Number: <span className="dashboard-user-span">{user.phone_number || "Not input yet"}</span>
              </li>
              <li>
                Joined:{" "}
                <span className="dashboard-user-span">{user.createdAt ? new Date(user.createdAt).toLocaleDateString(dateFormat) : "Not input yet"}</span>
              </li>
              <li>
                Biography: <span className="dashboard-user-span">{user.bio || "Not input yet"}</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <h2>Could not fetch data, token is invalid</h2>
      )}
    </>
  );
};

let mapStateToProps = (state) => ({
  session: state.handleSession,
  userInfo: state.handleUserInfo.data,
});

export default connect(mapStateToProps)(ProfileTab);
