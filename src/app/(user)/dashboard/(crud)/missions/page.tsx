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
import { ArrowsClockwise } from "@phosphor-icons/react";
import { Select } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { getCompanies } from "src/app/api/Companies/getCompanies";
import { createMission } from "src/app/api/Missions/createMission";
import { deleteMission } from "src/app/api/Missions/deleteMission";
import { getMissions } from "src/app/api/Missions/getMissions";
import { updateMission } from "src/app/api/Missions/updateMission";
import { getAllUsers } from "src/app/api/Users/getAllUsers";
import { MissionsList } from "../../components/MissionsList.component";

export default function MissionsCrud() {
  const { data: missions, refetch: refetchMissions } = useQuery(
    "missions",
    getMissions
  );

  const { data: companies, refetch: refetchCompanies } = useQuery(
    "companies",
    getCompanies
  );
  const { data: usersResponse, refetch: refetchUsers } = useQuery(
    "usersMissions",
    getAllUsers
  );

  const [updating, setUpdating] = useState<boolean>(false);
  const handleUpdateResource = (id: number) => {
    const mission = missions?.find((mission) => mission.id === id);
    if (mission) {
      setUpdating(true);
      setName(mission.name);
      setDescription(mission.description ?? "");
      setStartDate(new Date(mission.joinDate).toISOString().split("T")[0]);
      setEndDate(new Date(mission.leaveDate).toISOString().split("T")[0]);
      setUserId(mission.userId.toString());
      setCompanyId(mission.companyId.toString());
      setUpdateMissionId(id);
    }
  };

  const handleResetUpdate = () => {
    setUpdating(false);
    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setUserId("-1");
    setCompanyId("-1");
    setUpdateMissionId(-1);
  };

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [userId, setUserId] = useState<string>("-1");
  const [companyId, setCompanyId] = useState<string>("-1");

  const handleRefetch = () => {
    refetchMissions();
    refetchCompanies();
    refetchUsers();
  };

  const createMissionMutation = useMutation(createMission, {
    onSuccess: () => {
      handleRefetch();
      handleResetUpdate();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Une erreur est survenue lors de l'action");
    },
  });

  const handleCreateMission = () => {
    if (name && startDate && endDate && userId && companyId) {
      createMissionMutation.mutate({
        name,
        description,
        joinDate: new Date(startDate),
        leaveDate: new Date(endDate),
        userId: +userId,
        companyId: +companyId,
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

  const [updateMissionId, setUpdateMissionId] = useState<number>(-1);
  const handleUpdateMission = () => {
    if (name && startDate && endDate && userId && companyId) {
      updateMissionMutation.mutate({
        id: updateMissionId,
        mission: {
          name,
          description,
          joinDate: new Date(startDate),
          leaveDate: new Date(endDate),
          userId: +userId,
          companyId: +companyId,
        },
      });
    }
  };

  const deleteMissionMutation = useMutation(deleteMission, {
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
                <Text h3>Liste de missions</Text>
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
              <MissionsList
                missions={missions ?? []}
                crud={{
                  onUpdate: (id: number) => handleUpdateResource(id),
                  onDelete: (id: number) => deleteMissionMutation.mutate(id),
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
                {updating ? "Mettre à jour" : "Ajouter"} une mission
              </Text>
            </Card.Header>

            <Card.Body>
              <Input
                placeholder="Lorem ipsum"
                label="Quel est le nom de la mission ?"
                size="xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Spacer y={1} />
              <Textarea
                placeholder="Lorem ipsum"
                label="Quelle est la description de la mission ?"
                rows={10}
                size="xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Spacer y={1} />
              <Grid.Container gap={2}>
                <Grid xs={12} md={6}>
                  <Input
                    label="Quelle est la date de début de mission ?"
                    size="xl"
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Input
                    label="Quelle est la date de fin de mission ?"
                    size="xl"
                    type="date"
                    fullWidth
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Grid>
              </Grid.Container>
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
                onChange={(value) => setUserId(value)}
                value={userId}
                showSearch
                size="large"
                options={[
                  // @ts-ignore
                  ...(usersResponse?.map((user) => ({
                    value: `${user.id}`,
                    label: `${user.firstname} ${user.lastname} (${user.email})`,
                  })) ?? []),
                  { value: "-1", label: "Aucun" },
                ]}
              />
              <Spacer y={1} />
              <Text
                style={{
                  fontSize: "1.2rem",
                }}
              >
                Dans quelle entreprise le consultant doit être envoyé ?
              </Text>
              <Select
                defaultValue="-1"
                style={{ width: "100%" }}
                onChange={(value) => setCompanyId(value)}
                value={companyId}
                showSearch
                size="large"
                options={[
                  // @ts-ignore
                  ...(companies?.map((company) => ({
                    value: `${company.id}`,
                    label: `${company.name}`,
                  })) ?? []),
                  { value: "-1", label: "Aucune" },
                ]}
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
                {updating ? "Modifier" : "Ajouter"} la mission
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
