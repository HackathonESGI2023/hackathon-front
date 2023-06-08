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
  user: any;
  isInMision: boolean;
  userContractType?: ContractTypeEnum;
  skills: SkillsDto[];
  seniorityTimeInYears: number;
}

const ProfileCards: React.FunctionComponent<TemplateProps> = ({
  user,
  isInMision,
  userContractType,
  skills,
  seniorityTimeInYears,
}) => {
  return (
    <>
      <Card isPressable isHoverable>
        <Card.Body>
          <Row justify="flex-start" css={{ pt: "5px" }}>
            <Grid md={7}>
              <Avatar
                size={"xl"}
                squared
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </Grid>
            <Grid md={15}>
              <Col>
                <Row justify="flex-start">
                  <Text>
                    {user.firstname} {user.lastname}
                  </Text>
                </Row>
                <Row justify="flex-start">
                  <BadgeMission inMission={isInMision} />
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
                {/* <Grid>
                  <BadgeSkill color="#190633">React</BadgeSkill>
                </Grid>
                <Grid>
                  <BadgeSkill color="#d5e0a8">Next.js</BadgeSkill>
                </Grid>
                <Grid>
                  <BadgeSkill color="#d5e0a8">Next.js</BadgeSkill>
                </Grid> */}
                {skills.map((skill) => (
                  <Grid key={skill.id}>
                    <BadgeSkill color={skill.color}>{skill.name}</BadgeSkill>
                  </Grid>
                ))}
              </Grid.Container>
            </Row>
            <Row justify="flex-start">
              <Grid.Container gap={1}>
                <Grid>
                  <BadgeSeniority seniorityTime={seniorityTimeInYears} />
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

export default ProfileCards;
