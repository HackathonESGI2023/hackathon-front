"use client";

import { Grid } from "@nextui-org/react";
import { useState } from "react";
import ProfileCards from "../components/Cards/ProfileCards/ProfileCards";

type ProfileProps = {};

const Dashboard = ({}: ProfileProps) => {
  const [slots, setSlots] = useState([null, null, null]);

  const [badges, setBadges] = useState([
    { id: 1, name: "React", color: "red", slot: null },
    { id: 2, name: "TypeScript", color: "green", slot: null },
    { id: 3, name: "Next.js", color: "blue", slot: null },
    { id: 4, name: "Angular", color: "white", slot: null },
    { id: 5, name: "Vue.js", color: "yellow", slot: null },
    { id: 6, name: "Svelte", color: "purple", slot: null },
  ]);

  const handleDrop = (slotId, item) => {
    setBadges((oldBadges) => {
      const newBadges = [...oldBadges];
      const badgeIndex = newBadges.findIndex((b) => b.id === item.id);

      const oldSlotBadgeIndex = newBadges.findIndex((b) => b.slot === slotId);
      if (oldSlotBadgeIndex !== -1) {
        newBadges[oldSlotBadgeIndex] = {
          ...newBadges[oldSlotBadgeIndex],
          slot: null,
        };
      }

      if (badgeIndex !== -1) {
        newBadges[badgeIndex] = { ...newBadges[badgeIndex], slot: slotId };
      }

      return newBadges;
    });
  };

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
