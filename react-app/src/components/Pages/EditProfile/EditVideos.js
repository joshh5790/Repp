import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVideoThunk, getVideosThunk } from "../../../store/videos";

const EditVideos = ({ page }) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => Object.values(state.videos));
  const [name, setName] = useState("");
  const [video, setVideo] = useState("");
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (page) dispatch(getVideosThunk(page.id));
  }, [dispatch, page]);

  const handleAddVideo = () => {
    setName("");
    setVideo("");
    setEditMode(false);
  };

  const handleDeleteVideo = (videoId) => {
    dispatch(deleteVideoThunk(videoId));
    setReload((prev) => !prev);
  };

  return (
    <>
      {!editMode ? (
        <div onClick={() => setEditMode(true)} className="new-card-button">
          <b>+ Add Video</b>
        </div>
      ) : (
        <div
          className="new-card-button"
          style={{
            border: "2px solid #999999",
            backgroundColor: "white",
            cursor: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "18rem",
            }}
          >
            <label
              className="update-socials-label"
              style={{ fontSize: "1rem" }}
            >
              Video Title
              <input />
            </label>
            <label
              className="update-socials-label"
              style={{ fontSize: "1rem" }}
            >
              Video URL
              <input />
            </label>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: "1rem"}}>
            <button onClick={handleAddVideo}>Add</button>
            <button
              onClick={() => {
                setName("");
                setVideo("");
                setEditMode(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {videos.map((video) => (
        <div className="manage-cards">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <iframe
              title={video?.name}
              src={video?.video}
              className="edit-list-video"
            />
            <div>{video.name}</div>
          </div>
          <button
            className="delete-card"
            onClick={() => handleDeleteVideo(video.id)}
          >
            <i className="fa-solid fa-x" />
          </button>
        </div>
      ))}
    </>
  );
};

export default EditVideos;
