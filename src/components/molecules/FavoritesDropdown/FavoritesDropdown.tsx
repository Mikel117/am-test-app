"use client";

import { useEffect, useState } from "react";
import styles from "./FavoritesDropdown.module.css";
import { FavoriteOption } from "@/components/atoms/FavoriteOption/FavoriteOption";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite, setSelected } from "@/store/characters/characters.slice";

export const FavoritesDropdown = () => {
  const [open, setOpen] = useState(false);

  const favorites = useAppSelector((state) => state.characters.favorites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    
  }, [favorites]);

  const removeFavorite = (id: number) => {
    dispatch(toggleFavorite({ isFavorite: false, id }));
  }

  const selectCharacter = (id: number) => {
    const character = favorites.find((fav) => fav.id === id);
    if (character) {
      dispatch(setSelected({ character }));
      setOpen(false);
    }
  }

  return (
    <div className={styles["favorites-dropdown-container"]}>
      {!open ? (
        <h3 onClick={() => setOpen(true)}>FAVS</h3>
      ) : (
        <div>
          <div>
            <span
              className={styles["favorites-dropdown-invisible"]}
              onClick={() => setOpen(false)}
            ></span>
          </div>
          <ul>
            {favorites.map((favorite) => (
              <FavoriteOption 
                key={favorite.id} 
                name={favorite.name} 
                id={favorite.id} 
                onClick={() => selectCharacter(favorite.id)}
                onDelete={() => removeFavorite(favorite.id)} 
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
