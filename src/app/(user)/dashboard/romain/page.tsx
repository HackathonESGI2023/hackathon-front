"use client";

import { Row } from "@nextui-org/react";
import SkillsCard from "../components/SkillsCard/SkillsCard";

type DashboardProps = {};

const Dashboard = ({}: DashboardProps) => {
  return (
    <>
      <Row>
        <SkillsCard></SkillsCard>
      </Row>
    </>
  );
};

export default Dashboard;
