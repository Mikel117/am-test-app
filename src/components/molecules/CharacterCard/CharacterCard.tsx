import Image from 'next/image';
import styles from './CharacterCard.module.css';
import { LikeCharacter } from '@/components/atoms/LikeCharacter/LikeCharacter';

interface Props {
    name: string;
    image: string;
    isFavorite: boolean;
    isSelected: boolean;
}

export const CharacterCard = ({ name, image, isFavorite, isSelected }: Props) => {
  return (
    <div className={`${styles['character-card-container']} ${isSelected ? styles['selected'] : ''}`}>
        <span>{name}</span>
        <Image src={image} alt={name} width={100} height={100} />
        <LikeCharacter isFavorite={isFavorite} />
    </div>
  )
}
