"use client";

import jobInterview from "@assets/animations/job-interview.json";
import NavbarTest from "@components/Navbar";
import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Spacer,
  Text,
  Textarea,
} from "@nextui-org/react";
import { FilePdf } from "@phosphor-icons/react";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { createApplication } from "../api/Applications/createApplication";
import { toBase64 } from "@utils/files.utils";
import { useRecoilState } from "recoil";
import { tokenAtom } from "@utils/recoilAtoms.utils";
import { useRouter } from "next/navigation";

export default function Postuler() {
  const [token, setToken] = useRecoilState(tokenAtom);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [sponsor, setSponsor] = useState<string>("");

  const cvInputRef = useRef<HTMLInputElement>(null);
  const [cv, setCv] = useState<string>("");
  const handleAddCv = async (file: File) => {
    // Check if file is a pdf
    if (file.type !== "application/pdf") {
      toast.error("Votre CV n'est pas un PDF !");
    } else {
      setCv(await toBase64(file));
      toast.success(`Votre CV "${file.name}" est prêt a être envoyé`);
    }
  };

  const lmInputRef = useRef<HTMLInputElement>(null);
  const [lm, setLm] = useState<string>("");

  const handleAddLm = async (file: File) => {
    // Check if file is a pdf
    if (file.type !== "application/pdf") {
      toast.error("Votre lettre de motivation n'est pas un PDF !");
    } else {
      setLm(await toBase64(file));
      toast.success(
        `Votre lettre de motivation "${file.name}" est prête a être envoyé`
      );
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  const createApplicationMutation = useMutation(createApplication, {
    onSuccess: (data) => {
      toast.success(
        "Votre condidature a bien été envoyée ! Nous reviendrons vers vous très bientôt !"
      );
      setName("");
      setEmail("");
      setAbout("");
      setCv("");
      setLm("");
    },
    onError: (error) => {
      toast.error(
        "Une erreur est survenue lors de l'envoi de votre condidature, veuillez réessayer plus tard."
      );
    },
  });

  const handleSubmit = async () => {
    if (name === "" || about === "" || cv === "" || lm === "") {
      toast.error("Veuillez remplir tous les champs");
    } else {
      const data = {
        name,
        about,
        cv,
        lm,
        proposing: sponsor,
      };
      createApplicationMutation.mutate({
        name,
        email,
        text: about,
        cv,
        coverLetter: lm,
        sponsor: sponsor,
      });
    }
  };

  return (
    <>
      <NavbarTest />
      <Container
        display="flex"
        justify="center"
        alignItems="center"
        css={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Grid.Container
          gap={5}
          css={{
            width: "100vw",
          }}
        >
          <Grid xs={12} md={6} direction="column">
            <Text h1 size={"$6xl"}>
              Rejoignez Carbon !
            </Text>
            <Card css={{ px: "2rem" }}>
              <Card.Body>
                <Text h3 css={{ pt: 8 }}>
                  Dites nous en plus à propos de vous
                </Text>
                <Spacer y={1} />
                <Input
                  placeholder="John Doe"
                  fullWidth
                  size="xl"
                  label="Quel est votre nom ?"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Spacer y={1} />
                <Input
                  placeholder="jdoe@gmail.com"
                  fullWidth
                  size="xl"
                  label="Quel est votre adresse mail ?"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Spacer y={1} />
                <Textarea
                  label="Parlez nous de vous"
                  placeholder="Je suis un développeur fullstack passionné par le développement web et mobile. J'ai travaillé sur plusieurs projets en freelance et j'ai également travaillé en tant que développeur fullstack chez..."
                  fullWidth
                  size="xl"
                  rows={5}
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                />
                <Spacer y={1} />
                <Container display="flex" direction="row">
                  <Button
                    color={"primary"}
                    size={"lg"}
                    icon={<FilePdf size={32} />}
                    auto
                    onPress={() => cvInputRef.current?.click()}
                  >
                    Mon CV
                  </Button>
                  <input
                    type="file"
                    ref={cvInputRef}
                    style={{
                      display: "none",
                    }}
                    onChange={(e) => {
                      if (e.target.files) {
                        handleAddCv(e.target.files[0]);
                      }
                    }}
                  />
                  <Spacer x={1} />
                  <Button
                    auto
                    color={"primary"}
                    size={"lg"}
                    icon={<FilePdf size={32} />}
                    onPress={() => lmInputRef.current?.click()}
                  >
                    Lettre de motivation
                  </Button>
                  <input
                    type="file"
                    ref={lmInputRef}
                    style={{
                      display: "none",
                    }}
                    onChange={(e) => {
                      if (e.target.files) {
                        handleAddLm(e.target.files[0]);
                      }
                    }}
                  />
                </Container>
                <Spacer y={2} />
                <Input
                  placeholder="jeane.doe@carbon.fr"
                  fullWidth
                  size="xl"
                  value={sponsor}
                  label="Avez-vous un parrain ? Renseignez son adresse mail pour bénéficier de la cooptation"
                  onChange={(e) => {
                    setSponsor(e.target.value);
                  }}
                />
              </Card.Body>
              <Card.Footer>
                <Button
                  auto
                  color={"primary"}
                  size={"lg"}
                  onPress={handleSubmit}
                >
                  Envoyer ma candidature
                </Button>
              </Card.Footer>
            </Card>
          </Grid>
          <Grid xs={0} md={6} alignContent="center">
            <Lottie animationData={jobInterview} />
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
}
