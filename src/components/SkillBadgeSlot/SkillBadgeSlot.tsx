'use client';

import { motion } from 'framer-motion';
import styles from './SkillBadgeSlot.module.scss';

type SkillBadgeSlotProps = {
  skill: any;
  onRemove: () => void;
};

const SkillBadgeSlot = ({ skill, onRemove }: SkillBadgeSlotProps) => {
  return (
    <motion.div
      className={styles.skillBadgeSlot}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    ></motion.div>
  );
};

export default SkillBadgeSlot;
