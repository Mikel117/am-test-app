import { IoHeart, IoHeartOutline } from "react-icons/io5";
import styles from "./LikeCharacter.module.css";

interface Props {
    isFavorite: boolean;
    onClick?: () => void;
}

export const LikeCharacter = ({ isFavorite, onClick }: Props) => {
  return (
    <div className={styles['favorite-character']}>
        {
            isFavorite ? <IoHeart size={20} color='red' onClick={onClick} /> : <IoHeartOutline size={20} onClick={onClick} />
        }
        <span>Like</span>
    </div>
  )
}
