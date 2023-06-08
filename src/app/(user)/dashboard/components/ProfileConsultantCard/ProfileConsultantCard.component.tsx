"use client";
import { BadgeContract } from "@components/UI/Badge/BadgeContract";
import { BadgeMission } from "@components/UI/Badge/BadgeMission";
import { BadgeSeniority } from "@components/UI/Badge/BadgeSeniority";
import { BadgeSkill } from "@components/UI/Badge/BadgeSkill";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Grid,
  Progress,
  Row,
  Spacer,
  Text,
  Tooltip,
} from "@nextui-org/react";
import { CaretRight, Confetti, Trophy } from "@phosphor-icons/react";
import { ContractTypeEnum } from "@schemas/contract.schema";
import { SkillsDto } from "@schemas/skills.schema";

interface TemplateProps {
  profilePicture: string;
  fullname: string;
  isInMission: boolean;
  seniorityTimeInYear: number;
  pinedSkills: SkillsDto[];
  slackId?: number;
  progess?: number;
  userContractType?: ContractTypeEnum;
  onPress?: () => void;
}

const ProfileConsultantCard: React.FunctionComponent<TemplateProps> = ({
  profilePicture,
  fullname,
  isInMission,
  pinedSkills,
  seniorityTimeInYear,
  slackId,
  progess,
  userContractType,
  onPress,
}) => {
  const levelConverter = (level: number) => {
    return Math.floor(level / 10);
  };
  const levelRestConverter = (level: number) => {
    return (level % 10) * 10;
  };

  return (
    <>
      <Card isPressable variant="flat" css={{ padding: "1.5rem" }}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Row justify="space-between" css={{ pt: "5px" }}>
            <Col>
              <Avatar size={"xl"} squared src={profilePicture} />
            </Col>

            <Col>
              <Row justify="flex-start">
                <Text>{fullname}</Text>
              </Row>
              <Row justify="flex-start">
                <BadgeMission inMission={isInMission} />
                <Spacer x={0.5} />
                {userContractType && (
                  <BadgeContract contractType={userContractType} />
                )}
              </Row>
            </Col>

            <Col
              css={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Row justify="flex-end">
                <CaretRight size={25} />
              </Row>
            </Col>
          </Row>

          <Row justify="flex-start">
            <Grid.Container gap={1}>
              {pinedSkills.map((skill) => (
                <Grid key={skill.id}>
                  <BadgeSkill color={skill.color}>{skill.name}</BadgeSkill>
                </Grid>
              ))}
            </Grid.Container>
          </Row>

          <Row justify="flex-start">
            <Grid.Container gap={1}>
              <Grid>
                <BadgeSeniority seniorityTime={seniorityTimeInYear} />
              </Grid>

              <Grid>
                <Tooltip content={"Meilleur employé"} rounded color="primary">
                  <Badge color="error" content="2" shape="circle">
                    <Trophy size={32} color="#8ca413" weight="fill" />
                  </Badge>
                </Tooltip>
              </Grid>

              <Grid>
                <Tooltip content={"Meilleur employé"} rounded color="primary">
                  <Badge color="error" content="2" shape="circle">
                    <Confetti size={32} color="#d71414" weight="fill" />
                  </Badge>
                </Tooltip>
              </Grid>
            </Grid.Container>
          </Row>

          {progess && (
            <Row>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Niveau {levelConverter(progess)} </Text>
                <Progress
                  value={levelRestConverter(progess)}
                  shadow
                  color="warning"
                  status="warning"
                />
              </div>
            </Row>
          )}
        </div>
      </Card>
    </>
  );
};

export default ProfileConsultantCard;
