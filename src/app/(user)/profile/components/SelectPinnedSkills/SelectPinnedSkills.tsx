'use client';

import SkillBadge from '@components/SkillBadge/SkillBadge';
import SkillBadgeSlot from '@components/SkillBadgeSlot/SkillBadgeSlot';
import { Row } from '@nextui-org/react';
import { useState } from 'react';

type SelectPinnedSkillsProps = {};

const SelectPinnedSkills = ({}: SelectPinnedSkillsProps) => {
  const [slots, setSlots] = useState([null, null, null]);

  const [badges, setBadges] = useState([
    { id: 1, name: 'React', color: 'red', slot: null },
    { id: 2, name: 'TypeScript', color: 'green', slot: null },
    { id: 3, name: 'Next.js', color: 'blue', slot: null },
    { id: 4, name: 'Angular', color: 'white', slot: null },
    { id: 5, name: 'Vue.js', color: 'yellow', slot: null },
    { id: 6, name: 'Svelte', color: 'purple', slot: null },
  ]);

  const handleDrop = (slotId, item) => {
    setBadges((oldBadges) => {
      const newBadges = [...oldBadges];
      const badgeIndex = newBadges.findIndex((b) => b.id === item.id);

      const oldSlotBadgeIndex = newBadges.findIndex((b) => b.slot === slotId);
      if (oldSlotBadgeIndex !== -1) {
        newBadges[oldSlotBadgeIndex] = {
          ...newBadges[oldSlotBadgeIndex],
          slot: null,
        };
      }

      if (badgeIndex !== -1) {
        newBadges[badgeIndex] = { ...newBadges[badgeIndex], slot: slotId };
      }

      return newBadges;
    });
  };

  return (
    <>
      <Row align="center">
        {badges
          .filter((badge) => badge.slot === null)
          .map((badge) => (
            <SkillBadge
              key={badge.id}
              name={badge.name}
              color={badge.color}
              id={badge.id}
            />
          ))}
      </Row>
      <Row align="center">
        {slots.map((slotId, index) => (
          <>
            <SkillBadgeSlot key={index} onDrop={handleDrop} id={index} />
            {badges
              .filter((badge) => badge.slot === index)
              .map((badge) => (
                <SkillBadge
                  key={badge.id}
                  name={badge.name}
                  color={badge.color}
                  id={badge.id}
                />
              ))}
          </>
        ))}
      </Row>
    </>
  );
};

export default SelectPinnedSkills;
