import { useState } from "react";

function Restaurant() {
  const [name, setName] = useState("Puzata Hata");
  const [address, setAddress] = useState("Kyiv, Khreshchatyk St, 15");
  const [rating, setRating] = useState(4.5);
  const [cuisine, setCuisine] = useState("Ukrainian");
  const [image, setImage] = useState(
    "https://lh3.googleusercontent.com/p/AF1QipMRbGpOIXBEqKCoLvskTn2_2l7BKEdAcIHMj1Ve=s1360-w1360-h1020-rw"
  );

  return (
    <div >
      <h3>{name}</h3>
      <p> Address: {address} </p>
      <p>Rating:  {rating}</p>
      <p>Cuisine:  {cuisine}</p>
      <img src={image} alt={name} width="300" />

      <hr />

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label>
          Rating:
          <input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
          />
        </label>

        <label>
          Cuisine:
          <input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default Restaurant;

