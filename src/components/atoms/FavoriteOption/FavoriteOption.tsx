import { IoTrash } from "react-icons/io5";
import styles from './FavoriteOption.module.css';

interface Props {
    name: string;
    id: number;
}

export const FavoriteOption = ({ name, id }: Props) => {
  return (
    <li className={styles["favorite-option-container"]}>
        {name}
        <IoTrash />
    </li>
  );
};
