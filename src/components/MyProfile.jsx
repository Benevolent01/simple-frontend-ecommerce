import Dashboard from "./Dashboard";
import Onboarding from "./Onboarding";

const MyProfile = () => {
  const hasSession = !!localStorage.getItem("session");

  return <>{hasSession ? <Dashboard /> : <Onboarding />}</>;
};

export default MyProfile;
