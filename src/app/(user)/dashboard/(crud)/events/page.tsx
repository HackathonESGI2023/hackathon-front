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
import { Select } from "antd";
import { updateMission } from "src/app/api/Missions/updateMission";
import toast from "react-hot-toast";
import { getEvents } from "src/app/api/Events/getEvents";
import { EventsList } from "../../components/EventsList.component";
import { ActivityType } from "@prisma/client";
import { useRecoilState } from "recoil";
import { userAtom } from "@utils/recoilAtoms.utils";
import { createEvent } from "src/app/api/Events/createEvent";
import { updateEvent } from "src/app/api/Events/updateEvent";
import { deleteEvent } from "src/app/api/Events/deleteEvent";

export default function MissionsCrud() {
  const { data: events, refetch: refetchEvents } = useQuery(
    "events",
    getEvents
  );

  const [user, setUser] = useRecoilState(userAtom);

  const [updating, setUpdating] = useState<boolean>(false);
  const handleUpdateResource = (id: number) => {
    const event = events?.find((event) => event.id === id);
    if (event) {
      setUpdating(true);
      setName(event.name);
      setDescription(event.description ?? "");
      setActivityType(event.activityType);
      setDate(new Date(event.date).toISOString().split("T")[0]);
      setAddress(event.address ?? "");
      setUpdateEventId(id);
    }
  };

  const handleResetUpdate = () => {
    setUpdating(false);
    setName("");
    setDescription("");
    setActivityType(ActivityType.OTHER);
    setDate("");
    setAddress("");
    setUpdateEventId(-1);
  };

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [activityType, setActivityType] = useState<ActivityType>(
    ActivityType.OTHER
  );
  const [date, setDate] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleRefetch = () => {
    refetchEvents();
  };

  const createEventMutation = useMutation(createEvent, {
    onSuccess: () => {
      handleRefetch();
      handleResetUpdate();
      toast.success("Ressource créée avec succès !");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Une erreur est survenue lors de l'action");
    },
  });

  const handleCreateMission = () => {
    if (name && activityType && date && address) {
      createEventMutation.mutate({
        name,
        description,
        activityType,
        date: new Date(date),
        address,
        creatorId: user?.id ?? -1,
      });
    }
  };

  const updateMissionMutation = useMutation(updateMission, {
    onSuccess: () => {
      handleRefetch();
      handleResetUpdate();
      toast.success("Ressource mise à jour avec succès !");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Une erreur est survenue lors de l'action");
    },
  });

  const [updateEventId, setUpdateEventId] = useState<number>(-1);

  const updateEventMutation = useMutation(updateEvent, {
    onSuccess: () => {
      handleRefetch();
      handleResetUpdate();
      toast.success("Ressource mise à jour avec succès !");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Une erreur est survenue lors de l'action");
    },
  });
  const handleUpdateMission = () => {
    if (name && activityType && date && address) {
      updateEventMutation.mutate({
        id: updateEventId,
        event: {
          name,
          description,
          activityType,
          date: new Date(date),
          address,
        },
      });
    }
  };

  const deleteEventMutation = useMutation(deleteEvent, {
    onSuccess: () => {
      handleRefetch();
      handleResetUpdate();
      toast.success("Ressource supprimée avec succès !");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Une erreur est survenue lors de l'action");
    },
  });

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

            <Card.Body>
              <EventsList
                events={events ?? []}
                crud={{
                  onUpdate: (id: number) => handleUpdateResource(id),
                  onDelete: (id: number) => deleteEventMutation.mutate(id),
                }}
              />
            </Card.Body>
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

            <Card.Body>
              <Input
                placeholder="Lorem ipsum"
                label="Quel est le nom de l'évènement ?"
                size="xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Spacer y={1} />
              <Textarea
                placeholder="Lorem ipsum"
                label="Quelle est la description de l'évènement ?"
                rows={10}
                size="xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Spacer y={1} />
              <Input
                label="Quelle est la date de l'évènement ?"
                size="xl"
                type="date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Spacer y={1} />
              <Input
                label="Quelle est l'adresse de l'évènement ?"
                placeholder="Lorem ipsum"
                size="xl"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Spacer y={1} />
              <Text
                style={{
                  fontSize: "1.2rem",
                }}
              >
                Quel utilisateur doit être assigné à la mission ?
              </Text>
              <Select
                defaultValue="-1"
                style={{ width: "100%" }}
                // @ts-ignore
                onChange={(value) => setActivityType(value)}
                value={activityType}
                showSearch
                size="large"
                options={Object.keys(ActivityType).map((key) => ({
                  label: key,
                  value: key,
                }))}
              />
            </Card.Body>
            <Card.Footer>
              <Button
                auto
                size="lg"
                onPress={() =>
                  updating ? handleUpdateMission() : handleCreateMission()
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
