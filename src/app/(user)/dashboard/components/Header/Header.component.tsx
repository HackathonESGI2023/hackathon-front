"use client";
import { Text } from "@nextui-org/react";
import * as React from "react";

interface TemplateProps {
  title: string;
  subTitle: string;
}

const Header: React.FunctionComponent<TemplateProps> = ({
  title,
  subTitle,
}) => {
  return (
    <>
      <Text css={{ letterSpacing: "0.5px" }} weight="semibold" h1>
        {title}
      </Text>
      <Text weight="normal" css={{ color: "#767676" }} h3>
        {subTitle}
      </Text>
    </>
  );
};

export default Header;
