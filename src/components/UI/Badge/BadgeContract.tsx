"use client";
import { Badge } from "@nextui-org/react";
import { ContractTypeEnum } from "@schemas/contract.schema";
import * as React from "react";
import { contractTypeColor, textColor } from "src/utils/utils";

interface BadgeProps {
  contractType: ContractTypeEnum;
}

export const BadgeContract: React.FunctionComponent<BadgeProps> = ({
  contractType,
}) => {
  const badgeColor = contractTypeColor(contractType);
  const badgeTextColor = textColor(contractType);

  return (
    <Badge
      disableOutline
      css={{ background: badgeColor, color: badgeTextColor }}
    >
      {contractType}
    </Badge>
  );
};
