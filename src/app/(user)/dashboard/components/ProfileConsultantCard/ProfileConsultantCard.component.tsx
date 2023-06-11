"use client";
import { BadgeContract } from "@components/UI/Badge/BadgeContract";
import { BadgeMission } from "@components/UI/Badge/BadgeMission";
import { BadgeSeniority } from "@components/UI/Badge/BadgeSeniority";
import { BadgeSkill } from "@components/UI/Badge/BadgeSkill";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Grid,
  Modal,
  Progress,
  Row,
  Spacer,
  Text,
  Tooltip,
} from "@nextui-org/react";
import {
  ChatCircle,
  Confetti,
  PencilLine,
  Trash,
  Trophy,
} from "@phosphor-icons/react";
import { ContractTypeEnum } from "@schemas/contract.schema";
import { SkillsDto } from "@schemas/skills.schema";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "src/app/api/Users/deleteUser";
import ModalEditProfile from "./ModalProfile";
import ModalProfileSeeMore from "./ModalProfileSeeMore";
import { Wysiwyg } from "@components/Wysiwyg/Wysiwyg.component";
import { sendMessage } from "src/app/api/Slack/sendMessage";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userAtom } from "@utils/recoilAtoms.utils";

interface TemplateProps {
  userP: any;
  userId: number;
  profilePicture: string;
  fullname: string;
  isInMission: boolean;
  seniorityTimeInYear: number;
  pinedSkills: SkillsDto[];
  slackId?: number;
  progess?: number;
  userContractType?: ContractTypeEnum;
  onPress?: () => void;
  onCrud?: boolean;
}

const ProfileConsultantCard: React.FunctionComponent<TemplateProps> = ({
  userP,
  userId,
  profilePicture,
  fullname,
  isInMission,
  pinedSkills,
  seniorityTimeInYear,
  slackId,
  progess,
  userContractType,
  onPress,
  onCrud,
}) => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState(false);
  const [visibleSeeMore, setVisibleSeeMore] = useState(false);
  const [visibleSendMessage, setVisibleSendMessage] = useState(false);
  const [message, setMessage] = useState("");
  const handleEditionModal = () => setVisible(true);
  const handleSeeMoreModal = () => setVisibleSeeMore(true);
  const handleSendMessageModal = () => setVisibleSendMessage(true);

  const sendMessageMutation = useMutation(sendMessage, {
    onSuccess: () => {
      toast.success("Message envoyé !");
    },
    onError: () => {
      toast.error("Erreur lors de l'envoie du message");
    },
  });

  const closeHandler = () => {
    setVisible(false);
  };
  const closeHandlerSeeMore = () => {
    setVisibleSeeMore(false);
  };

  const levelConverter = (level: number) => {
    return Math.floor(level / 10);
  };
  const levelRestConverter = (level: number) => {
    return (level % 10) * 10;
  };

  const onSubmitDeleteUser = () => {
    deleteUserMutation.mutate(userId);
  };

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const itemsOnCrud = [
    {
      key: "send",
      description: "Envoie avec Slack",
      icon: <ChatCircle size={22} fill="var(--nextui-colors-secondary)" />,
      text: "Envoyer un message",
      function: () => {
        handleSendMessageModal();
      },
    },
    {
      key: "edit",
      description: "Edition",
      icon: <PencilLine size={22} fill="var(--nextui-colors-secondary)" />,
      text: "Editer un profil",
      function: () => {
        handleEditionModal();
      },
    },
    {
      key: "delete",
      description: "Suppression",
      icon: <Trash size={22} fill="var(--nextui-colors-secondary)" />,
      text: "Suppression un profil",
      function: () => {
        onSubmitDeleteUser();
      },
    },
  ];

  const items = [
    {
      key: "send",
      description: "Envoie avec Slack",
      icon: <ChatCircle size={22} fill="var(--nextui-colors-secondary)" />,
      text: "Envoyer un message",
    },
  ];

  !slackId && itemsOnCrud.shift();
  !slackId && items.shift();

  return (
    <>
      <Card
        isPressable
        variant="flat"
        css={{ padding: "1.5rem" }}
        onPress={handleSeeMoreModal}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Row justify="space-between" css={{ pt: "5px" }}>
            <Col css={{ width: "60%" }}>
              <Avatar size={"xl"} squared src={profilePicture} />
            </Col>

            <Col
              css={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
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
                justifyContent: "flex-end",
              }}
            >
              <Row justify="flex-end" css={{ mx: 1 }}>
                {!onCrud ? (
                  slackId && (
                    <Tooltip
                      content={"Envoyer un message"}
                      rounded
                      color="primary"
                    >
                      <Button
                        auto
                        css={{ backgroundColor: "#FBF8F1" }}
                        icon={
                          <ChatCircle size={20} color="#E6D6B1" weight="fill" />
                        }
                      />
                    </Tooltip>
                  )
                ) : (
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      css={{ background: "#E6D6B1", color: "#FBF8F1" }}
                    >
                      Options
                    </Dropdown.Button>
                    <Dropdown.Menu
                      color="secondary"
                      aria-label="Actions"
                      css={{ $$dropdownMenuWidth: "280px" }}
                    >
                      {itemsOnCrud.map((item) => (
                        <Dropdown.Item key={item.key} icon={item.icon}>
                          <Button light onPress={item.function}>
                            {item.text}
                          </Button>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
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
      <ModalEditProfile
        visible={visible}
        onClose={closeHandler}
        userId={userId}
        userT={userP}
      />
      <ModalProfileSeeMore
        visible={visibleSeeMore}
        onClose={closeHandlerSeeMore}
        userT={userP}
      />
      <Modal
        open={visibleSendMessage}
        onClose={() => setVisibleSendMessage(false)}
        closeButton
        width="50vw"
      >
        <Wysiwyg
          value={message}
          setValue={setMessage}
          width="100%"
          onSubmit={() => {
            sendMessageMutation.mutate({ message, receiverId: userP.id });
            setVisibleSendMessage(false);
            setMessage("");
          }}
        />
      </Modal>
    </>
  );
};

export default ProfileConsultantCard;
