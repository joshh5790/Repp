import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isObjectEmpty } from "../../../utilities";
import OpenModalButton from "../../OpenModalButton";
import { getProductsThunk } from "../../../store/products";
import DeleteProduct from "../../Modals/DeleteProduct";

const EditProducts = ({ page }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => Object.values(state.products));
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (page) dispatch(getProductsThunk(page.id));
  }, []);

  return (
    <div className="manage-products-list">
      {products.map((product) => (
        <div className="manage-product-card" key={product.id}>
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
            <div>
              <div>{product?.name}</div>
              <div>{product?.price}</div>
            </div>
          </div>
          <div style={{display: 'flex', gap: '1.5rem'}}>
            <OpenModalButton
              className={"open-edit-product"}
              buttonText={<i className="fa-regular fa-pen-to-square" />}
              modalComponent={<DeleteProduct />}
            />
            <OpenModalButton
              className={"open-delete-product"}
              buttonText={<i className="fa-solid fa-x" />}
              modalComponent={<DeleteProduct product={product} setReload={setReload}/>}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditProducts;
