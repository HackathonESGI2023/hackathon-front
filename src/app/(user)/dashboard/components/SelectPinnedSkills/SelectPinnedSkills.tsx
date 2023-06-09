"use client";

import SkillBadge from "@components/SkillBadge/SkillBadge";
import SkillBadgeSlot from "@components/SkillBadgeSlot/SkillBadgeSlot";
import { Button, Col, Modal, Text } from "@nextui-org/react";
import { Skill } from "@prisma/client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getSkills } from "src/app/api/Skills/getSkills";
import styles from "./SelectPinnedSkills.module.scss";

type SelectPinnedSkillsProps = {};

interface Badge extends Skill {
  slot: number | null;
}

const SelectPinnedSkills = ({}: SelectPinnedSkillsProps) => {
  const [slots, setSlots] = useState([null, null, null]);
  const [badges, setBadges] = useState([] as Badge[]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { data: skills, isLoading, isError } = useQuery("skills", getSkills);

  skills && console.log(skills);

  useEffect(() => {
    if (skills && !isLoading && !isError) {
      const dndBadges = skills.map((skill) => ({
        ...skill,
        slot: null,
      }));
      console.log("dndBadges", dndBadges);
      setBadges(dndBadges);
    }
  }, [skills, isLoading, isError]); // dependencies

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

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>pinned skills</Button>
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
              {badges
                .filter((badge) => badge.slot === null)
                .map((badge) => (
                  <SkillBadge
                    key={badge.id}
                    name={badge.name}
                    color={badge.color}
                    id={badge.id}
                    onDrop={handleDrop}
                  />
                ))}
            </Col>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
