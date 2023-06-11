import SkillBadge from "@components/SkillBadge";
import { Card, Col, Row, Spacer, Text } from "@nextui-org/react";
import { Buildings } from "@phosphor-icons/react";
import colors from "@styles/_colors.module.scss";
import { Divider } from "antd";

type SkillsCategoryCardProps = {
  icon?: React.ReactNode;
  label: string;
  skills: string[];
};

const SkillsCategoryCard = ({
  icon,
  label,
  skills,
}: SkillsCategoryCardProps) => {
  return (
    <>
      <Card
        style={{
          height: "100%",
          width: "15rem",
          background: colors.quaternaryT500,
          padding: "1.5rem",
          flexShrink: 0,
          margin: "0 1rem",
        }}
        variant="flat"
      >
        <Row justify="flex-start" align="center">
          {icon ? (
            icon
          ) : (
            <Buildings size={45} weight="fill" color={colors.primary} />
          )}
          <Spacer x={0.5} />
          <Text h5 weight={"bold"} color={colors.primaryT200}>
            {label}
          </Text>
        </Row>
        <Divider />
        <Col style={{ overflowY: "scroll" }}>
          {skills.map((skill) => (
            <SkillBadge
              key={skill.id}
              name={skill.skill.name}
              color={skill.skill.color}
              id={skill.id}
            />
          ))}
        </Col>
      </Card>
    </>
  );
};

export default SkillsCategoryCard;
