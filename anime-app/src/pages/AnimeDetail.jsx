import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimeById } from "../services/api";

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getAnimeById(id);
        setAnime(data);
      } catch {
        setError("Error fetching anime details");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) return <h2 className="center-message">Loading...</h2>;
  if (error) return <h2 className="center-message">{error}</h2>;
  if (!anime) return <h2 className="center-message">No anime found</h2>;

  const formatDate = (date) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="detail-container">
      <div className="detail-card">
        <img src={anime.images?.jpg?.large_image_url} alt={anime.title} />

        <div className="detail-info">
          <h1>{anime.title}</h1>

          <h3>Other Titles</h3>
          <ul>
            {anime.titles?.map((titleObj, index) => (
              <li key={index}>{titleObj.title}</li>
            ))}
          </ul>

          <p>
            <strong>Synopsis:</strong> {anime.synopsis}
          </p>

          <p>
            <strong>Started:</strong> {formatDate(anime.aired?.from)}
          </p>

          <p>
            <strong>Ended:</strong>{" "}
            {anime.aired?.to ? formatDate(anime.aired?.to) : "Still airing"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetail;
