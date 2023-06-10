import { Button, Card, Container, Grid } from "@nextui-org/react";
import { PencilLine, Trash } from "@phosphor-icons/react";
import * as React from "react";
import { StuffedMission } from "../../../api/Missions/getMissions.js";
import { MissionItem } from "./MissionItem.component";

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
  }, [search, missions]);
  return (
    <div>
      {/* <Text h3>Les missions</Text> */}
      <Card
        variant="flat"
        css={{
          backgroundColor: "#fcfcfc",
          width: "100%",
          height: "100%",
        }}
      >
        <Card.Body
          css={{
            overflowY: "auto",
          }}
        >
          <Container>
            {missions?.map((mission) => (
              <Grid.Container key={mission.id}>
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
                        alignItems: "flex-end",
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
    </div>
  );
};
