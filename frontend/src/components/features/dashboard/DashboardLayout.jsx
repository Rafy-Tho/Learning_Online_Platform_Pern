import Header from "../../LearningDashBoard/Header";
import PromptBox from "../../LearningDashBoard/PromptBox";
import Tabs from "../../LearningDashBoard/Tabs";

function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <PromptBox />
      <Tabs />
      {children}
    </>
  );
}

export default DashboardLayout;
