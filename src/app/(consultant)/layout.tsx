"use client";

import NavbarTest from "@components/Navbar";
import styles from "./layout.module.scss";

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className={styles.layout}>
      <NavbarTest className={styles.navbar} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
