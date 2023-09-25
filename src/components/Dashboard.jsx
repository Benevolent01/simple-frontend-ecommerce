import { useState } from "react";
import "../styles/Dashboard.css"; // Import your CSS file with the updated naming here
import Navbar from "./Navbar";
import ProfileTab from "./ProfileTab";
import EditProfileTab from "./EditProfileTab";

const OtherUsersTab = () => {
  return (
    <>
      <h2>Other Products</h2>
      <ul>
        <li>Product A</li>
        <li>Product B</li>
        <li>Product C</li>
      </ul>
    </>
  );
};

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

let tabNames = [
  ["My Profile", <ProfileTab />],
  ["Edit Profile", <EditProfileTab />],
  ["Other Users", <OtherUsersTab />],
  ["My Orders", <OrdersTab />],
];

let adminTabNames = [];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("My Profile");

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-tabs">
          {tabNames.length &&
            tabNames.map(([name]) => (
              <button key={name} className={`dashboard-tab-button ${activeTab === name ? "dashboard-active" : ""}`} onClick={() => setActiveTab(name)}>
                {name}
              </button>
            ))}
        </div>
        {tabNames.length &&
          tabNames.map(([name, element]) => (
            <div key={name} className={`dashboard-tab-content ${activeTab === name ? "dashboard-active" : ""}`}>
              {element}
            </div>
          ))}
      </div>
    </>
  );
};

export default Dashboard;
