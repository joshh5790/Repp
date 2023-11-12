import OpenModalButton from "../../OpenModalButton";
import DeletePage from "../../Modals/DeletePage";

const More = ({ page }) => {
  return (
    <div>
      {page && <OpenModalButton
        buttonText="Delete Page"
        className="delete-page-button button-hover"
        modalComponent={<DeletePage page={page}/>}
      />}
    </div>
  );
};

export default More;
