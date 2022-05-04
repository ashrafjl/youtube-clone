import React, { useEffect } from "react";
import "./HomeScreen.css";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesBar from "../categoriesBar/CategoriesBar";
import Video from "../videos/Video";
import { useDispatch, useSelector } from "react-redux";
import { getPopularVideos } from "../../redux/actions/videos.action";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "../skeletons/SkeletonVideo";
const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);
  const { videos, loading } = useSelector((state) => state.homeVideos);
  const fetchData = ()=>{
    dispatch(getPopularVideos());
  }
  return (
    <Container>
      {/* <CategoriesBar /> */}
      <InfiniteScroll 
      dataLength={videos.length} //This is important field to render the next data
      next={fetchData}
      hasMore={true}
      >
      <Row>
        {!loading ? (videos.map((video, index) => (
          <Col lg={3} md={4} key={index}>
            <Video video={video} />
          </Col>
        )))
      : 
      [...Array(30)].map(()=>{
        return (<Col lg={3} md={4} key={2+Math.random()}>
          <SkeletonVideo />
          </Col>)
      })
      }
      </Row>
      </InfiniteScroll>
    </Container>
  );
};

export default HomeScreen;
