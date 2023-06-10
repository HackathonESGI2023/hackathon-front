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
  Modal,
  Checkbox,
} from "@nextui-org/react";
import { useMutation, useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userAtom } from "@utils/recoilAtoms.utils";
import { toBase64 } from "@utils/files.utils";
import {
  StuffedWorkshop,
  getWorkshops,
} from "src/app/api/Workshops/getWorkshops";
import { createWorkshop } from "src/app/api/Workshops/createWorkshop";
import { updateWorkshop } from "src/app/api/Workshops/updateWorkshop";
import { deleteWorkshop } from "src/app/api/Workshops/deleteWorkshop";
import { Workshop } from "@prisma/client";
import { getAllUsers } from "src/app/api/Users/getAllUsers";
import { UserResponse } from "src/app/api/Users/getUsers";
import { upsertWorkshopUser } from "src/app/api/Workshops/upsertWorkshopUser";

export default function MissionsCrud() {
  const [user, setUser] = useRecoilState(userAtom);

  const { data: workshops, refetch: refetchWorkshops } = useQuery(
    "workshops",
    getWorkshops
  );

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [pdf, setPdf] = useState<string>("");

  const pdfRef = useRef<HTMLInputElement>(null);

  const createWorkshopMutation = useMutation(createWorkshop, {
    onSuccess: () => {
      toast.success("Workshop créé avec succès");
      handleRefetch();
      handleResetUpdate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la création du workshop");
      console.error(error);
    },
  });
  const handleCreateResource = () => {
    createWorkshopMutation.mutate({
      title,
      description,
      pdfLink: pdf,
      userId: user?.id ?? -1,
    });
  };

  const handleAddPDF = async (file: File) => {
    // Check if file is a pdf
    if (file.type !== "application/pdf") {
      toast.error("Le fichier doit être un pdf");
      return;
    }
    setPdf(await toBase64(file));
    toast.success(`Le fichier "${file.name}" est prêt a être envoyé`);
  };

  const [updating, setUpdating] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<number>(-1);
  const updateCompanyMutation = useMutation(updateWorkshop, {
    onSuccess: () => {
      toast.success("Workshop modifiée avec succès");
      handleRefetch();
      handleResetUpdate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la modification du workshop");
      console.error(error);
    },
  });

  const handleUpdateResource = () => {
    updateCompanyMutation.mutate({
      id: updatingId,
      workshop: {
        title,
        description,
        pdfLink: pdf,
      },
    });
  };

  const handleResetUpdate = () => {
    setUpdating(false);
    setTitle("");
    setDescription("");
    setPdf("");
  };

  const handleRefetch = () => {
    refetchWorkshops();
    refetchUsersResponse();
  };

  const deleteWorkshopMutation = useMutation(deleteWorkshop, {
    onSuccess: () => {
      toast.success("Workshop supprimé avec succès");
      handleRefetch();
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression du workshop");
      console.error(error);
    },
  });

  const openPdfInNewTab = (base64String: string) => {
    if (base64String === "") {
      return;
    }
    console.log(base64String);

    const encodedPdf = base64String.replace(
      /^data:application\/pdf;base64,/,
      ""
    );
    const decodedPdf = window.atob(encodedPdf);
    const byteNumbers = new Array(decodedPdf.length);
    for (let i = 0; i < decodedPdf.length; i++) {
      byteNumbers[i] = decodedPdf.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  /**
   * MODAL
   */
  const [visible, setVisible] = useState(false);
  const [workshop, setWorkshop] = useState<StuffedWorkshop | null>(null);
  const { data: usersResponse, refetch: refetchUsersResponse } = useQuery(
    "participants",
    getAllUsers
  );
  const [participants, setParticipants] = useState<UserResponse[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (usersResponse) {
      const filteredUsers =
        usersResponse?.filter(
          (user) =>
            user.roles?.some((role) => role === "CONSULTANT") &&
            (user.firstname.toLowerCase().includes(search.toLowerCase()) ||
              user.lastname.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase()))
        ) ?? [];
      setParticipants(filteredUsers);
    }
  }, [usersResponse, search]);

  const upsertWorkshopUsers = useMutation(upsertWorkshopUser, {
    onSuccess: () => {
      toast.success("Participants mis à jour avec succès");
      handleRefetch();
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour des participants");
      console.error(error);
    },
  });

  return (
    <div>
      <Modal
        scroll
        width="60vw"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={visible}
        onClose={() => {
          setWorkshop(null);
          setVisible(false);
        }}
        closeButton
      >
        <Modal.Body>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="John Doe"
            label="Rechercher un utilisateur"
          />
          <Table
            aria-label={`Participants au workshop "${workshop?.title}"`}
            style={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Table.Header>
              <Table.Column>Prénom</Table.Column>
              <Table.Column>Nom</Table.Column>
              <Table.Column>Adresse email</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {participants.map((participant) => (
                <Table.Row key={participant.id}>
                  <Table.Cell>{participant.firstname}</Table.Cell>
                  <Table.Cell>{participant.lastname}</Table.Cell>
                  <Table.Cell>{participant.email}</Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      defaultSelected={workshop?.Participants.some(
                        (p) => p.id === participant.id
                      )}
                      onChange={(checked) => {
                        upsertWorkshopUsers.mutate({
                          id: workshop?.id ?? -1,
                          params: {
                            userId: participant.id,
                            isParticipating: checked,
                          },
                        });
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align="center"
              rowsPerPage={11}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
          <Spacer y={0.5} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => {
              setWorkshop(null);
              setVisible(false);
            }}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
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
                <Text h3>Liste des Workshops</Text>
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
                aria-label="Liste des Workshops"
                style={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Table.Header>
                  <Table.Column>Titre de la formation</Table.Column>
                  <Table.Column>PDF de la formation</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body
                  css={{
                    height: "100%",
                    overflowY: "auto",
                  }}
                  onLoadMore={() => {}}
                >
                  {workshops?.map((w) => (
                    <Table.Row key={w.id}>
                      <Table.Cell>{w.title}</Table.Cell>
                      <Table.Cell>
                        <Button
                          flat
                          onPress={() => openPdfInNewTab(w.pdfLink ?? "")}
                          auto
                        >
                          Voir le PDF
                        </Button>
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
                            flat
                            color={"success"}
                            onPress={() => {
                              setWorkshop(w);
                              setVisible(true);
                              console.log(w);
                            }}
                            size={"sm"}
                          >
                            Assigner la formation
                          </Button>
                          <Spacer x={1} />

                          <Button
                            auto
                            size="sm"
                            color={"warning"}
                            flat
                            onPress={() => {
                              setUpdating(true);
                              setTitle(w.title);
                              setDescription(w.description ?? "");
                              setPdf(w.pdfLink ?? "");
                              setUpdatingId(w.id);
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
                            onPress={() => deleteWorkshopMutation.mutate(w.id)}
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
                {updating ? "Mettre à jour" : "Ajouter"} un workshop
              </Text>
            </Card.Header>

            <Card.Body>
              {/** FORM CREATE/UPDATE */}
              <Input
                label="Nom du workshop"
                placeholder="Nom du workshop"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Spacer y={1} />
              <Textarea
                label="Description du workshop"
                placeholder="Description du workshop"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Spacer y={1} />
              <input
                type="file"
                ref={pdfRef}
                style={{
                  display: "none",
                }}
                onChange={async (e) => {
                  if (e.target.files) {
                    handleAddPDF(e.target.files[0]);
                  }
                }}
              />
              <Button
                auto
                size="xl"
                onPress={() => {
                  pdfRef.current?.click();
                }}
              >
                Ajouter un fichier PDF
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
                {updating ? "Modifier" : "Ajouter"} un workshop
              </Button>
              {updating && (
                <>
                  <Spacer x={1} />
                  <Button auto size="lg" onPress={() => handleResetUpdate()}>
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
