import { useRef } from "react";

import Card from "../UI/Card";
import styles from "./NewCharacterForm.module.css";

function NewCharacterForm(props) {
  const nameInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const characterData = {
      name: enteredName,
      image: enteredImage,
      description: enteredDescription,
    };

    props.onAddCharacter(characterData);
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="name">Character Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="image">Character Image</label>
          <input type="url" required id="image" ref={imageInputRef} placeholder="Enter Image Url..." />
        </div>
        <div className={styles.control}>
          <label htmlFor="description">Character Description</label>
          <textarea id="description" required rows="5" ref={descriptionInputRef}></textarea>
        </div>
        <div className={styles.actions}>
          <button>Add Character</button>
        </div>
      </form>
    </Card>
  );
}

export default NewCharacterForm;
