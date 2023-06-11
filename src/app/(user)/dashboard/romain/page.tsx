"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import SelectPinnedSkills from "../components/SelectPinnedSkills/SelectPinnedSkills";
import SkillsModal from "../components/SkillsModal/SkillsModal";

type DashboardProps = {};

const Dashboard = ({}: DashboardProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setIsVisible(true)}>modale</Button>
      <SkillsModal setIsVisible={setIsVisible} isVisible={isVisible} />
      <SelectPinnedSkills />
    </>
  );
};

export default Dashboard;
