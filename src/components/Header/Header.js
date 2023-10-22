"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

function Header({ theme, className, ...delegated }) {
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button
          className={styles.action}
          onClick={() => {
            const nextTheme = currentTheme === "light" ? "dark" : "light";

            setCurrentTheme(nextTheme);
            Cookie.set("theme", nextTheme, { expires: 365 });

            const root = document.documentElement;
            const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
            Object.entries(colors).forEach(([key, value]) => {
              root.style.setProperty(key, value);
            });
          }}
        >
          {currentTheme === "light" ? (
            <Sun size="1.5rem" />
          ) : (
            <Moon size="1.5rem" />
          )}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
