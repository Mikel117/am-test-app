import { IoPersonOutline, IoSearch } from 'react-icons/io5';
import styles from './Input.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Input = ({ value, onChange, placeholder = "Buscar personaje..." }: Props) => {
  return (
    <div className={styles['input-container']}>
        <IoSearch className={styles['input-icon-search']} size={20} />
        <input value={value} type="text" onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
        <IoPersonOutline className={styles['input-icon-person']} size={20} />
    </div>
  )
}
