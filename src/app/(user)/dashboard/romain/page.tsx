"use client";

import { useState } from "react";
import DashboardConsultant from "../components/DashboardConsultant";
import SelectPinnedSkills from "../components/SelectPinnedSkills/SelectPinnedSkills";

type DashboardProps = {};

const Dashboard = ({}: DashboardProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <>
      <DashboardConsultant />
      <SelectPinnedSkills />
    </>
  );
};

export default Dashboard;
