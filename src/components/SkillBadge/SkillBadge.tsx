'use client';

import { motion } from 'framer-motion';
import styles from './SkillBadge.module.scss';

type SkillBadgeProps = {
  name: string;
  color: string;
};

const SkillBadge = ({ name, color }: SkillBadgeProps) => {
  return (
    <motion.div
      className={styles.skillBadge}
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className={styles.label}>{name}</span>
    </motion.div>
  );
};

export default SkillBadge;
