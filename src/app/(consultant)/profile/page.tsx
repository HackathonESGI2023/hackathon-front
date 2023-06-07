"use client";

import { Grid } from "@nextui-org/react";
import ProfileCards from "../components/Cards/ProfileCards/ProfileCards";

type ProfileProps = {};

const Dashboard = ({}: ProfileProps) => {
  return (
    <h1>
      <Grid.Container gap={3} justify="center">
        <Grid xs={6} md={3}>
          <ProfileCards />
        </Grid>
        <Grid xs={6} md={3}>
          <ProfileCards />
        </Grid>
        <Grid xs={6} md={3}>
          <ProfileCards />
        </Grid>
        <Grid xs={6} md={3}>
          <ProfileCards />
        </Grid>
      </Grid.Container>
    </h1>
  );
};

export default Dashboard;
