import { useEffect, useState } from "react";
import { getAnimeList } from "../services/api";
import AnimeCard from "../components/AnimeCard";

function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getAnimeList();
        setAnimeList(data);
      } catch {
        setError("Error fetching anime");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  if (loading) return <h2 className="center-message">Loading...</h2>;
  if (error) return <h2 className="center-message">{error}</h2>;
  if (!animeList.length)
    return <h2 className="center-message">No anime found</h2>;

  return (
    <>
      <h1 className="page-title">Anime List</h1>

      <div className="container">
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </>
  );
}

export default Home;
