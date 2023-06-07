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
                _id: "1",
                name: "React",
                color: "#61DBFB",
              },
              {
                _id: "2",
                name: "Node",
                color: "#026E00",
              },
              {
                _id: "3",
                name: "Angular",
                color: "#DD0031",
              },
            ]}
          />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Dashboard;
