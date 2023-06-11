"use client";

import { Button, Modal, Text } from "@nextui-org/react";
import { UserSkill } from "@prisma/client";
import SkillsCategoryCard from "../SkillsCategoryCard/SkillsCategoryCard";
import styles from "./SkillsModal.module.scss";

// Important : to be used with useState from where its been imported

type SkillsModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  skills: UserSkill[];
};

const SkillsModal = ({ setIsVisible, isVisible, skills }: SkillsModalProps) => {
  const skillsCategories = [
    ...new Set(
      skills.filter((us) => us.skill.category).map((us) => us.skill.category)
    ),
  ];

  return (
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
          Pannel de compétences
        </Text>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.skillsContainer}>
          {skillsCategories.map((category) => (
            <SkillsCategoryCard
              key={category}
              label={category}
              skills={skills.filter((us) => us.skill.category === category)}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={() => setIsVisible(false)}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SkillsModal;
