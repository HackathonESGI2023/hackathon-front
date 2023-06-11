"use client";
import { Avatar, Button, Card, Input, Modal, Text } from "@nextui-org/react";

import * as React from "react";
import { useState } from "react";

interface TemplateProps {
  visible: boolean;
  onClose: () => void;
  userT: any;
}

const ModalProfileSeeMore: React.FunctionComponent<TemplateProps> = ({
  visible,
  onClose,
  userT,
}) => {
  const closeHandler = () => {
    onClose();
  };

  const [inMission, setInMission] = useState<string>("");
  const [mission, setMission] = useState<any>([]);

  useState(() => {
    if (userT?.Mission.length > 0) {
      setInMission("Oui");
      setMission(userT.Mission);
    } else {
      setInMission("Non");
      setMission([]);
    }
  }, []);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
      width="30%"
    >
      <Modal.Header>
        <Avatar size={"xl"} squared src={userT?.profile_picture} />
      </Modal.Header>
      <Modal.Body>
        <Input label="Prénom" value={userT?.firstname} />
        <Input label="Nom" value={userT?.lastname} />
        <Input label="En mission?" value={inMission} />

        {mission.length > 0 &&
          mission.map((mission: any) => {
            return (
              <Card css={{ mw: "400px" }} key={mission.id}>
                <Card.Body>
                  <Text h5>Entreprise : {mission?.Company.name}</Text>
                  <Text h6>Nom de la mission: {mission?.name}</Text>
                </Card.Body>
              </Card>
            );
          })}
        <Input label="Adresse" value={userT?.address} />
        <Input label="Numéro de téléphone" value="06 12 34 56 78" />
        <Input label="Salaire mensuel" value="2800€ (valeur random)" />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProfileSeeMore;
