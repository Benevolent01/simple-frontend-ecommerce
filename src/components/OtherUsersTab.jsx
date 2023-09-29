import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { API_HOST } from "../config";
import { generateRandomColor } from "../utils";

/*
No need to use redux state for myProfile, editMyProfile, otherUsers,
myOrders, manageCategories, manageProducts.

Use useState().

*/

const OtherUsersTab = (props) => {
  const [communityUsers, setCommunityUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommunityUsers();
  }, []);

  const getCommunityUsers = async () => {
    try {
      let r = await fetch(`${API_HOST}/viewUsers`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${props.session.token}`,
        },
      });
      let data = await r.json();
      setCommunityUsers(data);
    } catch (error) {
      console.error("Error fetching community users:", error);
      setError(error.message || "An error occurred while fetching community users.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!communityUsers) return <div>Loading...</div>;

  return (
    <>
      <h2>Explore the community</h2>
      <div className="dashboard-fetch-users">
        <ul>
          {communityUsers.map((user, index) => (
            <li key={index}>
              <h3>{user.username}</h3>
              <p>Bio: {user.bio || "Not provided"}</p>
              <p>
                Star Sign: <span style={{ color: generateRandomColor(), fontWeight: 800 }}>{user.star_sign || "Not provided"}</span>
              </p>
              <p>Country: {user.country || "Not provided"}</p>
              <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

let mapStateToProps = (state) => ({
  session: state.handleSession,
});

export default connect(mapStateToProps)(OtherUsersTab);
