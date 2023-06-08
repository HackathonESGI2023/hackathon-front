"use client";
import { Grid } from "@nextui-org/react";
import Header from "../components/Header/Header.component";
import KpiCardsSupport from "../components/KPI/KpiCardSupport.component";
import ProfileConsultantCard from "../components/ProfileConsultantCard/ProfileConsultantCard.component";

const DashboardSupportPage = () => {
  return (
    <div>
      <Header title="Salut Pouet," subTitle="Il fait beau chez Carbonne 🎺" />
      <Grid.Container gap={2} justify="center" css={{ height: "300px" }}>
        <Grid xs={5}>
          <KpiCardsSupport kpiValue={50} kpiMaxValue={200} />
        </Grid>
        <Grid xs={5}>
          <ProfileConsultantCard
            fullname="Jean Charles"
            isInMission={true}
            profilePicture="https://dreamuplight.com/wp-content/uploads/2017/11/photographe-portrait-lyonRE.jpg"
            seniorityTimeInYear={2}
            userContractType="CDI"
            pinedSkills={[
              {
                id: 1,
                name: "React",
                color: "#F5A623",
                category: "BACKEND",
                type: "HARD",
              },
              {
                id: 2,
                name: "React",
                color: "#F5A623",
                category: "BACKEND",
                type: "HARD",
              },
              {
                id: 3,
                name: "React",
                color: "#F5A623",
                category: "BACKEND",
                type: "HARD",
              },
            ]}
            progess={25}
            onCrud={true}
            slackId={123456789}
          />
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default DashboardSupportPage;
