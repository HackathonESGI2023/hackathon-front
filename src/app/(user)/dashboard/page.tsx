"use client";
import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import {
  Brain,
  Briefcase,
  Buildings,
  Calendar,
  CalendarPlus,
  Handshake,
  MagnifyingGlass,
  UserCirclePlus,
} from "@phosphor-icons/react";
import { userAtom } from "@utils/recoilAtoms.utils";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { getEvents } from "src/app/api/Events/getEvents";
import { getMissions } from "src/app/api/Missions/getMissions";
import { getAllUsers } from "src/app/api/Users/getAllUsers";
import { EventsList } from "./components/EventsList.component";
import KpiCardsSupport from "./components/KPI/KpiCardSupport.component";
import KpiCard from "./components/KpiCard/KpiCard";
import { MissionsList } from "./components/MissionsList.component";

const DashboardSupportPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [eventFetch, setEventFetch] = useState([]);
  const [missionFetch, setMissionFetch] = useState([]);
  const [consultantFetch, setConsultantFetch] = useState([]);
  const [consultantInMission, setConsultantInMission] = useState([]);

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

  const { data: usersData } = useQuery("users", getAllUsers, {
    onSuccess: (data) => {
      const consultants = data.filter((user) =>
        user.roles.includes("CONSULTANT")
      );
      const consultantsInMission = consultants.filter(
        (consultant) => consultant.Mission.length > 0
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
          {/* <EventsList events={eventFetch} /> */}
          <div style={{ width: "100%", height: "100%" }}>
            <Text h3>Raccourcies</Text>

            <Card
              variant="flat"
              css={{
                backgroundColor: "#fcfcfc",
                width: "100%",
                height: "100%",
                overflowX: "hidden",
              }}
            >
              <Card.Body>
                <Container
                  css={{
                    height: "100%",
                  }}
                  gap={0}
                >
                  <Grid.Container
                    gap={1}
                    css={{
                      marginBottom: "1rem",
                      height: "100%",
                      pb: 0,
                    }}
                    justify="space-between"
                  >
                    <Grid xs>
                      <Button
                        size={"lg"}
                        icon={<MagnifyingGlass size={25} />}
                        color="success"
                        css={{
                          width: "100%",
                          backgroundColor: "#FBF8F0",
                          color: "#160B15",
                        }}
                      >
                        Profils
                      </Button>
                    </Grid>

                    <Grid xs>
                      <Button
                        size={"lg"}
                        icon={<UserCirclePlus size={25} />}
                        color="success"
                        css={{
                          width: "100%",
                          backgroundColor: "#F0FCF8",
                          color: "#2A2031",
                        }}
                      >
                        Utilisateur
                      </Button>
                    </Grid>

                    <Grid xs>
                      <Button
                        size={"lg"}
                        icon={<Handshake size={22} />}
                        color="success"
                        css={{
                          width: "100%",
                          backgroundColor: "#FEF0FE",
                          color: "#160B15",
                        }}
                      >
                        Contrats
                      </Button>
                    </Grid>

                    <Grid xs>
                      <Button
                        size={"lg"}
                        icon={<Briefcase size={22} />}
                        color="success"
                        css={{
                          width: "100%",
                          backgroundColor: "#F0FCF8",
                          color: "#2A2031",
                        }}
                      >
                        Missions
                      </Button>
                    </Grid>

                    <Grid xs>
                      <Button
                        size={"lg"}
                        icon={<Brain size={22} />}
                        color="success"
                        css={{
                          width: "100%",
                          backgroundColor: "#FAF8F0",
                          color: "#160B15",
                        }}
                      >
                        Formations
                      </Button>
                    </Grid>

                    <Grid xs>
                      <Button
                        size={"lg"}
                        icon={<CalendarPlus size={22} />}
                        css={{
                          width: "100%",
                          backgroundColor: "#F5EFDF",
                          color: "#160B15",
                        }}
                      >
                        Evenements
                      </Button>
                    </Grid>
                  </Grid.Container>
                </Container>
              </Card.Body>
            </Card>
          </div>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default DashboardSupportPage;
