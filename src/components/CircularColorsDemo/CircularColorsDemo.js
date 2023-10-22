"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { MotionConfig, motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [paused, setPaused] = React.useState(true);
  const id = React.useId();

  React.useEffect(() => {
    if (paused) {
      return;
    }

    const interval = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layout="position"
                    layoutId={id}
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={() => setPaused(!paused)}>
              {paused ? <Play /> : <Pause />}
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
            <button
              onClick={() => {
                setTimeElapsed(0);
                setPaused(true);
              }}
            >
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
