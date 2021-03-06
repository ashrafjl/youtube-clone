import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS} from "../actionType"
import request from "../../api"
export const getPopularVideos =  ()=> async (dispatch,getState) =>{
    try{
        dispatch({
            type: HOME_VIDEOS_REQUEST,
        })
        const {data} = await request.get('/videos',{
            params:{
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: "IN",
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
            }
        })        
        // fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyBSGvWCJoNEjOz1XyqL7gsMzqwRPvtp3r8')
        // .then(res => res.json())
        // .then(data => console.log(data))
        console.log(data.items)
        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos:data.items,
                nextPageToken: data.nextPageToken,
                category: 'All'
            }
        })
    }
    catch(error){

        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload:error.message
        })
    }
}

export const getVideosByCategory =  (keyword)=> async (dispatch,getState) =>{
    try{
        dispatch({
            type: HOME_VIDEOS_REQUEST,
        })
        const {data} = await request.get('/search',{
            params:{
                part: 'snippet',
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
                q:keyword,
                type: 'video',
            }
        })        
        // fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyBSGvWCJoNEjOz1XyqL7gsMzqwRPvtp3r8')
        // .then(res => res.json())
        // .then(data => console.log(data))

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos:data.items,
                nextPageToken: data.nextPageToken,
                category: keyword
            }
        })
    }
    catch(error){
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload:error.message
        })
    }
}

export const getVideoById = (id)=> async (dispatch)=>{
    try{
        dispatch({
            type: SELECTED_VIDEO_REQUEST,
        })
        const {data} = await request.get('/videos',{
            params:{
                part: 'snippet,statistics',
                id:id
            }
        })
        dispatch({
            type:SELECTED_VIDEO_SUCCESS,
            payload: data.items[0]
        })
    }
    catch(error){
        dispatch({
            type: SELECTED_VIDEO_FAIL,
            payload: error.message
        })
    }
}


export const getRelatedVideos = (id)=> async (dispatch)=>{
    try{
        dispatch({
            type: RELATED_VIDEO_REQUEST,
        })
        const {data} = await request.get('/search',{
            params:{
                part: 'snippet',
                relatedToVideoId:id,
                maxResults: 10,
                type: 'video'
            }
        })
        dispatch({
            type:RELATED_VIDEO_SUCCESS,
            payload: data.items
        })
    }
    catch(error){
        dispatch({
            type: RELATED_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getVideosBySearch =  (keyword)=> async (dispatch) =>{
    try{
        dispatch({
            type: SEARCH_VIDEO_REQUEST,
        })
        const {data} = await request.get('/search',{
            params:{
                part: 'snippet',
                maxResults: 20,
                q:keyword,
                type: 'video,channel',
            }
        })        

        dispatch({
            type: SEARCH_VIDEO_SUCCESS,
            payload: {
                videoItems:data.items,
                payload:data.items
            }
        })
    }
    catch(error){
        dispatch({
            type: SEARCH_VIDEO_FAIL,
            payload:error.message
        })
    }
}
