"use client";
import { Grid } from "@nextui-org/react";
import { Briefcase, Buildings, Calendar } from "@phosphor-icons/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getEvents } from "src/app/api/Events/getEvents";
import { getMissions } from "src/app/api/Missions/getMissions";
import { getAllUsers } from "src/app/api/Users/getAllUsers";
import { EventsList } from "./components/EventsList.component";
import KpiCardsSupport from "./components/KPI/KpiCardSupport.component";
import KpiCard from "./components/KpiCard/KpiCard";
import { MissionsList } from "./components/MissionsList.component";
import ShortcutDashboard from "./components/Shortcut.component";

const DashboardSupportPage = () => {
  const [eventFetch, setEventFetch] = useState([]);
  const [missionFetch, setMissionFetch] = useState([]);
  const [consultantFetch, setConsultantFetch] = useState([]);
  const [consultantInMission, setConsultantInMission] = useState([]);

  const { data: eventsData } = useQuery("events", getEvents, {
    onSuccess: (data: any) => {
      setEventFetch(data);
    },
  });

  const { data: missionsData } = useQuery("missions", getMissions, {
    onSuccess: (data: any) => {
      setMissionFetch(data);
    },
  });

  const { data: usersData } = useQuery("users", getAllUsers, {
    onSuccess: (data) => {
      const consultants: any = data.filter((user) =>
        user.roles.includes("CONSULTANT")
      );
      const consultantsInMission = consultants.filter(
        (consultant: any) => consultant.Mission.length > 0
      );
      setConsultantFetch(consultants);
      setConsultantInMission(consultantsInMission);
    },
  });

  return (
    <div>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={6} md={4}>
          <KpiCardsSupport
            kpiValue={consultantInMission.length}
            kpiMaxValue={consultantFetch.length}
          />
        </Grid>
        <Grid xs={6} md>
          <KpiCard
            amount={missionFetch.length}
            color="#F3FCF8"
            label="Missions"
            unityLabel="en cours"
            contratsColor="#A8D0C4"
            icon={<Briefcase size={32} />}
          />
        </Grid>
        <Grid xs={6} md>
          <KpiCard
            amount={12}
            color="#FEF0FE"
            label="Entreprises"
            unityLabel="sur la plateforme"
            contratsColor="#E6B5E6"
            icon={<Buildings size={32} />}
          />
        </Grid>
        <Grid xs={6} md>
          <KpiCard
            amount={eventFetch.length}
            color="#FBF8F1"
            label="Evenements"
            unityLabel="prévus"
            contratsColor="#E6D6B1"
            icon={<Calendar size={32} />}
          />
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2} justify="space-between">
        <Grid xs md css={{ height: "48vh" }}>
          <MissionsList missions={missionFetch} />
        </Grid>

        <Grid xs md css={{ height: "48vh" }}>
          <EventsList events={eventFetch} />
        </Grid>

        <Grid xs md css={{ height: "48vh" }}>
          <ShortcutDashboard />
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default DashboardSupportPage;
