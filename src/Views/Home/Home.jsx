import React, { useEffect, useState } from "react";
import Navbar from '../../Components/Navbar/Navbar';
import AnimeCards from '../../Components/AnimeCards/AnimeCards';

const Home = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch('https://kitsu.io/api/edge/anime');
        if (!response.ok) {
          throw new Error('Failed to fetch anime data');
        }
        const data = await response.json();
        setAnimeList(data.data);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchAnimeData();
  }, []);

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
    </div>
  );
};

export default Home;
