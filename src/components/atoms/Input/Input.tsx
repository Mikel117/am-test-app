import { IoPersonOutline, IoSearch } from 'react-icons/io5';
import styles from './Input.module.css';

export const Input = () => {
  return (
    <div className={styles['input-container']}>
        <IoSearch className={styles['input-icon-search']} size={20} />
        <input type="text" />
        <IoPersonOutline className={styles['input-icon-person']} size={20} />
    </div>
  )
}
