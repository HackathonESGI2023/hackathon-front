"use client";
import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import {
  Brain,
  Briefcase,
  CalendarPlus,
  Handshake,
  MagnifyingGlass,
  UserCirclePlus,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser/ModalCreateUser.component";

interface TemplateProps {}

const ShortcutDashboard: React.FunctionComponent<TemplateProps> = ({}) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const handleModal = () => setVisible(true);
  const closeHandler = () => setVisible(false);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Text h3>Raccourcies</Text>

      <Card
        variant="flat"
        css={{
          backgroundColor: "#fcfcfc",
          width: "100%",
          height: "100%",
          overflowX: "hidden",
        }}
      >
        <Card.Body>
          <Container
            css={{
              height: "100%",
            }}
            gap={0}
          >
            <Grid.Container
              gap={1}
              css={{
                marginBottom: "1rem",
                height: "100%",
                pb: 0,
              }}
              justify="space-between"
            >
              <Grid xs>
                <Button
                  size={"lg"}
                  icon={<MagnifyingGlass size={25} />}
                  color="success"
                  css={{
                    width: "100%",
                    backgroundColor: "#FBF8F0",
                    color: "#160B15",
                  }}
                  onClick={() => router.push("/dashboard/profile")}
                >
                  Profils
                </Button>
              </Grid>

              <Grid xs>
                <Button
                  size={"lg"}
                  icon={<UserCirclePlus size={25} />}
                  color="success"
                  css={{
                    width: "100%",
                    backgroundColor: "#F0FCF8",
                    color: "#2A2031",
                  }}
                  onPress={handleModal}
                >
                  Utilisateur
                </Button>
              </Grid>

              <Grid xs>
                <Button
                  size={"lg"}
                  icon={<Handshake size={22} />}
                  color="success"
                  css={{
                    width: "100%",
                    backgroundColor: "#FEF0FE",
                    color: "#160B15",
                  }}
                  onClick={() => router.push("/dashboard/contracts")}
                >
                  Contrats
                </Button>
              </Grid>

              <Grid xs>
                <Button
                  size={"lg"}
                  icon={<Briefcase size={22} />}
                  color="success"
                  css={{
                    width: "100%",
                    backgroundColor: "#F0FCF8",
                    color: "#2A2031",
                  }}
                  onClick={() => router.push("/dashboard/missions")}
                >
                  Missions
                </Button>
              </Grid>

              <Grid xs>
                <Button
                  size={"lg"}
                  icon={<Brain size={22} />}
                  color="success"
                  css={{
                    width: "100%",
                    backgroundColor: "#FAF8F0",
                    color: "#160B15",
                  }}
                  onClick={() => router.push("/dashboard/workshops")}
                >
                  Formations
                </Button>
              </Grid>

              <Grid xs>
                <Button
                  size={"lg"}
                  icon={<CalendarPlus size={22} />}
                  css={{
                    width: "100%",
                    backgroundColor: "#F5EFDF",
                    color: "#160B15",
                  }}
                  onClick={() => router.push("/dashboard/events")}
                >
                  Evenements
                </Button>
              </Grid>
            </Grid.Container>
          </Container>
        </Card.Body>
      </Card>
      <ModalCreateUser visible={visible} onClose={closeHandler} />
    </div>
  );
};

export default ShortcutDashboard;
