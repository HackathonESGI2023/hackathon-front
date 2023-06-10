"use client";
import { Grid } from "@nextui-org/react";
import Header from "../components/Header/Header.component";
import KpiCardsSupport from "../components/KPI/KpiCardSupport.component";

const DashboardSupportPage = () => {
  return (
    <div>
      <Header title="Salut Pouet," subTitle="Il fait beau chez Carbonne 🎺" />
      <Grid.Container gap={2} justify="center" css={{ height: "300px" }}>
        <Grid xs={5}>
          <KpiCardsSupport kpiValue={50} kpiMaxValue={200} />
        </Grid>
        <Grid xs={5}></Grid>
      </Grid.Container>
    </div>
  );
};

export default DashboardSupportPage;
