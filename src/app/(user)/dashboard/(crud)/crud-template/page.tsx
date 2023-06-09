"use client";
import {
  Button,
  Card,
  Grid,
  Input,
  Spacer,
  Text,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { useMutation, useQuery } from "react-query";
import { getMissions, StuffedMission } from "src/app/api/Missions/getMissions";
import { MissionsList } from "../../components/MissionsList.component";
import { useEffect, useState } from "react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userAtom } from "@utils/recoilAtoms.utils";

export default function MissionsCrud() {
  const [user, setUser] = useRecoilState(userAtom);

  const handleCreateResource = () => {};

  const [updating, setUpdating] = useState<boolean>(false);
  const handleUpdateResource = () => {};

  const handleResetUpdate = () => {
    setUpdating(false);
  };

  const handleRefetch = () => {};

  return (
    <div>
      <Grid.Container gap={2}>
        <Grid
          xs={12}
          md={6}
          css={{
            height: "80vh",
          }}
        >
          <Card
            variant="flat"
            css={{
              backgroundColor: "#fcfcfc",
              padding: "1rem",
            }}
          >
            <Card.Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text h3>Liste de évènements</Text>
                <Tooltip content={"Actualiser les données"}>
                  <Button
                    auto
                    onPress={() => handleRefetch()}
                    icon={<ArrowsClockwise size={24} />}
                  />
                </Tooltip>
              </div>
            </Card.Header>

            <Card.Body>{/** TABLE GET */}</Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card
            variant="flat"
            css={{
              backgroundColor: "#fcfcfc",
              padding: "1rem",
            }}
          >
            <Card.Header>
              <Text h3>
                {updating ? "Mettre à jour" : "Ajouter"} un évènement
              </Text>
            </Card.Header>

            <Card.Body>{/** FORM CREATE/UPDATE */}</Card.Body>
            <Card.Footer>
              <Button
                auto
                size="lg"
                onPress={() =>
                  updating ? handleUpdateResource() : handleCreateResource()
                }
              >
                {updating ? "Modifier" : "Ajouter"} l'évènement
              </Button>
              {updating && (
                <>
                  <Spacer x={1} />
                  <Button auto size="lg" onClick={() => handleResetUpdate()}>
                    Annuler
                  </Button>
                </>
              )}
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
}
