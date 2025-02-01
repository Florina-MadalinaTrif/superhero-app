import { useState } from "react";
import SuperheroForm from "./components/superheroForm";
import SuperheroList from "./components/superheroList";


export default function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshSuperheroList = () => {
    setRefresh((prev) => !prev); 
  };

  return (
    <div className="main-container">
      <SuperheroForm onSuperheroAdded={refreshSuperheroList} />
      <SuperheroList key={refresh} />
    </div>
  );
}
