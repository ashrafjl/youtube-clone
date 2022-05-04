import React, { useEffect } from "react";
import "./SingleVideo.css";
import { Row, Col} from "react-bootstrap";
import VideoMeta from "../videoMeta/VideoMeta";
import HorizontalVideo from "../horizontalVideos/HorizontalVideo";
import Comment from '../comments/Comment'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedVideos, getVideoById } from "../../redux/actions/videos.action";
import Skeleton from "react-loading-skeleton";
const SingleVideo = () => {
  const {id} = useParams()
  const {video,loading} = useSelector(state=> state.selectedVideo)
  const {videos,loading:relatedVideoloading} = useSelector(state => state.relatedVideo)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getVideoById(id))
    dispatch(getRelatedVideos(id))
  },[dispatch,id])
  return (
    <Row>
      <Col lg={8}>
            <div className="video_player">
                <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1`} frameBorder={0} title={video ? video.snippet.title : 'Video Title'} allowFullScreen width={'100%'} height={'100%'}
                allow='autoplay'
                ></iframe>
            </div>
            {!loading ? <VideoMeta video={video} videoId={id}/> : ''}
      </Col>
      <Col lg={4}>
      {
          !loading && videos.filter(video => video.snippet).map((video)=>{
              return (<HorizontalVideo key={video.id.videoId} video={video}/>)
          })
      }
      </Col>
    </Row>
  );
};

export default SingleVideo;
