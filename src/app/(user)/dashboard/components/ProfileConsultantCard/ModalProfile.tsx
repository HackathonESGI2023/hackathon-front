"use client";
import { Button, Input, Modal, Text } from "@nextui-org/react";

import * as React from "react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "src/app/api/Users/patchUser";

interface TemplateProps {
  visible: boolean;
  onClose: () => void;
  userId: number;
  userT: any;
}

const ModalEditProfile: React.FunctionComponent<TemplateProps> = ({
  visible,
  onClose,
  userId,
  userT,
}) => {
  const closeHandler = () => {
    onClose();
  };
  const queryClient = useQueryClient();
  const [firstname, setFirstname] = useState(userT.firstname);
  const [lastname, setLastname] = useState(userT.lastname);
  const [email, setEmail] = useState(userT.email);

  const [user, setUser] = useState({
    firstname: userT.firstname,
    lastname: userT.lastname,
    email: userT.email,
  });

  useEffect(() => {
    if (!visible) {
      setUser({
        firstname: userT.firstname,
        lastname: userT.lastname,
        email: userT.email,
      });
    }
  }, [visible]);

  const editUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const onSubmitEditUser = () => {
    console.log(user);

    editUserMutation.mutate(user);
  };

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
          value={user.firstname}
          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          color="default"
        />
        <Input
          rounded
          bordered
          label="Nom"
          placeholder="Nom"
          value={user.lastname}
          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          color="default"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto onPress={onSubmitEditUser}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditProfile;
