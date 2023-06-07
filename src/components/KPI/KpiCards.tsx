"use client";
import { Button, Card, Spacer, Text } from "@nextui-org/react";
import * as React from "react";
import styles from "./kpiCard.module.scss";

interface TemplateProps {
  kpiStats: string;
  kpiContent: string;
  kpiAddition?: number;
  kpiButtonText?: string;
  kpiButtonRoute?: string;
}

export const KpiCards: React.FunctionComponent<TemplateProps> = ({
  kpiStats,
  kpiContent,
  kpiAddition,
  kpiButtonText,
  kpiButtonRoute,
}) => {
  return (
    <Card variant="flat" css={{ padding: "2rem", height: "100%" }}>
      <div className={styles.main}>
        <Text
          size={40}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          {kpiStats}
        </Text>

        <Text size={16} css={{ color: "#687076" }}>
          {kpiContent}
        </Text>

        <Spacer y={1} />

        {kpiAddition ? (
          <Text
            h1
            size={40}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            {kpiAddition} %
          </Text>
        ) : null}

        {kpiButtonRoute && kpiButtonText ? (
          <div className={styles.buttonEndCard}>
            <Button color="primary" auto className={styles.buttonEndCard}>
              {kpiButtonText}
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
};
