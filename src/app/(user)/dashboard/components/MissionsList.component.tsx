import { Card, Container } from "@nextui-org/react";
import * as React from "react";
import { StuffedMission } from "../../../api/Missions/getMissions.js";
import { MissionItem } from "./MissionItem.component.tsx";

interface MissionsListProps {
  missions: StuffedMission[];
}

export const MissionsList: React.FunctionComponent<MissionsListProps> = ({
  missions,
}) => {
  return (
    <Card
      variant="flat"
      css={{
        backgroundColor: "#fcfcfc",
      }}
    >
      <Card.Body
        css={{
          overflowY: "auto",
        }}
      >
        <Container>
          {missions?.map((mission) => (
            <MissionItem
              key={mission.id}
              companyLogo={mission.Company.logo}
              missionName={mission.name}
              companyName={mission.Company.name}
              startDate={mission.joinDate}
              endDate={mission.leaveDate}
              userPicture={mission.Users.profile_picture}
            />
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
};
