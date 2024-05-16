import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingOutput = () => {
  return (
    <TypeAnimation
      sequence={[
        'have fun.',
        1000,
        'do homework.',
        1000,
        'do Leetcode.',
        1000,
        'meet people.',
        1000,
        'learn something new.',
        1000,
        'use Vim.',
        5000
      ]}
      wrapper="span"
      speed={40}
      style={{ display: 'inline-block', color: 'red' }}
      repeat={Infinity}
    />
  );
};

export default TypingOutput;