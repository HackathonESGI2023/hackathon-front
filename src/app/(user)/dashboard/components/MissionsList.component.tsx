import { Card, Container, Grid, Input, Button } from "@nextui-org/react";
import { Company, Mission, User } from "@prisma/client";
import * as React from "react";
import { MissionItem } from "./MissionItem.component.tsx";
import { StuffedMission } from "../../../api/Missions/getMissions.js";
import { PencilLine, Trash } from "@phosphor-icons/react";

interface MissionsListProps {
  missions: StuffedMission[];
  crud?: {
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
  };
}

export const MissionsList: React.FunctionComponent<MissionsListProps> = ({
  missions,
  crud,
}) => {
  const [filteredMissions, setFilteredMissions] = React.useState(missions);

  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    search === ""
      ? setFilteredMissions(
          missions.filter(
            (m) =>
              m.name.toLowerCase().includes(search.toLowerCase()) ||
              m.Company.name.toLowerCase().includes(search.toLowerCase())
          )
        )
      : setFilteredMissions(missions);
    console.log("Filtered missions", filteredMissions);
  }, [search, missions]);
  return (
    <Card
      variant="flat"
      css={{
        backgroundColor: "#fcfcfc",
      }}
    >
      <Card.Body>
        <Input
          placeholder="Rechercher une mission..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="lg"
          css={{
            marginBottom: "1rem",
          }}
        />
        <Container
          css={{
            overflowY: "auto",
          }}
          gap={0}
        >
          {filteredMissions.map((mission) => (
            <Grid.Container
              key={mission.id}
              gap={1}
              css={{
                marginBottom: "1rem",
              }}
            >
              <Grid xs={12} md={crud ? 10 : 12}>
                <MissionItem
                  companyLogo={mission.Company.logo}
                  missionName={mission.name}
                  companyName={mission.Company.name}
                  startDate={mission.joinDate}
                  endDate={mission.leaveDate}
                  userPicture={mission.Users.profile_picture}
                />
              </Grid>
              {crud && (
                <Grid xs={12} md={2}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Button
                      color={"warning"}
                      icon={<PencilLine size={20} />}
                      auto
                      flat
                      onPress={() => crud.onUpdate(mission.id)}
                      css={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <Button
                      color="error"
                      onPress={() => crud.onDelete(mission.id)}
                      auto
                      flat
                      icon={<Trash size={20} />}
                      css={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </div>
                </Grid>
              )}
            </Grid.Container>
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
};
