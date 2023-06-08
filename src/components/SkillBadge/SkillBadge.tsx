"use client";

import { textColor } from "@utils/utils";
import { motion } from "framer-motion";
import { useDrag } from "react-dnd";
import styles from "./SkillBadge.module.scss";

type SkillBadgeProps = {
  name: string;
  color: string;
  id: any;
};

const SkillBadge = ({ name, color, id }: SkillBadgeProps) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "skillBadge",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return collected.isDragging ? null : (
    <motion.div
      ref={drag}
      className={styles.skillBadge}
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className={styles.label} style={{ color: textColor(color) }}>
        {name}
      </span>
    </motion.div>
  );
};

export default SkillBadge;
