import { useEffect, useState } from "react";
import { updateUserEditProfile } from "../actions";
import { fixKey } from "../utils";
import { connect } from "react-redux";
import { API_HOST, dateFormat } from "../config";

const EditProfileTab = (props) => {
  const [user, setUser] = useState(null);
  const [fields, setFields] = useState({});
  const [editedProps, setEditedProps] = useState({});

  useEffect(() => {
    if (props.userInfo) {
      setUser(props.userInfo);
      const { id, username, createdAt, updatedAt, star_sign, ...toEdit } = props.userInfo;
      setFields(toEdit);
    }
  }, [props.userInfo]);

  // useEffect(() => {
  //   console.log(editedProps);
  // }, [editedProps]);

  if (!user) return <></>;

  const handleSave = async () => {
    let r = await fetch(`${API_HOST}/editUserInfo/${props.session.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${props.session.token}`,
      },
      body: JSON.stringify(editedProps),
    });
    if (r.status !== 200) {
      alert("Failed to updated user...");
      return;
    }
    alert("Successfully updated user profile info!");
    window.location.reload();
  };

  const handleSaveOnEnter = async (e) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <>
      <div className="dashboard-edit-container">
        <h2>Edit your profile information</h2>
        <div className="dashboard-edit-main">
          {user &&
            Object.entries(fields).map(([key, value]) => (
              <label key={key}>
                {fixKey(key)}
                <div>
                  <input
                    type={key === "date_of_birth" ? "date" : "text"}
                    defaultValue={value}
                    onChange={(e) => setEditedProps({ ...editedProps, [key]: e.target.value })}
                    onKeyDown={(e) => handleSaveOnEnter(e)}
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
});

export default connect(mapStateToProps)(EditProfileTab);
