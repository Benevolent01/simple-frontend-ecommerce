import { useEffect } from "react";
import { updateUserEditProfile } from "../actions";
import { fixKey } from "../utils";
import { connect } from "react-redux";
import { API_HOST, dateFormat } from "../config";

const EditProfileTab = (props) => {
  useEffect(() => {
    if (!props.userInfo) return;
    for (let [key, value] of Object.entries(props.userInfo)) props.dispatch(updateUserEditProfile(key, value));
  }, [props.userInfo]);

  useEffect(() => {
    console.log(props.editedProps);
  }, [props.editedProps]);

  let user = props.userInfo;
  if (!user) return <></>;

  let { id, username, createdAt, updatedAt, star_sign, ...toEdit } = user;

  const handleSave = async () => {
    let r = await fetch(`${API_HOST}/editUserInfo/${props.session.username}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${props.session.token}`,
      },
      body: JSON.stringify(props.editedProps),
    });
    console.log(r.body);
    if (r.status !== 200) {
      alert("Failed to updated user...");
      return;
    }
    alert("Successfully updated user profile info!");
  };

  return (
    <>
      <div className="dashboard-edit-container">
        <h2>Edit your profile information</h2>
        <div className="dashboard-edit-main">
          {toEdit &&
            Object.entries(toEdit).map(([key, value]) => (
              <label key={key}>
                {fixKey(key)}
                <div>
                  <input
                    type={key === "date_of_birth" ? "date" : "text"}
                    defaultValue={value}
                    onChange={(e) => props.dispatch(updateUserEditProfile(key, e.target.value))}
                  />
                </div>
              </label>
            ))}
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  );
};

let mapStateToProps = (state) => ({
  session: state.handleSession,
  userInfo: state.handleUserInfo.data,
  editedProps: state.handleEditUserInfo,
});

export default connect(mapStateToProps)(EditProfileTab);
