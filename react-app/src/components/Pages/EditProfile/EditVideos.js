import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVideoThunk,
  deleteVideoThunk,
  getVideosThunk,
  updateVideoThunk,
} from "../../../store/videos";
import { updateRPageThunk } from "../../../store/pages";

const EditVideos = ({ page }) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => Object.values(state.videos));
  const [name, setName] = useState("");
  const [video, setVideo] = useState("");
  const [errors, setErrors] = useState({});
  const [addMode, setAddMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editInput, setEditInput] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (page) {
      dispatch(getVideosThunk(page.id));
    }
  }, [dispatch, page]);

  const handleAddVideo = () => {
    if (!video) return setErrors({ video: ["URL is required."] });
    else {
      dispatch(createVideoThunk({ pageId: page.id, name, video }));
      if (!page.videoSection)
        dispatch(
          updateRPageThunk({
            pageId: page.id,
            shopSection: page.shopSection,
            videoSection: true,
          })
        );
      setName("");
      setVideo("");
      setAddMode(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (videos.length === 1) {
      await dispatch(
        updateRPageThunk({
          pageId: page.id,
          shopSection: page.shopSection,
          videoSection: false,
        })
      );
    }
    await dispatch(deleteVideoThunk(videoId));
    setReload((prev) => !prev);
  };

  const handleUpdateVideo = async (videoId) => {
    await dispatch(updateVideoThunk({ videoId, name: editName }));
    setEditInput("");
    setEditName("");
  };

  return (
    <>
      {!addMode ? (
        <div
          onClick={() => setAddMode(true)}
          className="new-card-button ease-bg"
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
                setAddMode(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {videos.map((video) => (
        <div
          key={video.id}
          className={`manage-cards ease-bg ${
            (editInput.length || addMode) ? "no-video-hover" : ""
          }`}
        >
          <div
            style={{ display: "flex", gap: "1rem" }}
            onClick={() => {
              if (!editInput.length && !addMode) {
                setEditInput(video.name);
                setEditName(video.name);
              }
            }}
          >
            <iframe
              title={video?.name}
              src={video?.video}
              className="edit-list-video"
            />
            <div className="flex-col" style={{ gap: "1rem" }}>
              <input
                className="update-video-input"
                onFocus={() => {
                  if (!editInput.length && !addMode) {
                    setEditInput(video.name);
                    setEditName(video.name);
                  }
                }}
                onChange={(e) => setEditName(e.target.value)}
                value={editInput !== video.name ? video.name : editName}
                disabled={editInput !== video.name && editName.length > 0}
              />
              {editInput === video?.name && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    className="add-video-button button-hover"
                    onClick={() => handleUpdateVideo(video.id)}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-video-button button-hover"
                    onClick={() => {
                      setEditInput("");
                      setEditName("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
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
