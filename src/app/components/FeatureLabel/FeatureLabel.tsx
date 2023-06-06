import { Row, Text } from '@nextui-org/react';
import Image from 'next/image';
import styles from './FeatureLabel.module.scss';

type FeatureLabelProps = {
  label: string;
  className?: string;
  imagePath?: string;
};

export default function FeatureLabel({
  label,
  className,
  imagePath,
}: FeatureLabelProps) {
  return (
    <Row align="center" className={className}>
      <Image
        className={styles.featureImage}
        src={imagePath ? imagePath : '/images/carbon-exagone-secondary.svg'}
        width={25}
        height={25}
        alt="CarbonIT"
      />
      <Text h2 size={'$3xl'} className={styles.featureText}>
        {label}
      </Text>
    </Row>
  );
}
