import React,{useEffect, useState} from 'react';
import {MasonryLayout} from './MasonryLayout'; 
import { client } from "../client";
import { searchQuery, feedQuery } from '../utils/data';
import { Spinner } from './Spinner';



export const Search = ({searchTerm }) => {
  const [pins,setPins] = useState([]);
  const [ loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true);
    if(searchTerm){
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data)=>{
        setPins(data);
        setLoading(false);
      })
    }else{
      client.fetch(feedQuery).then((data)=>{
        setPins(data);
        setLoading(false);
      })
    }
  },[searchTerm])
  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading &&(
        <div className='mt-10 text-center text-xl'> No Pins Found</div>
      )}
    </div>
  )
}
