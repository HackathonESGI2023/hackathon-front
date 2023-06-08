import SkillBadge from "@components/SkillBadge/SkillBadge";
import { Card, Row, Text } from "@nextui-org/react";
import { UserSkill } from "@prisma/client";
import colors from "@styles/_colors.module.scss";
import { useState } from "react";

type SkillsCardProps = {
  userSkills: UserSkill[];
};

const SkillsCard = ({}: SkillsCardProps) => {
  const [badges, setBadges] = useState([
    { id: 1, name: "React", color: "red", slot: null },
    { id: 2, name: "TypeScript", color: "green", slot: null },
    { id: 3, name: "Next.js", color: "blue", slot: null },
    { id: 4, name: "Angular", color: "white", slot: null },
    { id: 5, name: "Vue.js", color: "yellow", slot: null },
    { id: 6, name: "Svelte", color: "purple", slot: null },
  ]);

  return (
    <Card
      style={{
        height: "100%",
        width: "30rem",
        background: colors.white,
        padding: "1.5rem",
      }}
    >
      <Text weight={"medium"} color={colors.primary}>
        Hardskills
      </Text>

      <Row style={{ overflow: "scroll" }}>
        {badges.map((skill) => (
          <SkillBadge
            key={skill.id}
            name={skill.name}
            color={skill.color}
            id={skill.id}
          />
        ))}
      </Row>

      <Text weight={"medium"} color={colors.primary}>
        Softskills
      </Text>
      <Row style={{ overflow: "scroll" }}>
        {badges.map((skill) => (
          <SkillBadge
            key={skill.id}
            name={skill.name}
            color={skill.color}
            id={skill.id}
          />
        ))}
      </Row>
    </Card>
  );
};

export default SkillsCard;
