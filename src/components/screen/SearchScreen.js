import React, { useState } from 'react'
import { useEffect } from 'react';
import {Container} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useDispatch} from 'react-redux';
import { useParams } from "react-router-dom";
import request from '../../api';
import HorizontalVideo from '../horizontalVideos/HorizontalVideo';
const SearchScreen = () => {
    const [searchResult, setSearchResult] = useState([]);
    const {query} = useParams()
    const dispatch = useDispatch()
  useEffect(()=>{
      const getvideo = async (keyword)=>{
        const {data} = await request.get('/search',{
            params:{
              part: 'snippet',
              maxResults: 20,
              q:keyword,
              type: 'video,channel',
          }
        }) 
        setSearchResult(data.items)
      }
      getvideo(query)
    },[])
    console.log(searchResult)
    // const {videoItems,loading} = useSelector(state => state.searchVideos)

  return (
    <Container>
     {
       searchResult ? searchResult?.map((video,index)=>{
        return (<HorizontalVideo video={video} SearchScreen />)
       }) 
       : <Skeleton width={'100%'} height={'100px'} count={10}/>
     }
    </Container>
  )
}

export default SearchScreen