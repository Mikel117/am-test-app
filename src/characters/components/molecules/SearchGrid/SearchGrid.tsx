"use client";

import { Button, CharacterCard, FavoritesDropdown, Input } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { useState, useEffect, useRef } from "react";
import styles from "./SearchGrid.module.css";
import { Character } from "@/characters/interfaces/characters-reponse";
import { setSelected, setFilteredCharacters } from "@/store/characters/characters.slice";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export const SearchGrid = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.characters.items);
  const selectedCharacter = useAppSelector((state) => state.characters.characterSelected);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const previousSelectedId = useRef<number | null>(null);
  const isManualNavigation = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 4 : 2);
      setCurrentPage(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => setDirection(null), 500);
      return () => clearTimeout(timer);
    }
  }, [direction]);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(setFilteredCharacters({ characters: filteredCharacters }));
  }, [filteredCharacters, dispatch]);

  useEffect(() => {
    if (selectedCharacter && previousSelectedId.current !== selectedCharacter.id && !isManualNavigation.current) {
      previousSelectedId.current = selectedCharacter.id;
      
      const selectedIndex = filteredCharacters.findIndex(
        (c) => c.id === selectedCharacter.id
      );
      
      if (selectedIndex !== -1) {
        const selectedPage = Math.floor(selectedIndex / itemsPerPage);
        if (selectedPage !== currentPage) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCurrentPage(selectedPage);
        }
      }
    }
    isManualNavigation.current = false;
  }, [selectedCharacter, filteredCharacters, itemsPerPage, currentPage]);

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCharacters = filteredCharacters.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      isManualNavigation.current = true;
      setDirection('next');
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      isManualNavigation.current = true;
      setDirection('prev');
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSelectCharacter = (character: Character) => {
    dispatch(setSelected({ character }));
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(0);
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
      handlePrev();
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
      handlePrev();
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.container}>
      <Input value={searchTerm} onChange={handleSearch} />
      <div 
        className={`${styles.grid} ${direction === 'next' ? styles.slideNext : ''} ${direction === 'prev' ? styles.slidePrev : ''}`}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {currentCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            image={character.image}
            isFavorite={character.isFavorite}
            isSelected={selectedCharacter?.id === character.id}
            id={character.id}
            onClick={() => handleSelectCharacter(character)}
          />
        ))}
      </div>
      <FavoritesDropdown/>
      <div className={styles.pagination}>
        <Button
          icon={<IoChevronUp />} 
          onClick={handlePrev}
          disabled={currentPage === 0}
        />
        <Button
          icon={<IoChevronDown />} 
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        />
      </div>
    </div>
  );
};
