import { Tooltip } from "@nextui-org/react";
import { Coffee, Cookie, OrangeSlice } from "@phosphor-icons/react";
import * as React from "react";

interface BadgeProps {
  seniorityTime: number;
}

export const BadgeSeniority: React.FunctionComponent<BadgeProps> = ({
  seniorityTime,
}) => {
  if (seniorityTime >= 3) {
    return (
      <Tooltip
        content={"Du café depuis plus de 3ans !"}
        rounded
        color="primary"
        placement="rightStart"
      >
        <Coffee size={32} color="#232a09" weight="fill" />
      </Tooltip>
    );
  } else if (seniorityTime >= 1) {
    return (
      <Tooltip content={"Cookie monster depuis 2ans !"} rounded color="primary">
        <Cookie size={32} weight="fill" />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip content={"Rookie"} rounded color="primary">
        <OrangeSlice size={32} weight="fill" />
      </Tooltip>
    );
  }
};
