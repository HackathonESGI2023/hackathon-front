"use client";

import { Button, Modal, Text } from "@nextui-org/react";
import SkillsCategoryCard from "../SkillsCategoryCard/SkillsCategoryCard";
import styles from "./SkillsModal.module.scss";

// Important : to be used with useState from where its been imported

type SkillsModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const SkillsModal = ({ setIsVisible, isVisible }: SkillsModalProps) => {
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
          Modal with a lot of content
        </Text>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.skillsContainer}>
          <SkillsCategoryCard label="Catégorie" />
          <SkillsCategoryCard label="Catégorie" />
          <SkillsCategoryCard label="Catégorie" />
          <SkillsCategoryCard label="Catégorie" />
          <SkillsCategoryCard label="Catégorie" />
          <SkillsCategoryCard label="Catégorie" />
          <SkillsCategoryCard label="Catégorie" />
          <SkillsCategoryCard label="Catégorie" />
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
  );
};

export default SkillsModal;
