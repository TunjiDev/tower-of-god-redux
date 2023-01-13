import CharacterItem from "./CharacterItem";
import styles from "./CharacterList.module.css";

function CharacterList(props) {
  return (
    <ul className={styles.list}>
      {props.characters.map((character) => (
        <CharacterItem
          key={character.id}
          id={character.id}
          image={character.image}
          name={character.name}
          description={character.description}
        />
      ))}
    </ul>
  );
}

export default CharacterList;
