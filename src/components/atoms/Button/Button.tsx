import React from "react";
import styles from "./Button.module.css";

interface Props {
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ icon, onClick, disabled = false }: Props) => {
  return (
    <button 
      className={styles["button-container"]}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}
