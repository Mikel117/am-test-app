import fs from "node:fs";
import path from "node:path";
import { Character, getCharacters, Info } from "rickmortyapi";

const OUTPUT_PATH = path.join(process.cwd(), "json-server", "db.json");

async function main() {
  const allResults: Character[] = [];
  const res = await getCharacters();
  const data: Info<Character[]> = res.data;
  const results = data?.results ?? data;

  if (Array.isArray(results)) {
    allResults.push(...results);
  }

  const characters = allResults.map(
    ({ id, name, status, image, species, gender, location, origin, episode }) => ({
      id: Number(id),
      name,
      status,
      image,
      species,
      gender,
      location: location.name,
      origin: origin.name,
      episodes: episode.length,
      isFavorite: false,
    }),
  );

  const db = { characters };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(db, null, 2), "utf-8");
  console.log(`Seed OK: ${characters.length} characters -> ${OUTPUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
