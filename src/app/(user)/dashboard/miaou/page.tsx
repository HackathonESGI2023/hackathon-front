"use client";
import { Card, Grid, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEvents } from "src/app/api/Events/getEvents";
import { EventsList } from "../components/EventsList.component";

export default function Miaou() {
  const { data: events } = useQuery("events", getEvents);

  return (
    <div>
      <h1>Miaou</h1>
      <Grid.Container gap={2}>
        <Grid
          xs={12}
          md={4}
          css={{
            height: "20rem",
          }}
        >
          <EventsList events={events ?? []} />
        </Grid>
        <Grid
          xs={12}
          md={4}
          css={{
            height: "20rem",
          }}
        >
          <Card>
            <Card.Body>
              <div
                style={{
                  backgroundColor: "red",
                }}
              >
                <Spacer y={8} />
              </div>
            </Card.Body>
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={4}
          css={{
            height: "20rem",
          }}
        >
          <div>3</div>
        </Grid>
      </Grid.Container>
    </div>
  );
}
