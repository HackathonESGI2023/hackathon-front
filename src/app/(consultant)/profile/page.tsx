"use client";
import { Grid } from "@nextui-org/react";
import ProfileCards from "../components/Cards/ProfileCards/ProfileCards";

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <>
      <h1>Page profile{children}</h1>
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
    </>
  );
};

export default Dashboard;
