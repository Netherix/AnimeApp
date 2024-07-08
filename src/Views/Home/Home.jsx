import React, { useEffect, useState, useRef } from "react";
import Navbar from '../../Components/Navbar/Navbar';
import AnimeCards from '../../Components/AnimeCards/AnimeCards';
import Search from '../../Components/Search/Search';
import CategoryDropdown from '../../Components/CategoryDropdown/CategoryDropdown'; // Import the new component

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to store selected category
  const observer = useRef();

  useEffect(() => {
    fetchAnimeData();
  }, [selectedCategory]); // Trigger fetchAnimeData when selectedCategory changes

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const handleObserver = async (entries) => {
      const target = entries[0];
      if (target.isIntersecting && nextPageUrl && !loading) {
        try {
          setLoading(true);
          const response = await fetch(nextPageUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch next page data');
          }
          const data = await response.json();
          setAnimeList([...animeList, ...data.data]); // Append new data to the existing anime list
          setNextPageUrl(data.links.next); // Update the next page URL
          setLoading(false);
        } catch (error) {
          console.error('Error fetching next page data:', error);
          setLoading(false);
        }
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (observer.current) {
      observer.current.observe(document.querySelector('.end-of-list'));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [nextPageUrl, loading, selectedCategory]);

  const fetchAnimeData = async (searchQuery = '', category = selectedCategory) => {
    try {
      setLoading(true);
      let url = 'https://kitsu.io/api/edge/anime';
      
      if (category) {
        url += `?filter[categories]=${category}`;
      } else if (searchQuery) {
        url += `?filter[text]=${searchQuery}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch anime data');
      }
      const data = await response.json();
      setAnimeList(data.data);
      setNextPageUrl(data.links.next); // Set the next page URL
      setLoading(false);
    } catch (error) {
      console.error('Error fetching anime data:', error);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    fetchAnimeData(query);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    fetchAnimeData('', category); // Fetch anime data based on selected category
  };

  // Define anime categories sorted alphabetically
  const categories = [
    'Action',
    'Adventure',
    'Comedy',
    'Mecha',
    'Music',
    'Romance',
    'Slice-of-life',
    'Sports',
    'Thriller'
  ];

  return (
    <div>
      <Navbar />
      <h2 className="text-center my-4">Anime Titles</h2>
      <Search onSearch={handleSearch} />
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />
      <div className="card-container">
        {animeList.map((anime) => (
          <AnimeCards
            key={anime.id}
            id={anime.id}
            imageUrl={anime.attributes.posterImage.small}
            title={anime.attributes.canonicalTitle}
            description={anime.attributes.synopsis}
          />
        ))}
        <div className="end-of-list" style={{ height: '10px' }}></div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
