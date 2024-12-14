import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchQuery, feedQuery } from '../utils/data';
import { client } from "../client";
import { Spinner } from './Spinner';
import { MasonryLayout } from './MasonryLayout'; // Ensure this is the correct import

export const Feed = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(shuffleArray(data));
        setLoading(false);
      })
      // .catch((error) => {
      //   console.error('Error fetching data:', error);
      //   setLoading(false);
      // });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(shuffleArray(data));
        setLoading(false);
      })
      // .catch((error) => {
      //   console.error('Error fetching data:', error);
      //   setLoading(false);
      // });
    }
  }, [categoryId]);

  const ideaName = categoryId || 'new';

  if (loading) {
    return <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />;
  }

  return (
    <div>{pins && <MasonryLayout pins={pins} />}</div>
  );
};
