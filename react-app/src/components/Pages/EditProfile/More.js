import OpenModalButton from "../../OpenModalButton";
import DeleteProfile from "../../Modals/DeleteProfile";

const More = ({ profile }) => {
  // add buttons for delete all products, delete all tours, delete all videos
  return (
    <div>
      {profile && (
        <OpenModalButton
          buttonText="Delete Profile"
          className="delete-profile-button button-hover"
          modalComponent={<DeleteProfile profile={profile} />}
        />
      )}
    </div>
  );
};

export default More;
