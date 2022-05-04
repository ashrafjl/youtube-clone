import React, { useEffect, useState } from 'react'
import './HorizontalVideo.css'
import { Row, Col} from "react-bootstrap";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';
import numeral from 'numeral';
import request from '../../api';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router';
const HorizontalVideo = ({video,SearchScreen}) => {
  const [views, setViews] = useState(null);
  const [durations, setDuration] = useState(512456);
  const [channelIcon, setChannelIcon] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null)
  const {id,snippet:{channelId,channelTitle,description,title,publishedAt,thumbnails}} = video
    const seconds = moment.duration('10000').asSeconds;
    const duration = moment.utc(seconds * 1000).format('mn:ss')
    const isVideo = id.kind === 'youtube#video'

    useEffect(()=>{
      const getVideoDetails = async()=>{
        const {data:{items},
        } = await request.get('/videos',{
          params:{
            part: 'contentDetails,statistics',
            id: id.videoId,
          }
        })
        setDuration(items[0].contentDetails.duration);
        setViews(items[0].statistics.viewCount)
      }
      getVideoDetails()
    },[id])
    useEffect(()=>{
      const getChannelIcon = async()=>{
        const {data:{items}} = await request.get('/channels',{
          params:{
            part: 'snippet,statistics',
            id: channelId,
          }
        })
        setChannelIcon(items[0].snippet.thumbnails.high.url)
        setChannelDetails(items[0])
      }
      getChannelIcon()
    },[channelId])
    const navigate = useNavigate()
  const handleClick = ()=>{
    navigate(`/watch/${id.videoId}`)
  }
  return (
    <Row className='horizontal_video' onClick={handleClick}>
        <Col xs={6} md={SearchScreen ? 4 : 6} className='horizontal_video_left'>
            {isVideo ? <LazyLoadImage
            src={thumbnails.high.url}
            width='100%'
            height={'100%'}
            effect='blur'
            /> : 
            <LazyLoadImage
            src={channelIcon}
            width='100%'
            height={'100%'}
            effect='blur'
            className='channelIcon'
            />
            }
            {/* <span className='horizontal_vidoe_duration'>{duration}</span> */}
        </Col>
        <Col xs={6} md={SearchScreen ? 8 : 6} className='horizontal_video_right p-0'>
            {isVideo ? <p className='horizontal_video_title mb-1'>{title}</p> : <p className='horizontal_video_title mb-1'>{channelTitle}</p>}
            <div className='horizontal_video_details'>
              {isVideo ? <span>{numeral(views).format('0.a')} </span> : <span>{numeral(channelDetails?.statistics?.videoCount).format('0.a')} Videos </span>}
              {isVideo ? <span>{moment(publishedAt).fromNow()}</span> : ''}
            </div>
            <div className='horizontal_video_channel d-flex align-items-center my-1'> 
              {isVideo && <p>{channelTitle} </p>}
            </div>
        </Col>
    </Row>
  )
}

export default HorizontalVideo