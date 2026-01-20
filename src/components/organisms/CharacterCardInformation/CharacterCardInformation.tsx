import { Character } from "@/characters"
import { Information } from "@/components/atoms/Information/Information";
import styles from "./CharacterCardInformation.module.css";
import { CharacterStatus } from "@/components/atoms/CharacterStatus/CharacterStatus";

interface Props {
    character: Character;
}


export const CharacterCardInformation = ({ character }: Props) => {
  return (
    <div className={styles["character-card-information-container"]} style={{ 
      backgroundImage: `url(https://rickandmortyapi.com/api/character/avatar/1.jpeg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className={styles["character-information-status"]}>
            <CharacterStatus status="Alive"/>
        </div>
        <div className={styles["character-information"]}>
            <div>
                <Information title="TEST" description="TEST" />
            </div>
            <div className={styles["character-card-information-details"]}>
                <Information title="TEST" description="TEST" />
                <Information title="TEST" description="TEST" />
                <Information title="TEST" description="TEST" />
                <Information title="TEST" description="TEST" />
            </div>
        </div>
    </div>
  )
}
