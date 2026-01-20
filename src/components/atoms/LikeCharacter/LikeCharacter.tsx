import { IoHeart, IoHeartOutline } from "react-icons/io5";
import styles from "./LikeCharacter.module.css";

interface Props {
    isFavorite: boolean;
}

export const LikeCharacter = ({ isFavorite }: Props) => {
  return (
    <div className={styles['favorite-character']}>
        {
            isFavorite ? <IoHeart size={20} color='red' /> : <IoHeartOutline size={20} />
        }
        <span>Like</span>
    </div>
  )
}
