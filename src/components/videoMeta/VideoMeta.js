import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import "./VideoMeta.css";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import { Avatar } from "@mui/material";
import ShowMore from "../ShowMoreButton/ShowMore";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import request from "../../api";
const VideoMeta = ({video:{snippet,statistics},videoId}) => {

  const {channelId, channelTitle, description, title, publishedAt} = snippet
  const {viewCount, likeCount,dislikeCount} = statistics
  const [channelContent, setChannelContent] = useState()
  const dispatch = useDispatch()
  useEffect(()=>{
    const getVideoDetails = async(id)=>{
      const data = await request.get('/channels',{
        params:{
          part: 'snippet,contentDetails,statistics',
          id: id,
        }
      })
      setChannelContent(data.data.items[0])
    }
    getVideoDetails(channelId)
  },[channelId])
  return (
    <div className="video_meta py-2">
      <div className="video_data_top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <p className="channel_views">
            {numeral(viewCount).format("0.a")} views{" "}
            <span>{moment(publishedAt).fromNow()}</span>
          </p>

          <div>
            <span className="thumb_down">
              <MdThumbUp size={26} />
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="thmumb_up">
              <MdThumbDown size={26} />
              <span>{numeral(dislikeCount).format("0.a")}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="video_data_channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          {channelContent ? (<Avatar src={channelContent.snippet.thumbnails.default.url}/>) : (<Avatar src={ 'https://www.w3schools.com/howto/img_avatar.png'}/>)}
          {/* <img src="" alt="" className='rounder-circle mr-3'/> */}
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            {channelContent ? (<span>{numeral(`${channelContent.statistics.subscriberCount}`).format("0.a")} Subscribers</span>) : ''}
          </div>
        </div>
        <button className="btn border-0 p-2 m-2">Subscribe</button>
      </div>
      <div className="video_data_description">
       {description ? ( <ShowMore>
         {description}
        </ShowMore>) : ''}
      </div>
    </div>
  );
};

export default VideoMeta;
