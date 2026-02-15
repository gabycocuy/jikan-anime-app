const BASE_URL = "https://api.jikan.moe/v4";

export const getAnimeList = async () => {
  const response = await fetch(`${BASE_URL}/top/anime`);

  if (!response.ok) {
    throw new Error("Failed to fetch anime list");
  }

  const result = await response.json();

  return result.data || [];
};

export const getAnimeById = async (id) => {
  const response = await fetch(`${BASE_URL}/anime/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch anime details");
  }

  const result = await response.json();

  return result.data;
};
