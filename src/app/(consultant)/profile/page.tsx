"use client";
import { Grid } from "@nextui-org/react";
import ProfileCards from "../components/Cards/ProfileCards/ProfileCards";

//fake user
const userTest = {
  firstname: "John",
  lastname: "Doe",
  email: "test@test.com",
};

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <>
      <h1>Page profile{children}</h1>
      <Grid.Container gap={3} justify="center">
        <Grid xs={6} md={3}>
          <ProfileCards
            isInMision={true}
            seniorityTimeInYears={2}
            user={userTest}
            skills={[
              {
                id: 1,
                name: "Java",
                color: "#FF0000",
                category: "BACKEND",
                type: "HARD",
              },
              {
                id: 2,
                name: "Java",
                color: "#190633",
                category: "BACKEND",
                type: "HARD",
              },
            ]}
          />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Dashboard;
