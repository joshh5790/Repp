import OpenModalButton from "../../OpenModalButton";
import DeleteProfile from "../../Modals/DeleteProfile";

const More = ({ profile }) => {
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
