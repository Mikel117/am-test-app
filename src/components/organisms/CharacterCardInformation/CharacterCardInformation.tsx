'use client'
import { Character } from "@/characters";
import { Information } from "@/components/atoms/Information/Information";
import styles from "./CharacterCardInformation.module.css";
import { CharacterStatus } from "@/components/atoms/CharacterStatus/CharacterStatus";
import { Button } from "@/components/atoms/Button/Button";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectNextCharacter, selectPreviousCharacter } from "@/store/characters/characters.slice";
import { useRef, useState } from "react";

interface Props {
  character: Character | null;
}

export const CharacterCardInformation = ({ character }: Props) => {
  const dispatch = useAppDispatch();
  const filteredCharacters = useAppSelector((state) => state.characters.filteredCharacters);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePrevious = () => {
    if (!canGoPrevious()) return;
    dispatch(selectPreviousCharacter({ filteredCharacters }));
  };

  const handleNext = () => {
    if (!canGoNext()) return;
    dispatch(selectNextCharacter({ filteredCharacters }));
  };

  const canGoPrevious = () => {
    if (!character || filteredCharacters.length === 0) return false;
    const currentIndex = filteredCharacters.findIndex((c) => c.id === character.id);
    return currentIndex > 0;
  };

  const canGoNext = () => {
    if (!character || filteredCharacters.length === 0) return false;
    const currentIndex = filteredCharacters.findIndex((c) => c.id === character.id);
    return currentIndex !== -1 && currentIndex < filteredCharacters.length - 1;
  };

  // Detección de swipe para táctil
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swipe izquierda -> siguiente
      handleNext();
    }

    if (touchStartX.current - touchEndX.current < -75) {
      // Swipe derecha -> anterior
      handlePrevious();
    }
  };

  // Soporte para mouse (arrastrar)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (touchStartX.current - touchEndX.current > 75) {
      // Arrastrar izquierda -> siguiente
      handleNext();
    }

    if (touchStartX.current - touchEndX.current < -75) {
      // Arrastrar derecha -> anterior
      handlePrevious();
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.characterCardInformation}>
      {character && (
        <div className={styles['navigation-button']}>
          <Button 
            icon={<IoChevronBack />} 
            onClick={handlePrevious}
            disabled={!canGoPrevious()}
          />
        </div>
      )}
      {character && (
        <div
          className={styles["character-card-information-container"]}
          style={{
            backgroundImage: `url(${character?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
          role="img"
          aria-label={`Imagen de fondo del personaje ${character?.name}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles["character-information-status"]}>
            <CharacterStatus status={character?.status ?? "unknown"} />
          </div>
          <div className={styles["character-information"]}>
            <div>
              <Information
                title={character?.name ?? ""}
                description={`${character?.species ?? ""} ${character?.species ?? ""}`}
              />
            </div>
            {character && (
              <div className={styles["character-card-information-details"]}>
                <Information
                  title="Origin"
                  description={character.origin ?? "unknown"}
                />
                <Information
                  title="Location"
                  description={character.location ?? "unknown"}
                />
                <Information
                  title="Gender"
                  description={character.gender ?? "unknown"}
                />
                <Information
                  title="Episodes"
                  description={character.episodes.toString() ?? "0"}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {character && (
        <div className={styles['navigation-button']}>
          <Button 
            icon={<IoChevronForward />} 
            onClick={handleNext}
            disabled={!canGoNext()}
          />
        </div>
      )}
    </div>
  );
};
