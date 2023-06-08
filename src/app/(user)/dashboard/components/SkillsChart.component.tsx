"use client";
import { Card } from "@nextui-org/react";
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import * as React from "react";
import { Radar } from "react-chartjs-2";
import { UserResponse } from "../../../api/Users/getUsers";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillsChartProps {
  skills: UserResponse["UserSkill"];
}

export const SkillsChart: React.FunctionComponent<SkillsChartProps> = ({
  skills,
}) => {
  const uniqueSkillCategories = skills
    .map((skill) => skill.skill.category)
    .filter((value, index, self) => self.indexOf(value) === index);

  // Count the number of skills in each category
  const skillCategoriesCount = uniqueSkillCategories.map((category) => {
    return skills.filter((skill) => skill.skill.category === category).length;
  });

  React.useEffect(() => {
    console.log(uniqueSkillCategories, skillCategoriesCount);
  }, [skillCategoriesCount]);

  return (
    <Card
      variant="flat"
      css={{
        backgroundColor: "#f8f8f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Radar
        data={{
          labels: uniqueSkillCategories,
          datasets: [
            {
              label: "# de compétences dans la catégorie",
              data: skillCategoriesCount,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          showLine: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
            decimation: {
              enabled: false,
            },
          },
        }}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </Card>
  );
};
