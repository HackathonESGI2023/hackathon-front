"use client";
import {
  Avatar,
  Button,
  Card,
  Grid,
  Input,
  Spacer,
  Table,
  Text,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { useMutation, useQuery } from "react-query";
import { use, useEffect, useRef, useState } from "react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userAtom } from "@utils/recoilAtoms.utils";
import { ContractType } from "@prisma/client";
import { Select } from "antd";
import { createContract } from "src/app/api/Contract/createContract";
import { updateContract } from "src/app/api/Contract/updateContract";
import { getUsers } from "src/app/api/Users/getUsers";
import { getContracts } from "src/app/api/Contract/getContracts";
import { deleteContract } from "src/app/api/Contract/deleteContract";
import { getAllUsers } from "src/app/api/Users/getAllUsers";

export default function MissionsCrud() {
  const [user, setUser] = useRecoilState(userAtom);

  const { data: contracts, refetch: refetchContracts } = useQuery(
    "contracts",
    getContracts
  );

  const { data: usersResponse, refetch: refetchUsers } = useQuery(
    "users",
    getAllUsers
  );

  const [contractType, setContractType] = useState<ContractType>(
    ContractType.CDI
  );
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [userId, setUserId] = useState<number>(-1);

  const createSkillMutation = useMutation(createContract, {
    onSuccess: () => {
      toast.success("contrat créé avec succès");
      handleRefetch();
      handleResetUpdate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la création de la contrat");
      console.error(error);
    },
  });
  const handleCreateResource = () => {
    createSkillMutation.mutate({
      contractType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
    });
  };
  const [updating, setUpdating] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<number>(-1);

  const updateSkillMutation = useMutation(updateContract, {
    onSuccess: () => {
      toast.success("contrat mis à jour avec succès");
      handleRefetch();
      handleResetUpdate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour du contrat");
      console.error(error);
    },
  });

  const handleUpdateResource = () => {
    updateSkillMutation.mutate({
      id: updatingId,
      contract: {
        contractType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
      },
    });
  };

  const handleResetUpdate = () => {
    setUpdating(false);
    setUpdatingId(-1);
    setContractType(ContractType.CDI);
    setStartDate("");
    setEndDate("");
    setUserId(-1);
  };

  const handleRefetch = () => {
    refetchContracts();
    refetchUsers();
  };

  useEffect(() => {
    handleRefetch();
  }, []);

  const deleteContractMutation = useMutation(deleteContract, {
    onSuccess: () => {
      toast.success("contrat supprimé avec succès");
      handleRefetch();
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression du contrat");
      console.error(error);
    },
  });

  return (
    <div>
      <Grid.Container gap={2}>
        <Grid
          xs={12}
          md={8}
          css={{
            height: "80vh",
          }}
        >
          <Card
            variant="flat"
            css={{
              backgroundColor: "#fcfcfc",
              padding: "1rem",
              overflowY: "auto",
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
                <Text h3>Liste des contrats</Text>
                <Tooltip content={"Actualiser les données"}>
                  <Button
                    auto
                    onPress={() => handleRefetch()}
                    icon={<ArrowsClockwise size={24} />}
                  />
                </Tooltip>
              </div>
            </Card.Header>

            {/** TABLE GET */}

            <div style={{ height: "100%" }}>
              <Table
                aria-label="Liste des contrats"
                style={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Table.Header>
                  <Table.Column>Type de contrat</Table.Column>
                  <Table.Column>Date début</Table.Column>
                  <Table.Column>Date fin</Table.Column>
                  <Table.Column>Utilisateur</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body
                  css={{
                    height: "100%",
                    overflowY: "auto",
                  }}
                  onLoadMore={() => {}}
                >
                  {contracts?.map((contract) => (
                    <Table.Row key={contract.id}>
                      <Table.Cell>{contract.contractType}</Table.Cell>
                      <Table.Cell>
                        {new Date(contract.startDate).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        {contract.endDate
                          ? new Date(contract.endDate).toLocaleDateString()
                          : "—"}
                      </Table.Cell>
                      <Table.Cell>
                        {
                          usersResponse?.find(
                            (user) => user.id === contract.userId
                          )?.firstname
                        }{" "}
                        {
                          usersResponse?.find(
                            (user) => user.id === contract.userId
                          )?.lastname
                        }{" "}
                        (
                        {
                          usersResponse?.find(
                            (user) => user.id === contract.userId
                          )?.email
                        }
                        )
                      </Table.Cell>
                      <Table.Cell>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Button
                            auto
                            size="sm"
                            color={"warning"}
                            flat
                            onClick={() => {
                              setUpdating(true);
                              setUpdatingId(contract.id);
                              setContractType(contract.contractType);
                              setStartDate(
                                new Date(contract.startDate)
                                  .toISOString()
                                  .split("T")[0]
                              );
                              setEndDate(
                                contract.endDate
                                  ? new Date(contract.endDate)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              );
                              setUserId(contract.userId);
                            }}
                          >
                            Modifier
                          </Button>
                          <Spacer x={1} />
                          <Button
                            auto
                            size="sm"
                            flat
                            color={"error"}
                            onClick={() =>
                              deleteContractMutation.mutate(contract.id)
                            }
                          >
                            Supprimer
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )) ?? (
                    <Table.Row>
                      <Table.Cell>—</Table.Cell>
                      <Table.Cell>—</Table.Cell>
                      <Table.Cell>—</Table.Cell>
                      <Table.Cell>—</Table.Cell>
                      <Table.Cell>—</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
                <Table.Pagination
                  noMargin
                  align="center"
                  rowsPerPage={11}
                  onPageChange={(page) => console.log({ page })}
                />
              </Table>
            </div>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card
            variant="flat"
            css={{
              backgroundColor: "#fcfcfc",
              padding: "1rem",
            }}
          >
            <Card.Header>
              <Text h3>
                {updating ? "Mettre à jour" : "Ajouter"} un contrat
              </Text>
            </Card.Header>

            <Card.Body>
              {/** FORM CREATE/UPDATE */}
              <Text>Type du contract</Text>
              <Select
                defaultValue="-1"
                style={{ width: "100%" }}
                // @ts-ignore
                onChange={(value) => setContractType(value)}
                value={contractType}
                showSearch
                disabled={updating}
                size="large"
                options={Object.keys(ContractType).map((key) => ({
                  label: key,
                  value: key,
                }))}
              />

              <Spacer y={1} />
              <Input
                size="lg"
                label="Date de début du contract"
                placeholder="Date début"
                disabled={updating}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
              />
              <Spacer y={1} />
              <Input
                size="lg"
                placeholder="Date fin"
                label="Date de fin du contract"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
              />
              <Spacer y={1} />
              <Text>Utilisateur du contract</Text>
              <Select
                defaultValue="-1"
                style={{ width: "100%" }}
                // @ts-ignore
                onChange={(value) => setUserId(+value)}
                value={`${userId}`}
                showSearch
                size="large"
                disabled={updating}
                options={
                  usersResponse
                    ? [
                        // @ts-ignore
                        ...usersResponse?.map((user) => ({
                          value: `${user.id}`,
                          label: `${user.firstname} ${user.lastname} (${user.email})`,
                        })),
                        { value: "-1", label: "Aucun" },
                      ]
                    : []
                }
              />
            </Card.Body>
            <Card.Footer>
              <Button
                auto
                size="lg"
                onPress={() =>
                  updating ? handleUpdateResource() : handleCreateResource()
                }
              >
                {updating ? "Modifier" : "Ajouter"} une contrat
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
