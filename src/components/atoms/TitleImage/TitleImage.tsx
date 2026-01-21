import Image from "next/image"
import styles from "./TitleImage.module.css";

interface Props {
    width?: number;
    height?: number;
}

export const TitleImage = ({ width = 332, height = 95 }: Props) => {
  return (
    <div className={styles.titleImageContainer}>
        <Image
            src="/images/rick-and-morty-title.jpg"
            alt="Logo de Rick and Morty - Título principal de la serie"
            width={width}
            height={height}
            priority
        />
    </div>
  )
}
