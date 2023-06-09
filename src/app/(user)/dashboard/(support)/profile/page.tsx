"use client";

import { Grid, Row } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Col, Input, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllUsers } from "src/app/api/Users/getAllUsers";
import ProfileConsultantCard from "../../components/ProfileConsultantCard/ProfileConsultantCard.component";

const Profile = () => {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery(["user"], getAllUsers, {
    onSuccess: (data) => {
      const filteredData = data.filter((user) =>
        user.roles.includes("CONSULTANT")
      );
      setUsers(filteredData);
    },
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === "") {
      // Réinitialiser le filtre lorsque la valeur est vide
      setUsers(data);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (search === "") {
      setUsers(data);
    }
    const filteredUsers = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(search.toLowerCase()) ||
        user.lastname.toLowerCase().includes(search.toLowerCase())
    );
    setUsers(filteredUsers);
  }, [data, search]);

  return (
    <>
      <h1>Profile</h1>
      <Row css={{ height: "100%" }}>
        <Col span={3} style={{ height: "85vh" }}>
          <Input
            size="small"
            placeholder="large size"
            onChange={handleSearchChange}
            prefix={
              <MagnifyingGlass size={32} color="#f14e09" weight="light" />
            }
          />
          <Select
            defaultValue="lucy"
            style={{ width: "100%" }}
            // onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Col>
        <Col style={{ overflowY: "auto", overflowX: "hidden" }}>
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
                  userContractType={user?.Contract.contractType}
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
