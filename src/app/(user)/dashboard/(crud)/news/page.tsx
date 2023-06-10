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
import { createNews } from "src/app/api/News/createNews";
import { updateNews } from "src/app/api/News/updateNews";
import { getNews } from "src/app/api/News/getNews";
import { getManyNews } from "src/app/api/News/getManyNews";
import { deleteNews } from "src/app/api/News/deleteNews";

export default function MissionsCrud() {
  const [user, setUser] = useRecoilState(userAtom);

  const { data: news, refetch: refetchNews } = useQuery("news", getManyNews);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const pictureRef = useRef<HTMLInputElement>(null);

  const createNewsMutation = useMutation(createNews, {
    onSuccess: () => {
      toast.success("Article créée avec succès");
      handleRefetch();
    },
    onError: (error) => {
      toast.error("Erreur lors de la création de l'article");
      console.error(error);
    },
  });
  const handleCreateResource = () => {
    createNewsMutation.mutate({
      title: name,
      description,
      image,
      userId: user?.id ?? -1,
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
      setImage(await toBase64(file));
      toast.success(`Votre logo  "${file.name}" est prêt a être envoyé`);
    }
  };

  const [updating, setUpdating] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<number>(-1);
  const updateNewMutation = useMutation(updateNews, {
    onSuccess: () => {
      toast.success("Article modifiée avec succès");
      handleRefetch();
      handleResetUpdate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la modification de l'article");
      console.error(error);
    },
  });

  const handleUpdateResource = () => {
    updateNewMutation.mutate({
      id: updatingId,
      news: {
        title: name,
        description,
        image: !image.includes("https") ? image : undefined,
      },
    });
  };

  const handleResetUpdate = () => {
    setUpdating(false);
    setName("");
    setDescription("");
    setImage("");
    setUpdatingId(-1);
  };

  const handleRefetch = () => {
    refetchNews();
  };

  const deleteNewsMutation = useMutation(deleteNews, {
    onSuccess: () => {
      toast.success("Article supprimée avec succès");
      handleRefetch();
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression de l'article");
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
                <Text h3>Liste des Articles</Text>
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
                aria-label="Liste des Articles"
                style={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Table.Header>
                  <Table.Column>Image</Table.Column>
                  <Table.Column>Title</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body
                  css={{
                    height: "100%",
                    overflowY: "auto",
                  }}
                  onLoadMore={() => {}}
                >
                  {news?.map((n) => (
                    <Table.Row key={n.id}>
                      <Table.Cell>
                        <Avatar size={"md"} src={n.image ?? ""} />
                      </Table.Cell>
                      <Table.Cell>{n.title}</Table.Cell>
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
                              setUpdatingId(n.id);
                              setName(n.title);
                              setDescription(n.description ?? "");
                              setImage(n.image ?? "");
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
                            onClick={() => deleteNewsMutation.mutate(n.id)}
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
              <Text h3>
                {updating ? "Mettre à jour" : "Ajouter"} une Article
              </Text>
            </Card.Header>

            <Card.Body>
              {/** FORM CREATE/UPDATE */}
              <Input
                label="Nom de l'article"
                placeholder="Nom de l'article"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Spacer y={1} />
              <Textarea
                label="Description de l'article"
                placeholder="Description de l'article"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                rows={10}
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
                {updating ? "Modifier" : "Ajouter"} une Article
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
