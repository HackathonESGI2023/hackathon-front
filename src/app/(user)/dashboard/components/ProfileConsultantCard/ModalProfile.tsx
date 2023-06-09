"use client";
import { Button, Input, Modal, Text } from "@nextui-org/react";

import * as React from "react";
import { useEffect, useState } from "react";

interface TemplateProps {
  visible: boolean;
  onClose: () => void;
  userId: number;
  userT: any;
}

const ModalProfile: React.FunctionComponent<TemplateProps> = ({
  visible,
  onClose,
  userId,
  userT,
}) => {
  const closeHandler = () => {
    onClose();
  };

  const [firstname, setFirstname] = useState(userT.firstname);
  const [lastname, setLastname] = useState(userT.lastname);
  const [email, setEmail] = useState(userT.email);

  useEffect(() => {
    if (!visible) {
      setFirstname(userT.firstname);
      setLastname(userT.lastname);
      setEmail(userT.email);
    }
  }, [visible]);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Edition du profil de{" "}
          <Text b size={18}>
            {userT.firstname} {userT.lastname}
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          rounded
          bordered
          label="Prénom"
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          color="default"
        />
        <Input
          rounded
          bordered
          label="Nom"
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          color="default"
        />
        <Input
          rounded
          bordered
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          color="default"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto onPress={closeHandler}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProfile;
