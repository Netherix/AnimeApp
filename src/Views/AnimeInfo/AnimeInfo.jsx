import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./AnimeInfo.css";

const AnimeInfo = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch anime details");
        }
        const data = await response.json();
        setAnime(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime details:", error);
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!anime) {
    return <p>No anime details found</p>;
  }

  return (
    <div>
      <Navbar />
      <h1 className="title">{anime.attributes.canonicalTitle}</h1>
      <div className="img-container">
        <img
          src={anime.attributes.posterImage.large}
          alt={anime.attributes.canonicalTitle}
        />
      </div>
      <p className="synopsis">{anime.attributes.synopsis}</p>
      <div className="more-info">
        <p>Average Rating: {anime.attributes.averageRating}</p>
        <p>Episode Count: {anime.attributes.episodeCount}</p>
        <p>Start Date: {anime.attributes.startDate}</p>
        <p>End Date: {anime.attributes.endDate}</p>
      </div>
    </div>
  );
};

export default AnimeInfo;
