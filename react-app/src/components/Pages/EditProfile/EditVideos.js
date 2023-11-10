import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVideoThunk,
  deleteVideoThunk,
  getVideosThunk,
} from "../../../store/videos";

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
    if (!video) {
      console.log("ERGGG");
      return setErrors({ video: ["URL is required."] });
    } else dispatch(createVideoThunk({ pageId: page.id, name, video }));
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
        <div
          onClick={() => setEditMode(true)}
          className="new-card-button button-hover"
        >
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
            className="flex-col"
            style={{
              marginTop: "1rem",
              gap: "0.5rem",
              width: "18rem",
            }}
          >
            <label
              className="update-socials-label"
              style={{ marginBottom: "0" }}
            >
              Video Title
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label
              className="update-socials-label"
              style={{ marginBottom: "0" }}
            >
              Video URL
              <input value={video} onChange={(e) => setVideo(e.target.value)} />
            </label>
            <div className="error-msg">
              {errors.video && errors.video[0]}&nbsp;
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <button
              className="add-video-button button-hover"
              onClick={handleAddVideo}
            >
              Add
            </button>
            <button
              className="cancel-video-button button-hover"
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
        <div key={video.id} className="manage-cards button-hover">
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
