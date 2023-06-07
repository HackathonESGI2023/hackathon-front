import { Badge } from "@nextui-org/react";
import * as React from "react";

interface BadgeProps {
  inMission: boolean;
}

export const BadgeMission: React.FunctionComponent<BadgeProps> = ({
  inMission,
}) => {
  const badgeContent = inMission ? "En mission" : "Intercontrat";
  const badgeColor = inMission ? "success" : "warning";

  return (
    <Badge variant="flat" color={badgeColor}>
      {badgeContent}
    </Badge>
  );
};
