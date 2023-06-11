import { Grid } from "@nextui-org/react";
import { userAtom } from "@utils/recoilAtoms.utils";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { getEvents } from "src/app/api/Events/getEvents";
import { getMissions } from "src/app/api/Missions/getMissions";
import { EventsList } from "../EventsList.component";
import { MissionsList } from "../MissionsList.component";
import ProfileConsultantCard from "../ProfileConsultantCard";
import ShortcutDashboard from "../Shortcut.component";
import SkillsCard from "../SkillsCard/SkillsCard";
import { SkillsChart } from "../SkillsChart.component";

type DashboardConsultantProps = {
  // bla: string;
};

const DashboardConsultant = () => {
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

  const softSkills = user?.UserSkill.filter((us) => us.skill.type === "SOFT");

  const hardSkills = user?.UserSkill.filter((us) => us.skill.type === "HARD");

  console.log("softSkills", softSkills);

  return (
    <div>
      <Grid.Container gap={2} justify="space-between">
        <Grid xs={6} md={4} style={{ height: "16rem" }}>
          <ProfileConsultantCard
            userP={user}
            userId={user?.id}
            fullname={user?.firstname + " " + user?.lastname}
            profilePicture={user?.profile_picture}
            isInMission={user?.Mission.length > 0}
            userContractType={user?.Contract[0]?.contractType}
            pinedSkills={user?.UserSkill.filter((skill) => skill.isStarred)
              .map((skill) => skill.skill)
              .slice(0, 3)}
            seniorityTimeInYear={moment().diff(
              moment(user?.createdAt),
              "years"
            )}
            slackId={user?.slackId}
            onCrud={false}
          />
        </Grid>
        <Grid xs={6} md style={{ height: "16rem" }}>
          <SkillsCard softSkills={softSkills} hardSkills={hardSkills} />
        </Grid>
        <Grid xs={6} md style={{ height: "16rem" }}>
          <SkillsChart skills={user?.UserSkill} />
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
          <ShortcutDashboard disabledButton={true} />
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default DashboardConsultant;
