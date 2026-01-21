import styles from './LoadingState.module.css';

interface Props {
  message?: string;
  type?: 'loading' | 'error' | 'info';
}

export const LoadingState = ({ message = 'Cargando...', type = 'loading' }: Props) => {
  return (
    <div className={styles['loading-state-container']}>
      <div className={`${styles['loading-state-message']} ${styles[type]}`}>
        {message}
      </div>
    </div>
  );
};
