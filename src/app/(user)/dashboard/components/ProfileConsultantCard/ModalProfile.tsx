"use client";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { Select } from "antd";

import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSlackUsers } from "src/app/api/Slack/getUsers";
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
  const { data: slackUsers, refetch: refetchSlackUsers } = useQuery(
    "slackUsers",
    getSlackUsers
  );

  const [slackUserId, setSlackUserId] = useState<string>("");

  useEffect(() => {
    console.log("slackUsers", slackUsers);
  }, [slackUsers]);

  const closeHandler = () => {
    onClose();
  };
  const queryClient = useQueryClient();

  const [user, setUser] = useState({
    firstname: userT.firstname,
    lastname: userT.lastname,
    address: userT.address,
    email: userT.email,
  });

  useEffect(() => {
    if (!visible) {
      setUser({
        firstname: userT.firstname,
        lastname: userT.lastname,
        address: userT.address,
        email: userT.email,
      });
    }
  }, [visible]);

  const editUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      closeHandler();
      toast.success("Utilisateur modifié avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la modification de l'utilisateur");
    },
  });

  const onSubmitEditUser = () => {
    console.log("user", user);
    editUserMutation.mutate({ ...user, slackId: slackUserId });
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
        <Input
          rounded
          bordered
          label="Adresse"
          placeholder="Adresse"
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          color="default"
        />
        <Select
          defaultValue="-1"
          style={{ width: "100%" }}
          onChange={(value) => setSlackUserId(value)}
          value={slackUserId}
          showSearch
          size="large"
          dropdownStyle={{ zIndex: 999999 }}
          options={[
            // @ts-ignore
            ...slackUsers?.members?.map((user) => ({
              label: user.real_name,
              value: user.id,
            })),
            { label: "Aucun utilisateur associé", value: "-1" },
          ]}
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
