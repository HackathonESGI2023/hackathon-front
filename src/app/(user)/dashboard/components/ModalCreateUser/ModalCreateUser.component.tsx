/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  Avatar,
  Button,
  Grid,
  Input,
  Modal,
  Radio,
  Spacer,
  Text,
} from "@nextui-org/react";
import { Role } from "@prisma/client";
import { toBase64 } from "@utils/files.utils";
import { Select } from "antd";
import * as React from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { getSlackUsers } from "src/app/api/Slack/getUsers";
import { createUser } from "src/app/api/Users/createUser";

interface ModalCreateUserProps {
  visible: boolean;
  onClose: () => void;
}

const ModalCreateUser: React.FunctionComponent<ModalCreateUserProps> = ({
  visible,
  onClose,
}) => {
  // Function that generate a random password
  const generatePassword = () => {
    const length = 20;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  const closeHandler = () => {
    onClose();
  };

  const [profilePicture, setProfilePicture] = React.useState<string>(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
  );
  const [firstname, setFirstName] = React.useState<string>("");
  const [lastname, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password] = React.useState<string>(generatePassword());
  const [address, setAddress] = React.useState<string>("");
  const [role, setRole] = React.useState<Role>(Role.CONSULTANT);
  const [slackId, setSlackId] = React.useState<string>("");

  const pictureRef = React.useRef<HTMLInputElement>(null);
  const handleAddProfilePicture = async (file: File) => {
    // Check if file is an image

    if (
      !file.type.includes("image") &&
      !["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    ) {
      toast.error("Votre logo n'est pas une image !");
    } else {
      setProfilePicture(await toBase64(file));
      toast.success(`Votre logo  "${file.name}" est prêt a être envoyé`);
    }
  };

  const { data: slackUsers, refetch: refetchSlackUsers } = useQuery(
    "slackUsers",
    getSlackUsers
  );

  React.useEffect(() => {
    refetchSlackUsers();
  }, [visible]);

  const createUserMutation = useMutation(createUser, {
    onSuccess: () => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setAddress("");
      setRole(Role.CONSULTANT);
      setSlackId("");
      closeHandler();
      toast.success("Utilisateur créé avec succès");
    },
    onError: (error: any) => {
      toast.error("Erreur lors de la création de l'utilisateur");
    },
  });

  return (
    <Modal open={visible} onClose={closeHandler} width="50vw" closeButton>
      <Modal.Header>
        <Text h3>Ajout d'un nouvel utilisateur</Text>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Avatar
            src={profilePicture}
            css={{ size: "$20", cursor: "pointer" }}
            onClick={() => pictureRef.current?.click()}
          />
          <input
            type="file"
            ref={pictureRef}
            style={{
              display: "none",
            }}
            onChange={async (e) => {
              if (e.target.files) {
                handleAddProfilePicture(e.target.files[0]);
              }
            }}
          />
        </div>
        <Grid.Container gap={2}>
          <Grid xs={12} md={6}>
            <Input
              label="Quel est son prénom"
              placeholder="John"
              fullWidth
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              size="xl"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Input
              label="Quel est son nom de famille"
              placeholder="Doe"
              fullWidth
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              size="xl"
            />
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2}>
          <Grid xs={12} md={6}>
            <Input
              label="Quel est son email"
              placeholder="jdoe@example.com"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="xl"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Input
              label="Voici son mot de passe temporaire"
              placeholder="********"
              fullWidth
              value={password}
              size="xl"
            />
          </Grid>
        </Grid.Container>
        <Input
          label="Quelle est son adresse"
          placeholder="1 rue de la paix, 75000 Paris"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          size="xl"
        />
        <Radio.Group
          orientation="horizontal"
          label="Quel est son rôle sur BRIDGE by Carbon ?"
          defaultValue={role}
          value={role}
          // @ts-ignore
          onChange={(e) => setRole(e)}
        >
          <Radio value={Role.CONSULTANT} color="primary">
            Consultant
          </Radio>
          <Radio value={Role.TECHNICAL_OFFICER}>
            Directeur des opérations techniques
          </Radio>
          <Radio value={Role.SUPPORT}>Support</Radio>
        </Radio.Group>
        <Spacer y={1} />
        <Text>Qui est cet utilisateur sur Slack ?</Text>
        <Select
          defaultValue="-1"
          style={{ width: "100%" }}
          onChange={(value) => setSlackId(value)}
          value={slackId}
          showSearch
          size="large"
          dropdownStyle={{ zIndex: 999999 }}
          options={
            slackUsers
              ? [
                  // @ts-ignore
                  ...slackUsers?.members?.map((user) => ({
                    label: `${user.real_name} (${
                      user.profile?.email ?? "Email masquée"
                    })`,
                    value: user.id,
                  })),
                  { label: "Aucun utilisateur associé", value: "-1" },
                ]
              : []
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          flat
          size={"lg"}
          color={"success"}
          auto
          onPress={() =>
            createUserMutation.mutate({
              firstname,
              lastname,
              email,
              password,
              address,
              roles: [role],
              slackId,
              profile_picture: profilePicture,
            })
          }
        >
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateUser;
