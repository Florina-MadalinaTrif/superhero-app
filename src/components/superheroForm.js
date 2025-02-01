
import "./styles.css";

import { useState } from "react";

const SuperheroForm = ({ onSuperheroAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    superpower: "",
    humilityScore: Number,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "humilityScore" ? Number(value) : value,
    });  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://superheroes-api-production-772e.up.railway.app/superheroes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add superhero");
      }

      onSuperheroAdded();
      setFormData({ name: "", superpower: "", humilityScore: "" });
    } catch (error) {
      console.error("Error adding superhero:", error);
      setErrorMessage(error.message)
    }
  };

  return (
    <div className="container">
      <h2>Add a SUPERHERO</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>

        <div className="input-group">
          <label>Superpower:</label>
          <input
            type="text"
            name="superpower"
            value={formData.superpower}
            onChange={handleChange}
            placeholder="Enter superpower"
          />
        </div>

        <div className="input-group">
          <label>Humility:</label>
          <input
            type="number"
            name="humilityScore"
            value={formData.humilityScore}ß
            onChange={handleChange}
            placeholder="Enter humility score"
          />
        </div>

        <button type="submit">Add</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SuperheroForm;