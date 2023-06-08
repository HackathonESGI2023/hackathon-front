"use client";

import { Grid } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import ProfileCards from "../dashboard/components/ProfileCards/ProfileCards";

//fake user
const userTest = {
  firstname: "John",
  lastname: "Doe",
  email: "test@test.com",
};

type DashboardProps = {
  children: React.ReactNode;
};

const Profile = () => {
  return (
    <>
      <h1>Page profile</h1>
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
                color: colors.primaryT200,
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

export default Profile;
