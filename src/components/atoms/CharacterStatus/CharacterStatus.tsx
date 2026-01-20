import styles from './CharacterStatus.module.css';

interface Props {
    status: 'Dead' | 'Alive' | 'unknown';
}

export const CharacterStatus = ({ status }: Props) => {
  return (
    <div className={styles["character-status-container"]}>
        <div className={styles[`character-status-${status}`]}></div>
        <span>{status}</span>
    </div>
  )
}
