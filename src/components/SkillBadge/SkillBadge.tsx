"use client";

import { textColor } from "@utils/utils";
import { motion } from "framer-motion";
import { useDrag, useDrop } from "react-dnd";
import styles from "./SkillBadge.module.scss";

type SkillBadgeProps = {
  name: string;
  color: string;
  id: any;
  onDrop: (id: any, item: any) => void;
};

const SkillBadge = ({ name, color, id, onDrop }: SkillBadgeProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "skillBadge",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "skillBadge",
    drop: (item) => onDrop(id, item),
  }));

  const element = (
    <motion.div
      ref={(node) => drag(drop(node))}
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

  return isDragging ? null : element;
};

export default SkillBadge;
