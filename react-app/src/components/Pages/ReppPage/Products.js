import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../../../store/products";
import OpenModalButton from "../../OpenModalButton";
import ProductDetails from "../../Modals/ProductDetails";
import "./Products.css";

const Products = ({ pageId }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => Object.values(state.products));

  useEffect(() => {
    dispatch(getProductsThunk(pageId));
  }, [dispatch]);

  return (
    <>
      <h2>MERCH</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li className="product-container" key={product?.id}>
            <OpenModalButton
              modalComponent={() => <ProductDetails product={product} />}
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
                  <div className="product-card-info">
                    <h3 className="product-card-name">{product?.name}</h3>
                    <p className="product-card-price">${product?.price}</p>
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

export default Products;
