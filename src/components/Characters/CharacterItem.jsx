import Card from "../ui/Card";
import styles from "./CharacterItem.module.css";

function CharacterItem(props) {
  return (
    <li className={styles.item}>
      <Card>
        <div className={styles.image}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={styles.content}>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
        </div>
      </Card>
    </li>
  );
}

export default CharacterItem;
