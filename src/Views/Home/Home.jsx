import React, { useEffect, useState } from "react";
import Navbar from '../../Components/Navbar/Navbar';
import AnimeCards from '../../Components/AnimeCards/AnimeCards';

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch('https://kitsu.io/api/edge/anime');
        if (!response.ok) {
          throw new Error('Failed to fetch anime data');
        }
        const data = await response.json();
        setAnimeList(data.data);
        setNextPageUrl(data.links.next); // Set the next page URL
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchAnimeData();
  }, []);

  const fetchNextPage = async () => {
    try {
      if (nextPageUrl) {
        const response = await fetch(nextPageUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch next page data');
        }
        const data = await response.json();
        setAnimeList([...animeList, ...data.data]); // Append new data to the existing anime list
        setNextPageUrl(data.links.next); // Update the next page URL
      }
    } catch (error) {
      console.error('Error fetching next page data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-center my-4">Anime Titles</h2>
      <div className="card-container">
        {animeList.map((anime) => (
          <AnimeCards
            key={anime.id}
            imageUrl={anime.attributes.posterImage.small}
            title={anime.attributes.canonicalTitle}
            description={anime.attributes.synopsis}
          />
        ))}
      </div>
      {nextPageUrl && (
        <button onClick={fetchNextPage}>Next Page</button>
      )}
    </div>
  );
};

export default Home;
