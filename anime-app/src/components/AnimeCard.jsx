import { useNavigate } from "react-router-dom";
import "./AnimeCard.css";

function AnimeCard({ anime }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img src={anime.images?.jpg?.large_image_url} alt={anime.title} />

      <h3>{anime.title}</h3>

      <p>
        {anime.synopsis
          ? anime.synopsis.substring(0, 120) + "..."
          : "No description available"}
      </p>

      <button onClick={() => navigate(`/anime/${anime.mal_id}`)}>
        See more
      </button>
    </div>
  );
}

export default AnimeCard;
