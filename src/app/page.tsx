"use client";

import homeAnimation from "@assets/animations/hr.json";
import NavbarTest from "@components/Navbar";
import { Button, Text } from "@nextui-org/react";
import colors from "@styles/_colors.module.scss";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import FeatureLabel from "./components/FeatureLabel/FeatureLabel";
import styles from "./page.module.scss";
import { useRecoilState } from "recoil";
import { tokenAtom } from "src/utils/recoilAtoms.utils";

export default function Home() {
  const router = useRouter();
  const [token] = useRecoilState(tokenAtom);
  return (
    <>
      <NavbarTest />
      <main className={styles.main}>
        <div className={styles.lottieBox}>
          <Lottie animationData={homeAnimation} className={styles.lottie} />
          <div className={styles.content}>
            <Text h1 size={"$7xl"}>
              Booster votre carrière !
            </Text>
            <div className={styles.featureContent}>
              <FeatureLabel
                label="Faites évoluer votre carrière"
                className={styles.featureLabel}
              />
              <FeatureLabel
                label="Gérer votre profil et vos missions"
                className={styles.featureLabel}
              />
              <FeatureLabel
                label="Faites vivre la communauté CarbonIt"
                className={styles.featureLabel}
              />

              <Button
                size={"lg"}
                className={styles.cta}
                onClick={() =>
                  token ? router.push("/profile") : router.push("/login")
                }
              >
                <Text color={colors.white} size={"$md"}>
                  {"Accéder à votre espace"}
                </Text>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
