"use client";

import { Row, Spacer } from "@nextui-org/react";
import { AirplaneTilt } from "@phosphor-icons/react";
import colors from "@styles/_colors.module.scss";
import KpiCard from "../components/KpiCard/KpiCard";

type DashboardProps = {};

const Dashboard = ({}: DashboardProps) => {
  return (
    <Row>
      <KpiCard
        color={colors.terciaryT500}
        contratsColor={colors.terciaryS500}
        label="Entreprise"
        unityLabel="Entreprises renseignées"
        amount={586}
      />
      <Spacer x={1} />
      <KpiCard
        color={colors.secondaryT500}
        contratsColor={colors.secondaryS500}
        label="C.A"
        unityLabel="Euros"
        amount={586}
        icon={
          <AirplaneTilt size={65} weight="fill" color={colors.secondaryS500} />
        }
      />
    </Row>
  );
};

export default Dashboard;
