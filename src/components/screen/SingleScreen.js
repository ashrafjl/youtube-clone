import React, { useEffect } from "react";
import '../SingleVideo/SingleVideo.css'
import { Row, Col } from "react-bootstrap";
import HorizontalVideo from "../horizontalVideos/HorizontalVideo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import { Avatar } from "@mui/material";
import ShowMore from "../ShowMoreButton/ShowMore";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/videos.action";
import Skeleton from "react-loading-skeleton";
import numeral from "numeral";
import moment from "moment";
import { useState } from "react";
import request from "../../api";
const SingleVideo = () => {
  const { id } = useParams()
  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos, loading: relatedVideoloading } = useSelector(
    (state) => state.relatedVideo
  );
  const [channelContent, setChannelContent] = useState()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  return (
    <Row>
      <Col lg={8}>
        <div className="video_player">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            frameBorder={0}
            title={video ? video.snippet.title : "Video Title"}
            allowFullScreen
            width={"100%"}
            height={"100%"}
            allow="autoplay"
          ></iframe>
        </div>
        {/* video meta  */}
        <div className="video_meta py-2">
          <div className="video_data_top">
            <h5>{video ? video.snippet.title : 'video title'}</h5>
            <div className="d-flex justify-content-between align-items-center py-1">
              <p className="channel_views">
                {video ? numeral(video.statistics.viewCount).format("0.a") : '0'} views
                <span> {video ? moment(video.snippet.publishedAt).fromNow() : '0'}</span>
              </p>

              <div>
                <span className="thumb_down">
                  <MdThumbUp size={26} />
                  {video ? numeral(video.statistics.likeCount).format("0.a") : '0'}
                </span>
                <span className="thmumb_up">
                  <MdThumbDown size={26} />
                  <span>{video ? numeral(video.statistics.dislikeCount).format("0.a") : '0'}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="video_data_channel d-flex justify-content-between align-items-center my-2 py-3">
            <div className="d-flex">

                <Avatar
                  src={"https://www.w3schools.com/howto/img_avatar.png"}/>
              
              {/* <img src="" alt="" className='rounder-circle mr-3'/> */}
              <div className="d-flex flex-column">
                <span>{video ? video.snippet.channelTitle : 'dummy title'}</span>
              </div>
            </div>
            <button className="btn border-0 p-2 m-2">Subscribe</button>
          </div>
          <div className="video_data_description">
            {video ? <ShowMore>{video.snippet.description}</ShowMore> : ""}
          </div>
        </div>
        {/* end video meta  */}
      </Col>
      <Col lg={4}>
        {!loading &&
          videos
            .filter((video) => video.snippet)
            .map((video) => {
              return <HorizontalVideo key={video.id.videoId} video={video} />;
            })}
      </Col>
    </Row>
  );
};

export default SingleVideo;
