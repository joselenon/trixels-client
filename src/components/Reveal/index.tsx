import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const RevealContainer = styled.div<{ $width: string }>`
  position: relative;
  overflow: hidden;
  width: ${({ $width }) => `${$width}`};
`;

interface IRevealProps {
  children: JSX.Element;
  width?: 'fit-content' | '100%';
}

export default function Reveal({ children, width = 'fit-content' }: IRevealProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView]);

  return (
    <RevealContainer $width={width} ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </RevealContainer>
  );
}
