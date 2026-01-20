'use client';

import { useState } from 'react';
import styles from './FavoritesDropdown.module.css';
import { FavoriteOption } from '@/components/atoms/FavoriteOption/FavoriteOption';

export const FavoritesDropdown = () => {

    const [open, setOpen] = useState(false)


  return (
    <div className={styles["favorites-dropdown-container"]}>
        {
            !open 
            ? <h3 onClick={() => setOpen(true)}>FAVS</h3> 
            : (
                <div>
                    <div>
                        <span className={styles["favorites-dropdown-invisible"]} onClick={() => setOpen(false)}></span>
                    </div>
                    <ul>
                        <FavoriteOption name="Rick" id={1} />
                        <FavoriteOption name="Morty" id={2} />
                    </ul>
                </div>
            )
        }
    </div>
  )
}
