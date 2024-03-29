import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../../../store/products";
import OpenModalButton from "../../OpenModalButton";
import ProductDetails from "../../Modals/ProductDetails";
import "./ProductSection.css";
import { formatCurrency } from "../../../utilities";

const ProductSection = ({
  profileId,
  setNumCartItems,
  preview,
  previewStyle,
  user,
}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => Object.values(state.products));

  useEffect(() => {
    dispatch(getProductsThunk(profileId));
  }, [dispatch, profileId]);

  return (
    <>
      <h2>MERCH</h2>
      <ul id="product-list" className={previewStyle ? "mobile" : "desktop"}>
        {products.map((product) => (
          <li className="product-container" key={product?.id}>
            <OpenModalButton
              modalComponent={() => (
                <ProductDetails
                  product={product}
                  setNumCartItems={setNumCartItems}
                  preview={preview}
                  user={user}
                />
              )}
              className="product-card-button"
              buttonText={
                <div className="product-card">
                  <div className="image-container">
                    <img
                      src={product?.previewImage}
                      alt={product?.name}
                      className="product-preview"
                    />
                  </div>
                  <div className="flex-col-center">
                    <h3 className="product-card-name">{product?.name}</h3>
                    <p className="product-card-price">
                      {formatCurrency(product?.price)}
                    </p>
                  </div>
                </div>
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductSection;
