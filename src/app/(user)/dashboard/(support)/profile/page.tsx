"use client";

import { Grid, Row, Spacer } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Col, Input, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { getSkills } from "src/app/api/Skills/getSkills";
import { getAllUsers } from "src/app/api/Users/getAllUsers";
import ProfileConsultantCard from "../../components/ProfileConsultantCard/ProfileConsultantCard.component";

const Profile = () => {
  const [users, setUsers] = useState([]);

  const [skillsOptions, setSkillsOptions] = useState([]);

  const [searchByNames, setSearchByNames] = useState("");
  const [selectedContractType, setSelectedContractType] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInMission, setSelectedInMission] = useState([]);

  const { data } = useQuery(["user"], getAllUsers, {
    onSuccess: (data) => {
      const filteredData: any = data.filter((user) =>
        user.roles.includes("CONSULTANT")
      );
      setUsers(filteredData);
    },
  });

  const contractsTypeOptions = [
    { value: "CDI", label: "CDI" },
    { value: "CDD", label: "CDD" },
    { value: "ALTERNANT", label: "ALTERNANT" },
    { value: "STAGIAIRE", label: "STAGIAIRE" },
  ];

  const inMissionOptions = [
    { value: 0, label: "En intercontract" },
    { value: 1, label: "En mission" },
  ];

  const { data: skills } = useQuery(["skills"], getSkills, {
    onSuccess: (data: any) => {
      setSkillsOptions(data);
    },
  });

  const filterSKillsOptions = Array.isArray(skillsOptions)
    ? skillsOptions.map((skill: any) => ({
        value: skill.name,
        label: skill.name,
      }))
    : [];

  const filteredUsers = users.filter(
    (user: any) =>
      (user?.firstname.toLowerCase().includes(searchByNames.toLowerCase()) ||
        user?.lastname.toLowerCase().includes(searchByNames.toLowerCase())) &&
      (selectedContractType.length === 0 ||
        user?.Contract?.some((contract) =>
          selectedContractType.includes(contract.contractType)
        )) &&
      (selectedSkills.length === 0 ||
        user?.UserSkill?.some((skill) =>
          selectedSkills.includes(skill.skill.name)
        )) &&
      (selectedInMission.length === 0 ||
        // compter le nombre de missions en cours
        user?.Mission?.length > 0 === selectedInMission.includes(1)) &&
      user?.roles.includes("CONSULTANT")
  );

  const handleSearchChangeByNames = (e) => {
    const value = e.target.value;
    setSearchByNames(value);
    if (value === "") {
      setUsers(data);
    }
  };

  const handleChange = (value: []) => {
    setSelectedContractType(value);
  };

  const handleSkillsChange = (e) => {
    setSelectedSkills(e);
  };

  const handleMissionChange = (value: []) => {
    setSelectedInMission(value);
  };

  return (
    <>
      <h1>Profile</h1>
      <Row css={{ height: "100%" }}>
        <Col span={3}>
          <Input
            size="small"
            placeholder="Chercher par nom"
            onChange={handleSearchChangeByNames}
            prefix={
              <MagnifyingGlass size={32} color="#f14e09" weight="light" />
            }
            style={{ marginTop: "1rem" }}
          />
          <Spacer y={1} />
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="En mission?"
            onChange={handleMissionChange}
            options={inMissionOptions}
          />
          <Spacer y={1} />
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Type de contrat"
            onChange={handleChange}
            options={contractsTypeOptions}
          />
          <Spacer y={1} />
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Compétences"
            onChange={handleSkillsChange}
            options={filterSKillsOptions}
          />
        </Col>
        <Col
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Grid.Container gap={2}>
            {filteredUsers.map((user: any) => (
              <Grid
                key={user.id}
                xs={6}
                md={4}
                css={{
                  height: "18rem",
                }}
              >
                <ProfileConsultantCard
                  userP={user}
                  userId={user.id}
                  fullname={user.firstname + " " + user.lastname}
                  profilePicture={user.profile_picture}
                  isInMission={user.Mission.length > 0}
                  userContractType={user?.Contract[0]?.contractType}
                  pinedSkills={user.UserSkill.filter((skill) => skill.isStarred)
                    .map((skill) => skill.skill)
                    .slice(0, 3)}
                  seniorityTimeInYear={moment().diff(
                    moment(user.createdAt),
                    "years"
                  )}
                  slackId={user.slackId}
                  onCrud={true}
                />
              </Grid>
            ))}
          </Grid.Container>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
