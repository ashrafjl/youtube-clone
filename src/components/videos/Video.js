import { Avatar, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import request from '../../api'
import './Video.css'
import moment from 'moment'
import numeral from 'numeral'
import 'moment-duration-format';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from "react-router-dom";
const Video = ({video}) => {
  const {id, snippet:{channelId,channelTitle,title,publishedAt,thumbnails:{medium}}} = video
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(512456);
  const [channelIcon, setChannelIcon] = useState(null);

  //modifying views setting
  const seconds = moment.duration(duration).asSeconds
  const _duration = moment.utc(seconds * 1000).format('mn:ss')
  let videoId = id;
  if(videoId.videoId){
    videoId = videoId.videoId
  }
  else{
    videoId = id
  }
  useEffect(()=>{
    const getVideoDetails = async(id)=>{
      const {data:{items},
      } = await request.get('/videos',{
        params:{
          part: 'contentDetails,statistics',
          id:id,
        }
      })
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount)
    }
    getVideoDetails(videoId)
  },[videoId])
  useEffect(()=>{
    const getChannelIcon = async()=>{
      const {data:{items}} = await request.get('/channels',{
        params:{
          part: 'snippet',
          id: channelId,
        }
      })
      setChannelIcon(items[0].snippet.thumbnails.default.url)
    }
    getChannelIcon()
  },[channelId])
  const navigate = useNavigate();
  const handleVideoClick = ()=>{
      navigate(`/watch/${videoId}`)
  }
  return (
    <div className='video' onClick={handleVideoClick}>
        <Paper elevation={0}>
          <div className='video_thumbnail'>
            <LazyLoadImage src={medium.url} effect='blur' />
          </div>
          <div className='video_content'>
              <div className='video_avatar'>
                  <Avatar src={channelIcon}/>
              </div>
              <div className='video_title_container'>
                  <h6 className='video_title'>{title}</h6>
                  <p className='channel_name'>{channelTitle}</p>
                  <p className='channel_views'>{numeral(views).format('0.a')} views <span>{moment(publishedAt).fromNow()}</span></p>
              </div>
          </div>
          </Paper>
    </div>
  )
}

export default Video