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
  Row,
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
  return (
    <>
      <Card isPressable variant="flat">
        <Card.Body>
          <Row justify="flex-start" css={{ pt: "5px" }}>
            <Grid md={7}>
              <Avatar size={"xl"} squared src={profilePicture} />
            </Grid>
            <Grid md={15}>
              <Col>
                <Row justify="flex-start">
                  <Text>{fullname}</Text>
                </Row>
                <Row justify="flex-start">
                  <BadgeMission inMission={isInMission} />

                  {userContractType && (
                    <BadgeContract contractType={userContractType} />
                  )}
                </Row>
              </Col>
            </Grid>
            <Grid md={2}>
              <CaretRight size={25} />
            </Grid>
          </Row>

          <Col css={{ pt: "10px", mx: 13 }}>
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
          </Col>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProfileConsultantCard;
