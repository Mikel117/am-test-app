'use client';

import Image from 'next/image';
import styles from './CharacterCard.module.css';
import { LikeCharacter } from '@/components/atoms/LikeCharacter/LikeCharacter';
import { useAppDispatch } from '@/store';
import { toggleFavorite } from '@/store/characters/characters.slice';

interface Props {
    name: string;
    image: string;
    isFavorite: boolean;
    isSelected: boolean;
    id: number;
    onClick?: () => void;
}

export const CharacterCard = ({ name, image, isFavorite, isSelected, id, onClick }: Props) => {

  const dispatch = useAppDispatch();

  const handleSelectCharacter = () => {
    dispatch(toggleFavorite({ isFavorite: !isFavorite, id }));
  };

  return (
    <div className={`${styles['character-card-container']} ${isSelected ? styles['selected'] : ''}`}>
        <span>{name}</span>
        <Image src={image} alt={name} width={100} height={100} onClick={onClick} />
        <LikeCharacter onClick={handleSelectCharacter} isFavorite={isFavorite} />
    </div>
  )
}
