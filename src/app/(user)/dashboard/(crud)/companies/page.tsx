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
import { useEffect, useRef, useState } from "react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userAtom } from "@utils/recoilAtoms.utils";
import { getCompanies } from "src/app/api/Companies/getCompanies";
import { createCompany } from "src/app/api/Companies/createCompany";
import { toBase64 } from "@utils/files.utils";
import { set } from "zod";
import { updateCompany } from "src/app/api/Companies/updateCompany";
import { deleteCompany } from "src/app/api/Companies/deleteCompany";

export default function MissionsCrud() {
  const [user, setUser] = useRecoilState(userAtom);

  const { data: companies, refetch: refetchCompanies } = useQuery(
    "companies",
    getCompanies
  );

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [logo, setLogo] = useState<string>("");

  const pictureRef = useRef<HTMLInputElement>(null);

  const createCompanyMutation = useMutation(createCompany, {
    onSuccess: () => {
      toast.success("Entreprise créée avec succès");
      refetchCompanies();
    },
    onError: (error) => {
      toast.error("Erreur lors de la création de l'entreprise");
      console.error(error);
    },
  });
  const handleCreateResource = () => {
    createCompanyMutation.mutate({
      name,
      description,
      address,
      logo,
    });
  };

  const handleAddLogo = async (file: File) => {
    // Check if file is an image

    if (
      !file.type.includes("image") &&
      !["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    ) {
      toast.error("Votre logo n'est pas une image !");
    } else {
      setLogo(await toBase64(file));
      toast.success(`Votre logo  "${file.name}" est prêt a être envoyé`);
    }
  };

  const [updating, setUpdating] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<number>(-1);
  const updateCompanyMutation = useMutation(updateCompany, {
    onSuccess: () => {
      toast.success("Entreprise modifiée avec succès");
      refetchCompanies();
      handleResetUpdate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la modification de l'entreprise");
      console.error(error);
    },
  });

  const handleUpdateResource = () => {
    updateCompanyMutation.mutate({
      id: updatingId,
      company: {
        name,
        description,
        address,
        logo: !logo.includes("https") ? logo : undefined,
      },
    });
  };

  const handleResetUpdate = () => {
    setUpdating(false);
    setName("");
    setDescription("");
    setAddress("");
    setLogo("");
  };

  const handleRefetch = () => {};

  const deleteCompanyMutation = useMutation(deleteCompany, {
    onSuccess: () => {
      toast.success("Entreprise supprimée avec succès");
      refetchCompanies();
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression de l'entreprise");
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
                <Text h3>Liste des entreprises</Text>
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
                aria-label="Liste des entreprises"
                style={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Table.Header>
                  <Table.Column>Logo</Table.Column>
                  <Table.Column>Nom</Table.Column>
                  <Table.Column>Adresse</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body
                  css={{
                    height: "100%",
                    overflowY: "auto",
                  }}
                  onLoadMore={() => {}}
                >
                  {companies?.map((company) => (
                    <Table.Row key={company.id}>
                      <Table.Cell>
                        <Avatar size={"md"} src={company.logo} />
                      </Table.Cell>
                      <Table.Cell>{company.name}</Table.Cell>
                      <Table.Cell>{company.address}</Table.Cell>
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
                              setName(company.name);
                              setDescription(company.description ?? "");
                              setAddress(company.address ?? "");
                              setLogo(company.logo);
                              setUpdatingId(company.id);
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
                              deleteCompanyMutation.mutate(company.id)
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
                    </Table.Row>
                  )}
                </Table.Body>
                <Table.Pagination
                  shadow
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
                {updating ? "Mettre à jour" : "Ajouter"} une entreprise
              </Text>
            </Card.Header>

            <Card.Body>
              {/** FORM CREATE/UPDATE */}
              <Input
                label="Nom de l'entreprise"
                placeholder="Nom de l'entreprise"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Spacer y={1} />
              <Textarea
                label="Description de l'entreprise"
                placeholder="Description de l'entreprise"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Spacer y={1} />
              <Input
                label="Adresse de l'entreprise"
                placeholder="Adresse de l'entreprise"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Spacer y={1} />
              <input
                type="file"
                ref={pictureRef}
                style={{
                  display: "none",
                }}
                onChange={async (e) => {
                  if (e.target.files) {
                    handleAddLogo(e.target.files[0]);
                  }
                }}
              />
              <Button
                auto
                size="xl"
                onClick={() => {
                  pictureRef.current?.click();
                }}
              >
                Ajouter un logo
              </Button>
            </Card.Body>
            <Card.Footer>
              <Button
                auto
                size="lg"
                onPress={() =>
                  updating ? handleUpdateResource() : handleCreateResource()
                }
              >
                {updating ? "Modifier" : "Ajouter"} une entreprise
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
