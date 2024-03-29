import React, { useEffect } from 'react'
import VideoPlayer from './VideoPlayer'
import CommentContainer from './CommentContainer'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { collapseMenubar, toggleMenubarPositionValue } from '../utility/menuSlice';
import useVideoAndChannelData from '../utility/useVideoAndChannelData';
import VideoPlayerShimmer from './VideoPlayerShimmer'
import LiveChatContainer from './LiveChatContainer'
import VideoContainer from './VideoContainer'
import { VIDEOS_LIST_API_URL } from '../constants'


const VideoScreen = () => {
  const [videoId] = useSearchParams();
  const [vData, , channelData,] = useVideoAndChannelData(videoId?.get("v"), [videoId]);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(collapseMenubar());
    dispatch(toggleMenubarPositionValue());

    return () => dispatch(toggleMenubarPositionValue());


  }, [])


  return ((vData && channelData) ?
    <div className='flex w-[calc(100vw)] overflow-y-auto flex-wrap xl:flex-nowrap h-[calc(100vh-70px)] px-2'>
      <div className='mx-auto'>
        <VideoPlayer vData={vData} channelData={channelData} videoId={videoId?.get("v")} />
        {vData?.items[0]?.statistics?.commentCount > 0 &&
          <CommentContainer videoId={videoId?.get("v")} numComments={vData?.items[0]?.statistics?.commentCount} />}
      </div>
      <div className='w-full'>
        {vData?.items[0]?.snippet?.liveBroadcastContent == "live" &&
          <LiveChatContainer />}
        <VideoContainer VIDEOS_LIST_API_URL={VIDEOS_LIST_API_URL} includeLiveVideo={false} type="video" />
      </div>
    </div>
    :
    <VideoPlayerShimmer />
  )
}

export default VideoScreen