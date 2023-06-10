"use client";
import { Button, Card, Grid, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEvents } from "src/app/api/Events/getEvents";
import { EventsList } from "../components/EventsList.component";
import { getMissions } from "src/app/api/Missions/getMissions";
import { MissionsList } from "../components/MissionsList.component";
import { SkillsChart } from "../components/SkillsChart.component";
import { useRecoilState } from "recoil";
import { userAtom } from "@utils/recoilAtoms.utils";
import { userUtils } from "@utils/user.utils";
import ModalCreateUser from "../components/ModalCreateUser/ModalCreateUser.component";

export default function Miaou() {
  const { data: events, refetch: refetchEvents } = useQuery(
    "events",
    getEvents
  );

  const { data: missions, refetch: refetchMissions } = useQuery(
    "missions",
    getMissions
  );

  const [user, setUser] = useRecoilState(userAtom);
  const [open, setOpen] = useState<boolean>(false);

  const refetchData = () => {
    refetchEvents();
    refetchMissions();
  };
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
          <MissionsList
            missions={missions ?? []}
            crud={{
              onUpdate: (id: number) => console.log("update", id),
              onDelete: (id: number) => console.log("delete", id),
            }}
          />
        </Grid>
        <Grid
          xs={12}
          md={4}
          css={{
            height: "25rem",
          }}
        >
          <SkillsChart skills={user?.UserSkill ?? []} />
        </Grid>
      </Grid.Container>
      <Button onPress={() => refetchData()}>Refetch</Button>
      <Text>{user !== null ? JSON.stringify(userUtils.level(user)) : ""}</Text>
      <ModalCreateUser open={true} setOpen={setOpen} />
    </div>
  );
}
