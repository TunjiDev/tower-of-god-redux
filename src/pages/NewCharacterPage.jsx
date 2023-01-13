import { useNavigate } from "react-router-dom";

import NewCharacterForm from "../components/Characters/NewCharacterForm";

function NewCharacterPage() {
  const navigate = useNavigate();

  function addCharacterHandler(characterData) {
    fetch("https://tower-of-god-redux-default-rtdb.firebaseio.com/characters.json", {
      method: "POST",
      body: JSON.stringify(characterData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/");
    });
  }

  return (
    <section>
      <h1 style={{ textAlign: "center", marginTop: "90px" }}>Add New Character</h1>
      <NewCharacterForm onAddCharacter={addCharacterHandler} />
    </section>
  );
}

export default NewCharacterPage;
