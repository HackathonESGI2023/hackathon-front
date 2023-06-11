"use client";
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
        content={"Du café depuis plus de 3 ans !"}
        rounded
        color="primary"
        placement="rightStart"
      >
        <Coffee size={32} color=" #462e01" weight="fill" />
      </Tooltip>
    );
  } else if (seniorityTime >= 2) {
    return (
      <Tooltip
        content={"Cookie monster depuis 2 ans !"}
        rounded
        color="primary"
        placement="rightStart"
      >
        <Cookie size={32} weight="fill" color="#5a3a22 " />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip
        content={"Rookie"}
        rounded
        color="primary"
        placement="rightStart"
      >
        <OrangeSlice size={32} color="#FFA500" weight="fill" />
      </Tooltip>
    );
  }
};
