import { Card, Container } from "@nextui-org/react";
import { Company, Mission, User } from "@prisma/client";
import * as React from "react";
import { MissionItem } from "./MissionItem.component.tsx";
import { StuffedMission } from "src/app/api/Missions/getMissions.js";

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
          {missions.map((mission) => (
            <MissionItem
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
