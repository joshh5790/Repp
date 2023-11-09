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
    <div className="manage-products-list">
      <OpenModalButton
        className="new-product-button"
        modalComponent={<ManageProduct pageId={page.id} />}
        buttonText="+ New Product"
      />
      {products.map((product) => (
        <OpenModalButton
          className="manage-product-card"
          key={product.id}
          modalComponent={<ProductDetails product={product} isDisabled={true}/>}
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
                  className={"open-edit-product"}
                  buttonText={<i className="fa-regular fa-pen-to-square" />}
                  modalComponent={<ManageProduct product={product} />}
                />
                <OpenModalButton
                  className={"open-delete-product"}
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
    </div>
  );
};

export default EditProducts;
