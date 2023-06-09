"use client";

import SkillBadge from "@components/SkillBadge/SkillBadge";
import SkillBadgeSlot from "@components/SkillBadgeSlot/SkillBadgeSlot";
import { Button, Modal, Row, Text } from "@nextui-org/react";
import { useState } from "react";
import styles from "./SelectPinnedSkills.module.scss";

type SelectPinnedSkillsProps = {};

const SelectPinnedSkills = ({}: SelectPinnedSkillsProps) => {
  const [slots, setSlots] = useState([null, null, null]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [badges, setBadges] = useState([
    { id: 1, name: "React", color: "red", slot: null },
    { id: 2, name: "TypeScript", color: "green", slot: null },
    { id: 3, name: "Next.js", color: "blue", slot: null },
    { id: 4, name: "Angular", color: "white", slot: null },
    { id: 5, name: "Vue.js", color: "yellow", slot: null },
    { id: 6, name: "Svelte", color: "purple", slot: null },
  ]);

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
        <Modal.Body>
          <div className={styles.container}>
            <Row align="center">
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
            </Row>
            <Row align="center">
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
            </Row>
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
