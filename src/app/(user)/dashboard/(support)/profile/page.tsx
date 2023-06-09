"use client";

import { Grid, Row } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Col, Input, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllUsers } from "src/app/api/Users/getAllUsers";
import ProfileConsultantCard from "../../components/ProfileConsultantCard/ProfileConsultantCard.component";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [searchByNames, setSearchByNames] = useState("");
  const [selectedContractType, setSelectedContractType] = useState([]);

  const { data } = useQuery(["user"], getAllUsers, {
    onSuccess: (data) => {
      const filteredData = data.filter((user) =>
        user.roles.includes("CONSULTANT")
      );
      setUsers(filteredData);
      console.log(filteredData);
    },
  });

  const contractsTypeOptions = [
    { value: "CDI", label: "CDI" },
    { value: "CDD", label: "CDD" },
    { value: "ALTERNANT", label: "ALTERNANT" },
    { value: "STAGIAIRE", label: "STAGIAIRE" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      (user.firstname.toLowerCase().includes(searchByNames.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchByNames.toLowerCase())) &&
      (selectedContractType.length === 0 ||
        user?.Contract.some((contract) =>
          selectedContractType.includes(contract.contractType)
        ))
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

  return (
    <>
      <h1>Profile</h1>
      <Row css={{ height: "100%" }}>
        <Col span={3} style={{ height: "85vh" }}>
          <Input
            size="small"
            placeholder="Chercher par nom"
            onChange={handleSearchChangeByNames}
            prefix={
              <MagnifyingGlass size={32} color="#f14e09" weight="light" />
            }
          />
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Type de contrat"
            onChange={handleChange}
            options={contractsTypeOptions}
          />
        </Col>
        <Col style={{ overflowY: "auto", overflowX: "hidden", width: "100%" }}>
          <Grid.Container gap={2}>
            {filteredUsers.map((user) => (
              <Grid
                key={user.id}
                xs={6}
                md={4}
                css={{
                  height: "18rem",
                }}
              >
                <ProfileConsultantCard
                  fullname={user.firstname + " " + user.lastname}
                  profilePicture={user.profile_picture}
                  isInMission={user.Mission.length > 0}
                  userContractType={user.Contract[0].contractType}
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
