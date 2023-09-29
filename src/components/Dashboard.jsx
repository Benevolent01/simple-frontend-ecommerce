import { useEffect, useState } from "react";
import "../styles/Dashboard.css"; // Import your CSS file with the updated naming here
import Navbar from "./Navbar";
import ProfileTab from "./ProfileTab";
import EditProfileTab from "./EditProfileTab";
import OtherUsersTab from "./OtherUsersTab";
import ManageProducts from "./ManageProducts";
import ManageCategories from "./ManageCategories";
import { connect } from "react-redux";
import { checkAdvancedTab } from "../utils";

const OrdersTab = () => {
  return (
    <>
      <h2>My Orders</h2>
      <ul>
        <li>Order A</li>
        <li>Order B</li>
        <li>Order C</li>
      </ul>
    </>
  );
};

let tabElements = [
  ["My Profile", <ProfileTab />],
  ["Edit Profile", <EditProfileTab />],
  ["Other Users", <OtherUsersTab />],
  ["My Orders", <OrdersTab />],
  ["Manage Categories", <ManageCategories></ManageCategories>],
  ["Manage Products", <ManageProducts />],
];

const Dashboard = (props) => {
  const [activeTab, setActiveTab] = useState("My Profile");

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-tabs">
          {tabElements.length &&
            tabElements.map(([name]) =>
              checkAdvancedTab(name, props.session.is_admin) ? (
                <button key={name} className={`dashboard-tab-button ${activeTab === name ? "dashboard-active" : ""}`} onClick={() => setActiveTab(name)}>
                  {name}
                </button>
              ) : null
            )}
        </div>
        {tabElements.length &&
          tabElements.map(([name, element]) =>
            checkAdvancedTab(name, props.session.is_admin) ? (
              <div key={name} className={`dashboard-tab-content ${activeTab === name ? "dashboard-active" : ""}`}>
                {element}
              </div>
            ) : null
          )}
      </div>
    </>
  );
};

let mapStateToProps = (state) => ({
  session: state.handleSession,
});

export default connect(mapStateToProps)(Dashboard);
