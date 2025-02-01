import { useEffect, useState } from "react";
import "./styles.css";

const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      try {
        const response = await fetch("https://superheroes-api-production-772e.up.railway.app/superheroes/list");
        if (!response.ok) {
          throw new Error("Failed to fetch superheroes");
        }
        const data = await response.json();
        setSuperheroes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuperheroes();
  }, []);

  return (
    <div className="container superhero-list">
      <h2 className="list-title">Superhero List</h2>

      {loading && <p>Loading superheroes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        superheroes.length === 0 ? (
          <p>No superheroes added yet.</p>
        ) : (
          superheroes.map((hero, index) => (
            <div key={index} className="list-item">
              <p><strong>Name:</strong> {hero.name}</p>
              <p><strong>Superpower:</strong> {hero.superpower}</p>
              <p><strong>Humility:</strong> {hero.humilityScore}</p>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default SuperheroList;

  