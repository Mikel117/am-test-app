"use client";

import { Button, CharacterCardInformation } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCharacters } from "@/store/characters/characters.slice";
import { useEffect } from "react";
import styles from "./page.module.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function CharacterPage() {
  const dispatch = useAppDispatch();
  const selectedCharacter = useAppSelector((state) => state.characters.characterSelected);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <div className={styles.characterInformationContainer}>
      <CharacterCardInformation character={selectedCharacter} />
    </div>
  );
}
