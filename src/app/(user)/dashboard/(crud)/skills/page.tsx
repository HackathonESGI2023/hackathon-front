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
import { SkillCategory, SkillType } from "@prisma/client";
import { Select } from "antd";
import { createSkill } from "src/app/api/Skills/createSkill";
import { getSkills } from "src/app/api/Skills/getSkills";
import { deleteSkill } from "src/app/api/Skills/deleteSkill";
import { updateSkill } from "src/app/api/Skills/updateSkill";

export default function MissionsCrud() {
  const [user, setUser] = useRecoilState(userAtom);

  const { data: skills, refetch: refetchSkills } = useQuery(
    "skills",
    getSkills
  );

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [color, setColor] = useState<string>("#000");
  const [skillType, setSkillType] = useState<SkillType>(SkillType.SOFT);
  const [skillCategory, setSkillCategory] = useState<SkillCategory>(
    SkillCategory.OTHER
  );

  const createSkillMutation = useMutation(createSkill, {
    onSuccess: () => {
      toast.success("Compétence créée avec succès");
      refetchSkills();
      handleResetUpdate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la création de la compétence");
      console.error(error);
    },
  });
  const handleCreateResource = () => {
    createSkillMutation.mutate({
      name,
      description,
      color,
      type: skillType,
      category: skillCategory,
    });
  };
  const [updating, setUpdating] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<number>(-1);

  const updateSkillMutation = useMutation(updateSkill, {
    onSuccess: () => {
      toast.success("Compétence mise à jour avec succès");
      refetchSkills();
      handleResetUpdate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour de la compétence");
      console.error(error);
    },
  });

  const handleUpdateResource = () => {
    updateSkillMutation.mutate({
      id: updatingId,
      skill: {
        name,
        description,
        color,
        type: skillType,
        category: skillCategory,
      },
    });
  };

  const handleResetUpdate = () => {
    setUpdating(false);
    setName("");
    setDescription("");
    setColor("");
    setSkillType(SkillType.SOFT);
    setSkillCategory(SkillCategory.OTHER);
  };

  const handleRefetch = () => {};

  const deleteCompanyMutation = useMutation(deleteSkill, {
    onSuccess: () => {
      toast.success("Compétence supprimée avec succès");
      refetchSkills();
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression de la compétences");
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
                <Text h3>Liste des compétences</Text>
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
                aria-label="Liste des compétences"
                style={{
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <Table.Header>
                  <Table.Column>Couleur</Table.Column>
                  <Table.Column>Nom</Table.Column>
                  <Table.Column>Type</Table.Column>
                  <Table.Column>Catégorie</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body
                  css={{
                    height: "100%",
                    overflowY: "auto",
                  }}
                  onLoadMore={() => {}}
                >
                  {skills?.map((skill) => (
                    <Table.Row key={skill.id}>
                      <Table.Cell>
                        <div
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            backgroundColor: skill.color ?? "#000",
                            borderRadius: "50%",
                          }}
                        ></div>
                      </Table.Cell>
                      <Table.Cell>{skill.name}</Table.Cell>
                      <Table.Cell>{skill.type}</Table.Cell>
                      <Table.Cell>{skill.category}</Table.Cell>
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
                              setUpdatingId(skill.id);
                              setName(skill.name);
                              setDescription(skill.description ?? "");
                              setColor(skill.color ?? "#000");
                              setSkillType(skill.type);
                              setSkillCategory(skill.category);
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
                              deleteCompanyMutation.mutate(skill.id)
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
                {updating ? "Mettre à jour" : "Ajouter"} une compétences
              </Text>
            </Card.Header>

            <Card.Body>
              {/** FORM CREATE/UPDATE */}
              <Input
                label="Nom de la compétence"
                placeholder="Nom de la compétence"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Spacer y={1} />
              <Textarea
                label="Description de la compétence"
                placeholder="Description de la compétence"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Spacer y={1} />
              <Input
                label="Couleur de la compétence"
                placeholder="Adresse de la compétence"
                value={color}
                type="color"
                onChange={(e) => setColor(e.target.value)}
              />
              <Spacer y={1} />
              <Select
                defaultValue="-1"
                style={{ width: "100%" }}
                // @ts-ignore
                onChange={(value) => setSkillType(value)}
                value={skillType}
                showSearch
                size="large"
                options={Object.keys(SkillType).map((key) => ({
                  label: key,
                  value: key,
                }))}
              />
              <Spacer y={1} />
              <Select
                defaultValue="-1"
                style={{ width: "100%" }}
                // @ts-ignore
                onChange={(value) => setSkillCategory(value)}
                value={skillCategory}
                showSearch
                size="large"
                options={Object.keys(SkillCategory).map((key) => ({
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
                  updating ? handleUpdateResource() : handleCreateResource()
                }
              >
                {updating ? "Modifier" : "Ajouter"} une compétence
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
