import React from "react";
import styles from "./Button.module.css";

interface Props {
  icon?: React.ReactNode;
}

export const Button = ({ icon }: Props) => {
  return (
    <button className={styles["button-container"]}>
      {icon}
    </button>
  )
}
