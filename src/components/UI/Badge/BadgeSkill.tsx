"use client";
import { Badge } from "@nextui-org/react";
import * as React from "react";
import { textColor } from "src/utils/utils";

interface BadgeProps {
  children: string;
  color: string;
}

export const BadgeSkill: React.FunctionComponent<BadgeProps> = ({
  children,
  color,
}) => {
  const badgeColor = color;
  const badgeTextColor = textColor(color);

  return (
    <Badge
      disableOutline
      css={{ background: badgeColor, color: badgeTextColor }}
    >
      {children}
    </Badge>
  );
};
