"use client";
import { Grid, Spacer } from "@nextui-org/react";
import { Briefcase } from "@phosphor-icons/react";
import { userAtom } from "@utils/recoilAtoms.utils";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { getEvents } from "src/app/api/Events/getEvents";
import { getMissions } from "src/app/api/Missions/getMissions";
import { EventsList } from "./components/EventsList.component";
import KpiCardsSupport from "./components/KPI/KpiCardSupport.component";
import KpiCard from "./components/KpiCard/KpiCard";
import { MissionsList } from "./components/MissionsList.component";

const DashboardSupportPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [eventFetch, setEventFetch] = useState([]);
  const [missionFetch, setMissionFetch] = useState([]);

  const { data: eventsData } = useQuery("events", getEvents, {
    onSuccess: (data) => {
      setEventFetch(data);
    },
  });

  const { data: missionsData } = useQuery("missions", getMissions, {
    onSuccess: (data) => {
      setMissionFetch(data);
    },
  });

  console.log(eventFetch);

  return (
    <div>
      <Grid.Container gap={0} justify="space-between">
        <Grid xs={6} md={5}>
          <KpiCardsSupport kpiValue={50} kpiMaxValue={200} />
        </Grid>
        <Grid xs={6} md={2}>
          <KpiCard
            amount={200}
            color="#F3FCF8"
            label="Missions"
            unityLabel="en cours"
            contratsColor="#A8D0C4"
            icon={<Briefcase size={32} />}
          />
        </Grid>
        <Grid xs={6} md={2}>
          <KpiCard
            amount={200}
            color="#F3FCF8"
            label="Entreprises"
            unityLabel="sur la plateforme"
            contratsColor="#A8D0C4"
            icon={<Briefcase size={32} />}
          />
        </Grid>
        <Grid xs={6} md={2}>
          <KpiCard
            amount={200}
            color="#F3FCF8"
            label="Evenements"
            unityLabel="prévus"
            contratsColor="#A8D0C4"
            icon={<Briefcase size={32} />}
          />
        </Grid>
      </Grid.Container>

      <Spacer y={1} />

      <Grid.Container gap={0} justify="space-between">
        <Grid xs={6} md={4} css={{ height: "50vh" }}>
          <MissionsList missions={missionFetch} />
        </Grid>

        <Grid xs={6} md={3} css={{ height: "50vh" }}>
          <EventsList events={eventFetch} />
        </Grid>
        <Grid xs={6} md={4} css={{ height: "50vh" }}>
          <EventsList events={eventFetch} />
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default DashboardSupportPage;
