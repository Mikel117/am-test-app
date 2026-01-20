import styles from './Information.module.css';

interface Props {
    title: string;
    description: string;
}

export const Information = ({ title, description }: Props) => {
  return (
    <div className={styles['information-container']}>
      <h3>{title}</h3>
      <span>{description}</span>
    </div>
  )
}
