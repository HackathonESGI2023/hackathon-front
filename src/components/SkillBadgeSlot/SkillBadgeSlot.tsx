'use client';

import { motion } from 'framer-motion';
import { useDrop } from 'react-dnd';

import styles from './SkillBadgeSlot.module.scss';

type SkillBadgeSlotProps = {
  onDrop: (id: any, item: any) => void;
  id: any;
};

const SkillBadgeSlot = ({ onDrop, id }: SkillBadgeSlotProps) => {
  const [collected, drop] = useDrop(() => ({
    accept: 'skillBadge',
    drop: (item) => onDrop(id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <motion.div
      ref={drop}
      className={styles.skillBadgeSlot}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        backgroundColor: collected.isOver ? 'lightblue' : 'transparent',
      }}
    ></motion.div>
  );
};

export default SkillBadgeSlot;
