"use client";
import { Grid } from "@nextui-org/react";
import KpiCardsSupport from "../components/KPI/KpiCardSupport.component";

const DashboardSupportPage = () => {
  return (
    <div>
      <h1>Dashboard Support Page</h1>
      <Grid.Container gap={2} justify="center" css={{ height: "300px" }}>
        <Grid xs={5}>
          <KpiCardsSupport kpiValue={50} kpiMaxValue={200} />
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default DashboardSupportPage;
