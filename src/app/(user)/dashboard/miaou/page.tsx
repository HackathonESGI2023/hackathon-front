"use client";
import { Card, Grid, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEvents } from "src/app/api/Events/getEvents";
import { EventsList } from "../components/EventsList.component";
import { getMissions } from "src/app/api/Missions/getMissions";
import { MissionsList } from "../components/MissionsList.component";

export default function Miaou() {
  const { data: events } = useQuery("events", getEvents);

  const { data: missions } = useQuery("missions", getMissions);

  useEffect(() => {
    console.log(missions);
  }, [missions]);

  return (
    <div>
      <h1>Miaou</h1>
      <Grid.Container gap={2}>
        <Grid
          xs={12}
          md={4}
          css={{
            height: "25rem",
          }}
        >
          <EventsList events={events ?? []} />
        </Grid>
        <Grid
          xs={12}
          md={4}
          css={{
            height: "25rem",
          }}
        >
          <MissionsList missions={missions ?? []} />
        </Grid>
        <Grid
          xs={12}
          md={4}
          css={{
            height: "25rem",
          }}
        >
          <div>3</div>
        </Grid>
      </Grid.Container>
    </div>
  );
}
