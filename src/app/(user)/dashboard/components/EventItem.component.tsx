"use client";
import { Card, Container, Grid, Row, Text } from "@nextui-org/react";
import {
  AppWindow,
  Barbell,
  Books,
  MicrophoneStage,
  Palette,
  Presentation,
} from "@phosphor-icons/react";
import { ActivityType } from "@prisma/client";
import * as React from "react";

interface EventItemProps {
  name: string;
  date: Date;
  activityType: ActivityType;
}

export const EventItem: React.FunctionComponent<EventItemProps> = ({
  name,
  date,
  activityType,
}) => {
  const getIconFromActivityType = (activityType: ActivityType) => {
    switch (activityType) {
      case ActivityType.CONFERENCE:
        return {
          icon: <MicrophoneStage size={32} color={"white"} />,
          color: "#6ad3dc",
          backgroundColor: "#ffefff",
        };
      case ActivityType.MEETING:
        return {
          icon: <Presentation size={32} color={"white"} />,
          color: "#ffc55a",
          backgroundColor: "#fcf8ef",
        };
      case ActivityType.WORKSHOP:
        return {
          icon: <Palette size={32} color={"white"} />,
          color: "#29d8de",
          backgroundColor: "#edfdf8",
        };
      case ActivityType.TRAINING:
        return {
          icon: <Barbell size={32} color={"white"} />,
          color: "#edd4a7",
          backgroundColor: "#fcf8ef",
        };
      case ActivityType.COURSE:
        return {
          icon: <Books size={32} color={"white"} />,
          color: "#efb3e9",
          backgroundColor: "#ffefff",
        };
      default:
        return {
          icon: <AppWindow size={32} color={"white"} />,
          color: "#8ed3c3",
          backgroundColor: "#edfdf8",
        };
    }
  };
  return (
    <>
      <Card
        variant="flat"
        css={{
          marginTop: "1rem",
          marginBottom: "1rem",
          backgroundColor:
            getIconFromActivityType(activityType).backgroundColor,
        }}
      >
        <Card.Body>
          <Grid.Container gap={0}>
            <Grid
              xs={2}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <div
                style={{
                  backgroundColor: getIconFromActivityType(activityType).color,
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "20%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {getIconFromActivityType(activityType).icon}
              </div>
            </Grid>
            <Grid xs={10}>
              <Container>
                <Row>
                  <Text h5>{name}</Text>
                </Row>
                <Row>
                  <Text h6 color="#d0d7da">
                    {new Date(date).toLocaleString()}
                  </Text>
                </Row>
              </Container>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </>
  );
};
