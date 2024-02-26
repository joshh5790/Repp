import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  formatCurrency,
  invalidImage,
  isObjectEmpty,
} from "../../../utilities";
import OpenModalButton from "../../OpenModalButton";
import { getProductsThunk } from "../../../store/products";
import { updateProfileThunk } from "../../../store/profiles";
import ProductDetails from "../../Modals/ProductDetails";
import DeleteProduct from "../../Modals/DeleteProduct";
import ManageProduct from "../../Modals/ManageProduct";
import "./EditProducts.css";

const EditProducts = ({ profile }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => Object.values(state.products));
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (profile) {
      dispatch(getProductsThunk(profile.id)).then((data) => {
        if (isObjectEmpty(data) && profile.shopSection) {
          dispatch(
            updateProfileThunk({
              profileId: profile.id,
              videoSection: profile.videoSection,
              shopSection: false,
            })
          );
        } else if (!isObjectEmpty(data) && !profile.shopSection) {
          dispatch(
            updateProfileThunk({
              profileId: profile.id,
              videoSection: profile.videoSection,
              shopSection: true,
            })
          );
        }
      });
    }
  }, [dispatch, profile]);

  return (
    <>
      {profile && (
        <OpenModalButton
          className="new-card-button ease-bg"
          modalComponent={
            <ManageProduct
              profileId={profile.id}
              numProducts={products.length}
              videoSection={profile.videoSection}
            />
          }
          buttonText={<b>+ New Product</b>}
        />
      )}
      {products.map((product) => (
        <OpenModalButton
          className="manage-product-cards ease-bg"
          key={product.id}
          modalComponent={<ProductDetails product={product} preview={true} />}
          buttonText={
            <>
              <img
                alt=""
                className="manage-product-img"
                src={product?.previewImage}
                onError={invalidImage}
                // style={{ gridArea: "visual" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "1rem",
                  flexGrow: "1",
                }}
              >
                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    whiteSpace: "nowrap",
                    width: "15vw",
                  }}
                >
                  {product?.name}
                </div>
                <div>{formatCurrency(product?.price)}</div>
              </div>
              <div
                style={{
                  justifySelf: "flex-end",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <OpenModalButton
                  className={"delete-card ease-bg"}
                  buttonText={<i className="fa-solid fa-x" />}
                  modalComponent={
                    <DeleteProduct
                      product={product}
                      setReload={setReload}
                      numProducts={products.length}
                      videoSection={profile.videoSection}
                    />
                  }
                />
                <OpenModalButton
                  className={"edit-card ease-bg"}
                  buttonText={<i className="fa-regular fa-pen-to-square" />}
                  modalComponent={<ManageProduct product={product} />}
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
