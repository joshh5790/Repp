import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency, isObjectEmpty } from "../../../utilities";
import OpenModalButton from "../../OpenModalButton";
import { getProductsThunk } from "../../../store/products";
import { updateRPageThunk } from "../../../store/pages";
import ProductDetails from "../../Modals/ProductDetails";
import DeleteProduct from "../../Modals/DeleteProduct";
import ManageProduct from "../../Modals/ManageProduct";

const EditProducts = ({ page }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => Object.values(state.products));
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (page) {
      dispatch(getProductsThunk(page.id)).then((data) => {
        if (isObjectEmpty(data) && page.shopSection) {
          dispatch(updateRPageThunk({ pageId: page.id, shopSection: false }));
        } else if (!isObjectEmpty(data) && !page.shopSection) {
          dispatch(updateRPageThunk({ pageId: page.id, shopSection: true }));
        }
      });
    }
  }, []);

  return (
    <>
      <OpenModalButton
        className="new-card-button"
        modalComponent={<ManageProduct pageId={page.id} />}
        buttonText={<b>+ New Product</b>}
      />
      {products.map((product) => (
        <OpenModalButton
          className="manage-cards"
          key={product.id}
          modalComponent={
            <ProductDetails product={product} isDisabled={true} />
          }
          buttonText={
            <>
              <div style={{ display: "flex", gap: "1rem" }}>
                <img
                  alt=""
                  className="cart-item-img"
                  src={product?.previewImage}
                  onError={({ target }) => {
                    target.onerror = null;
                    target.src =
                      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      textOverflow: "ellipsis",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                    }}
                  >
                    {product?.name}
                  </div>
                  <div>{formatCurrency(product?.price)}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <OpenModalButton
                  className={"edit-card"}
                  buttonText={<i className="fa-regular fa-pen-to-square" />}
                  modalComponent={<ManageProduct product={product} />}
                />
                <OpenModalButton
                  className={"delete-card"}
                  buttonText={<i className="fa-solid fa-x" />}
                  modalComponent={
                    <DeleteProduct product={product} setReload={setReload} />
                  }
                />
              </div>
            </>
          }
        />
      ))}
    </>
  );
};

export default EditProducts;
