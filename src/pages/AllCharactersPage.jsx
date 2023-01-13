// import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import CharacterList from "../components/Characters/CharacterList";

function AllCharactersPage() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedCharacters, setLoadedCharacters] = useState([]);
  const { data, isLoading, isError, error, isSuccess } = useQuery("all-chracters", fetchCharacters);

  async function fetchCharacters() {
    const response = await fetch("https://tower-of-god-redux-default-rtdb.firebaseio.com/characters.json");
    const result = await response.json();
    // console.log(result);

    const characters = [];

    for (const key in result) {
      const character = {
        id: key,
        ...result[key],
      };

      characters.push(character);
    }

    console.log(characters);

    return characters;
  }

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://tower-of-god-redux-default-rtdb.firebaseio.com/characters.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const characters = [];

  //       for (const key in data) {
  //         const character = {
  //           id: key,
  //           ...data[key],
  //         };

  //         characters.push(character);
  //       }

  //       setIsLoading(false);
  //       setLoadedCharacters(characters);
  //     });
  // }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>All characters</h1>
      {isSuccess && <CharacterList characters={data} />}
    </section>
  );
}

export default AllCharactersPage;
