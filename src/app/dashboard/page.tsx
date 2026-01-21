"use client";

import { CharacterCardInformation } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCharacters } from "@/store/characters/characters.slice";
import { useEffect } from "react";
import styles from "./page.module.css";
import { useCharacters } from "@/hooks/useCharacters";

export default function CharacterPage() {
  const dispatch = useAppDispatch();
  const selectedCharacter = useAppSelector((state) => state.characters.characterSelected);
  
  const { characters, isLoading, isError } = useCharacters();

  useEffect(() => {
    if (characters.length > 0) {
      dispatch(fetchCharacters());
    }
  }, [dispatch, characters]);

  if (isLoading) {
    return (
      <div className={styles.characterInformationContainer}>
        <div style={{ textAlign: 'center', padding: '2rem',  }}>
          Cargando personajes...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.characterInformationContainer}>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          Error al cargar personajes
        </div>
      </div>
    );
  }

  return (
    <div className={styles.characterInformationContainer}>
      <CharacterCardInformation character={selectedCharacter} />
    </div>
  );
}
