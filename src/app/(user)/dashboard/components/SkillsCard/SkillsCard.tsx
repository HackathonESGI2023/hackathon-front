import SkillBadge from "@components/SkillBadge/SkillBadge";
import { Card, Row, Spacer, Text } from "@nextui-org/react";
import { UserSkill } from "@prisma/client";
import colors from "@styles/_colors.module.scss";
import { useState } from "react";
import SkillsModal from "../SkillsModal";

type SkillsCardProps = {
  softSkills?: UserSkill[];
  hardSkills?: UserSkill[];
};

const SkillsCard = ({ softSkills = [], hardSkills = [] }: SkillsCardProps) => {
  const [isSkillsModalVisible, setIsSkillsModalVisible] =
    useState<boolean>(false);

  return (
    <div
      onClick={() => setIsSkillsModalVisible(true)}
      style={{ width: "100%" }}
    >
      <Card
        isHoverable
        variant="flat"
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#FDFCFC",
          padding: "1.5rem",
          cursor: "pointer",
        }}
      >
        <Text weight={"medium"} color={colors.primary}>
          Hardskills
        </Text>

        <Row style={{ overflow: "scroll" }}>
          {hardSkills &&
            hardSkills
              .slice(0, 4)
              .map((skill) => (
                <SkillBadge
                  key={skill.id}
                  name={skill.skill.name}
                  color={skill.skill.color}
                  id={skill.id}
                />
              ))}
        </Row>

        <Spacer y={1} />

        <Text weight={"medium"} color={colors.primary}>
          Softskills
        </Text>
        <Row style={{ overflow: "scroll" }}>
          {softSkills &&
            softSkills
              .slice(0, 4)
              .map((skill) => (
                <SkillBadge
                  key={skill.id}
                  name={skill.skill.name}
                  color={skill.skill.color}
                  id={skill.id}
                />
              ))}
        </Row>
        <SkillsModal
          setIsVisible={setIsSkillsModalVisible}
          isVisible={isSkillsModalVisible}
          skills={[...softSkills, ...hardSkills]}
        />
      </Card>
    </div>
  );
};

export default SkillsCard;
