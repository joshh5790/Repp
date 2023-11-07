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
    <>
      <h1>VIDEOS</h1>
      <div className='videos-list'>
        {videos.map(video => (
          <div
          key={video?.id}
          className='video-container'>
            <iframe
              title={video?.name}
              src={video?.video}
              className="video-list-video"
            />
            <div>{video?.name}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default VideoSection;
