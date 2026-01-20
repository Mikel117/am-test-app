"use client";

import { CharacterCard, Input } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { useState, useEffect } from "react";
import styles from "./SearchGrid.module.css";
import { Character } from "@/characters/interfaces/characters-reponse";
import { setSelected } from "@/store/characters/characters.slice";

export const SearchGrid = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.characters.items);
  const selectedCharacter = useAppSelector((state) => state.characters.characterSelected);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCharacters = filteredCharacters.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setDirection('next');
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
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

  return (
    <div className={styles.container}>
      <Input value={searchTerm} onChange={handleSearch} />
      <div className={`${styles.grid} ${direction === 'next' ? styles.slideNext : ''} ${direction === 'prev' ? styles.slidePrev : ''}`}>
        {currentCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            image={character.image}
            isFavorite={character.isFavorite}
            isSelected={selectedCharacter?.id === character.id}
            onClick={() => handleSelectCharacter(character)}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        <span className={styles.pageInfo}>
          Página {currentPage + 1} de {totalPages}
        </span>
        <button
          className={styles.button}
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
