"use client";
import { Button, Checkbox, Input, Modal, Row, Text } from "@nextui-org/react";
import { MapPinLine } from "@phosphor-icons/react";

import * as React from "react";

interface TemplateProps {
  visible: boolean;
  onClose: () => void;
  userId: number;
}

const ModalProfile: React.FunctionComponent<TemplateProps> = ({
  visible,
  onClose,
  userId,
}) => {
  const closeHandler = () => {
    onClose();
  };

  // const { data } = useQuery(["user"], () => getUsersById(userId), {
  //   onSuccess: (data) => {
  //     console.log("data in modal", data);
  //   },
  // });

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to
          <Text b size={18}>
            NextUI
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          contentLeft={<MapPinLine fill="currentColor" />}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          contentLeft={<MapPinLine fill="currentColor" />}
        />
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto onPress={closeHandler}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProfile;
