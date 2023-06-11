"use client";

import { motion } from "framer-motion";
import { useDrop } from "react-dnd";

import styles from "./SkillBadgeSlot.module.scss";

type SkillBadgeSlotProps = {
  onDrop: (id: any, item: any) => void;
  id: any;
  children: React.ReactNode;
};

const SkillBadgeSlot = ({ onDrop, id, children }: SkillBadgeSlotProps) => {
  const [, drop] = useDrop(() => ({
    accept: "skillBadge",
    drop: (item) => onDrop(id, item),
  }));

  return (
    <motion.div
      ref={drop}
      className={styles.skillBadgeSlot}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.div>
  );
};

export default SkillBadgeSlot;
