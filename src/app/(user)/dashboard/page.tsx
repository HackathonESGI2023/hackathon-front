"use client";
import { KpiCards } from "@components/KPI/KpiCards";
import { Grid } from "@nextui-org/react";

const DashboardSupportPage = () => {
  return (
    <div>
      <h1>Dashboard Support Page</h1>
      <Grid.Container gap={2} justify="center">
        <Grid xs={3} md={3} lg={3}>
          <KpiCards
            kpiStats="100/300"
            kpiContent="Consultants en missions"
            kpiAddition={10}
            kpiButtonText="Voir les intercontrats"
            kpiButtonRoute="/support/tickets"
          />
        </Grid>

        <Grid xs={3} md={3} lg={3}>
          <KpiCards
            kpiStats="100/300"
            kpiContent="Consultants en missions"
            kpiButtonText="Voir les intercontrats"
            kpiButtonRoute="/support/tickets"
          />
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default DashboardSupportPage;
