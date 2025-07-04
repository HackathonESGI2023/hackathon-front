"use client";

import SkillBadge from "@components/SkillBadge/SkillBadge";
import SkillBadgeSlot from "@components/SkillBadgeSlot/SkillBadgeSlot";
import { Button, Col, Modal, Row, Text } from "@nextui-org/react";
import { SkillLevel } from "@prisma/client";
import { userAtom } from "@utils/recoilAtoms.utils";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { upsertSkills } from "src/app/api/Users/upsertSkills";
import styles from "./SelectPinnedSkills.module.scss";

type SelectPinnedSkillsProps = {};

interface Badge {
  id: number;
  name: string;
  color: string;
  category: string;
  slot: number | null;
}

const SelectPinnedSkills = ({}: SelectPinnedSkillsProps) => {
  const [slots, setSlots] = useState([null, null, null]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [user, setUser] = useRecoilState(userAtom);
  const userskills = user?.UserSkill;

  useEffect(() => {
    if (userskills) {
      const skills = userskills?.map((us) => {
        return { ...us.skill, id: us.id, slot: null };
      });
      setBadges(skills);
    }
  }, [userskills]);

  const handleDrop = (droppedBadgeId, droppedItem) => {
    setBadges((oldBadges) => {
      const newBadges = [...oldBadges];
      const badgeIndex = newBadges.findIndex((b) => b.id === droppedItem.id);

      const oldSlotBadgeIndex = newBadges.findIndex(
        (b) => b.slot === droppedBadgeId
      );
      if (oldSlotBadgeIndex !== -1) {
        newBadges[oldSlotBadgeIndex] = {
          ...newBadges[oldSlotBadgeIndex],
          slot: null,
        };
      }

      if (badgeIndex !== -1) {
        newBadges[badgeIndex] = {
          ...newBadges[badgeIndex],
          slot: droppedBadgeId,
        };
      }

      return newBadges;
    });
  };

  const sortedBadges = badges
    .filter((badge) => badge.slot === null)
    .sort((a, b) => a.category.localeCompare(b.category));

  let encounteredCategories = [];

  const prepareNewUser = () => {
    const selectedSkills = badges.filter((badge) => badge.slot !== null);
    const newUser = { ...user };
    const newUserSkills = newUser.UserSkill?.map((us) => {
      const skill = selectedSkills.find((s) => s.id === us.id);
      if (skill) {
        return { ...us, isStarred: true };
      }
      return { ...us, isStarred: false };
    });
    newUser.UserSkill = newUserSkills;
    return newUser;
  };

  const updateUserMutation = useMutation(upsertSkills, {
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleMutation = () => {
    const updatedUser = prepareNewUser();
    const pouet = {
      skills: updatedUser.UserSkill?.map((us) => {
        return { id: us.id, isStarred: us.isStarred, level: SkillLevel.JUNIOR };
      }),
    };
    console.log("pouet", pouet);
    updateUserMutation.mutate(pouet);
  };

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Compétences épinglés</Button>
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClose={() => setIsVisible(false)}
        open={isVisible}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Mettez en valeur 3 compétences sur votre profil
          </Text>
        </Modal.Header>
        <Modal.Body
          style={{ height: "100%", width: "100%", overflow: "hidden" }}
        >
          <div className={styles.container}>
            <Col
              className={styles.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {slots.map((slotId, index) => (
                <SkillBadgeSlot key={index} onDrop={handleDrop} id={index}>
                  {badges
                    .filter((badge) => badge.slot === index)
                    .map((badge) => (
                      <SkillBadge
                        key={badge.id}
                        name={badge.name}
                        color={badge.color}
                        id={badge.id}
                        onDrop={handleDrop}
                      />
                    ))}
                </SkillBadgeSlot>
              ))}
            </Col>

            <Col
              span={24}
              className={styles.title}
              style={{ display: "flex", flexWrap: "wrap", overflow: "scroll" }}
            >
              {sortedBadges.map((badge) => {
                let categoryLabel = null;

                if (!encounteredCategories.includes(badge.category)) {
                  categoryLabel = (
                    <>
                      <Row style={{ marginTop: "1.5rem" }}>
                        <Text size={"$2xl"} weight={"bold"}>
                          {badge.category}
                        </Text>
                      </Row>
                    </>
                  );
                  encounteredCategories.push(badge.category);
                }

                return (
                  <>
                    {categoryLabel}
                    <SkillBadge
                      key={badge.id}
                      name={badge.name}
                      color={badge.color}
                      id={badge.id}
                      onDrop={handleDrop}
                    />
                  </>
                );
              })}
            </Col>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={handleMutation}>Test envoie requete</Button> */}
          <Button auto flat color="error" onPress={() => setIsVisible(false)}>
            Close
          </Button>
          <Button auto onPress={() => setIsVisible(false)}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SelectPinnedSkills;
