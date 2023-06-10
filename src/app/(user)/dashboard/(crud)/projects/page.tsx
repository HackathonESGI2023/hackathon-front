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
import { createProject } from "src/app/api/Projects/createProject";
import { updateProject } from "src/app/api/Projects/updateProject";
import { getUsers } from "src/app/api/Users/getUsers";
import { Project } from "@prisma/client";

export default function MissionsCrud() {
  const [user, setUser] = useRecoilState(userAtom);

  const { data: userInfo, refetch: refetchUser } = useQuery("user", getUsers);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (userInfo) {
      const tempProjects: Project[] = [];
      setUser(userInfo);
      userInfo.Mission.forEach((mission) => {
        mission.Projects.forEach((project) => {
          tempProjects.push(project);
        });
      });
      setProjects(tempProjects);
    }
  }, [userInfo]);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [missionId, setMissionId] = useState<number>(-1);

  const pictureRef = useRef<HTMLInputElement>(null);

  const createCompanyMutation = useMutation(createProject, {
    onSuccess: () => {
      toast.success("Projet créée avec succès");
      handleRefetch();
    },
    onError: (error) => {
      toast.error("Erreur lors de la création du projet");
      console.error(error);
    },
  });
  const handleCreateResource = () => {
    createCompanyMutation.mutate({
      name,
      description,
      image,
      link,
      missionId,
    });
  };

  const handleAddLogo = async (file: File) => {
    // Check if file is an image

    if (
      !file.type.includes("image") &&
      !["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    ) {
      toast.error("Votre image n'est pas une image !");
    } else {
      setImage(await toBase64(file));
      toast.success(`Votre image  "${file.name}" est prêt a être envoyé`);
    }
  };

  const [updating, setUpdating] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<number>(-1);
  const updateCompanyMutation = useMutation(updateProject, {
    onSuccess: () => {
      toast.success("Projet modifiée avec succès");
      handleRefetch();
      handleResetUpdate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la modification du projet");
      console.error(error);
    },
  });

  const handleUpdateResource = () => {
    updateCompanyMutation.mutate({
      id: updatingId,
      project: {
        name,
        description,
        image: !image.includes("https") ? image : undefined,
        link,
        missionId,
      },
    });
  };

  const handleResetUpdate = () => {
    setUpdating(false);
    setName("");
    setDescription("");
    setImage("");
    setLink("");
    setMissionId(-1);
  };

  const handleRefetch = () => {
    refetchUser();
  };

  const deleteCompanyMutation = useMutation(deleteCompany, {
    onSuccess: () => {
      toast.success("Projet supprimée avec succès");
      handleRefetch();
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression du projet");
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
                <Text h3>Liste des Projets</Text>
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
                aria-label="Liste des Projets"
                style={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Table.Header>
                  <Table.Column>Nom</Table.Column>
                  <Table.Column>Lien</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body
                  css={{
                    height: "100%",
                    overflowY: "auto",
                  }}
                  onLoadMore={() => {}}
                >
                  {projects?.map((p) => (
                    <Table.Row key={p.id}>
                      <Table.Cell>{p.name}</Table.Cell>
                      <Table.Cell>
                        <a href={p.link ?? "#"}>{p.link}</a>
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
                              setName(p.name);
                              setDescription(p.description ?? "");
                              setImage(p.image ?? "");
                              setLink(p.link ?? "");
                              setMissionId(p.missionId ?? -1);
                              setUpdatingId(p.id);
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
                            onClick={() => deleteCompanyMutation.mutate(p.id)}
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
              <Text h3>{updating ? "Mettre à jour" : "Ajouter"} un projet</Text>
            </Card.Header>

            <Card.Body>
              {/** FORM CREATE/UPDATE */}
              <Input
                label="Nom du projet"
                placeholder="Nom du projet"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Spacer y={1} />
              <Textarea
                label="Description du projet"
                placeholder="Description du projet"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
              <Spacer y={1} />
              <Input
                label="Lien du projet"
                placeholder="Lien du projet"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                size="lg"
              />
              <Spacer y={1} />
              <Button
                auto
                size="xl"
                onClick={() => {
                  pictureRef.current?.click();
                }}
              >
                Ajouter une image
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
                {updating ? "Modifier" : "Ajouter"} un projet
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
