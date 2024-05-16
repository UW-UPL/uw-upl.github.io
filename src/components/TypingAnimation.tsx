import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingOutput = () => {
  return (
    <TypeAnimation
      sequence={[
        'have fun.',
        1000,
        'work on homework.',
        1000,
        'grind Leetcode.',
        1000,
        'meet people.',
        1000,
        'learn something new.',
        1000,
        'create something amazing.',
        1000,
        'explore.',
        1000,
        'work on projects.',
        1000,
        'be.',
        3000
      ]}
      wrapper="span"
      speed={40}
      style={{ display: 'inline-block', color: 'red' }}
      repeat={Infinity}
    />
  );
};

export default TypingOutput;