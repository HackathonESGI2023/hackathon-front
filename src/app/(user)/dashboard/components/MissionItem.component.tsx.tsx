"use client";
import { Avatar, Card, Container, Grid, Row, Text } from "@nextui-org/react";
import { Mission } from "@prisma/client";
import * as React from "react";

export interface MissionItemProps {
  companyLogo: string;
  missionName: string;
  companyName: string;
  startDate: Date;
  endDate: Date;
  userPicture: string;
}

export const MissionItem: React.FunctionComponent<MissionItemProps> = ({
  companyLogo,
  missionName,
  companyName,
  startDate,
  endDate,
  userPicture,
}) => {
  return (
    <>
      <Card
        variant="flat"
        css={{
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Card.Body>
          <Grid.Container gap={0}>
            <Grid xs={2} alignItems="center" justify="center">
              <Avatar squared src={companyLogo} size={"xl"} />
            </Grid>
            <Grid xs={9}>
              <Container>
                <Row>
                  <Text h5>{missionName}</Text>
                </Row>
                <Row>
                  <Text
                    h6
                    color="#848291"
                    css={{
                      marginTop: "-0.5rem",
                    }}
                  >
                    {companyName}
                  </Text>
                </Row>
                <Row>
                  <Text
                    color="#d0d7da"
                    css={{
                      fontSize: "0.8rem",
                    }}
                  >
                    {new Date(startDate).toLocaleDateString()} —{" "}
                    {new Date(endDate).toLocaleDateString()}
                  </Text>
                </Row>
              </Container>
            </Grid>
            <Grid xs={1} alignItems="flex-end">
              <Avatar src={userPicture} size={"sm"} />
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </>
  );
};
