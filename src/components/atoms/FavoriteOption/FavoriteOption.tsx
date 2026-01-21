import { IoTrash } from "react-icons/io5";
import styles from './FavoriteOption.module.css';

interface Props {
    name: string;
    id: number;
    onClick?: () => void;
    onDelete?: () => void;
}

export const FavoriteOption = ({ name, id, onClick, onDelete }: Props) => {
  return (
    <li className={styles["favorite-option-container"]} onClick={onClick}>
        {name}
        <IoTrash onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }} />
    </li>
  );
};
