"use client";
import * as React from "react";
import styles from "./header.module.scss";

interface TemplateProps {
  title: string;
  subTitle: string;
}

const Header: React.FunctionComponent<TemplateProps> = ({
  title,
  subTitle,
}) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subTitle}</p>
    </div>
  );
};

export default Header;
