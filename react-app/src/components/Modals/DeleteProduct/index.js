import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteProductThunk } from "../../../store/products";
import "./DeleteProduct.css";
import { updateRPageThunk } from "../../../store/pages";

const DeleteProduct = ({ product, setReload, numProducts, videoSection }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteProduct = () => {
    dispatch(deleteProductThunk(product.id));
    if (numProducts === 1) {
      dispatch(
        updateRPageThunk({
          pageId: product.pageId,
          shopSection: false,
          videoSection,
        })
      );
    }
    setReload((prev) => !prev);
    closeModal();
  };

  return (
    <div className="flex-col" style={{ maxWidth: "25rem", width: "80vw" }}>
      {product && (
        <>
          <h2>Are you sure you want to delete {product.name}?</h2>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="cancel-delete-button button-hover"
              onClick={closeModal}
            >
              Cancel
            </div>
            <div
              className="confirm-delete-product button-hover"
              onClick={handleDeleteProduct}
            >
              Delete Product
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteProduct;
