import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVideosThunk } from '../../../store/videos';
import './VideoSection.css'

const VideoSection = ({ pageId }) => {
  const dispatch = useDispatch()
  const videos = useSelector(state => Object.values(state.videos))

  useEffect(() => {
    dispatch(getVideosThunk(pageId))
  }, [dispatch, pageId])
  return (
    <div>
      <h1>VIDEOS</h1>
      {videos.map(video => (
        <div
        key={video?.id}
        className='video-container'>
          {/* <iframe
            src={video?.video}
            className="video-list-video"
          /> */}
          <div>{video?.name}</div>
        </div>
      ))}
    </div>
  )
}

export default VideoSection;
