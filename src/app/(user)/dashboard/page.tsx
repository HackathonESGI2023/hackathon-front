"use client";

import { userAtom } from "@utils/recoilAtoms.utils";
import { useRecoilState } from "recoil";
import DashboardConsultant from "./components/DashboardConsultant/DashboardConsultant";
import DashboardSupportPage from "./components/DashboardSupport/DashboardSupport";

const Dashboard = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const content = user?.roles.includes("SUPPORT") ? (
    <DashboardSupportPage />
  ) : (
    <DashboardConsultant />
  );
  return content;
};

export default Dashboard;
