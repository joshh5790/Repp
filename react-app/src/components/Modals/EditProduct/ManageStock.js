import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductStocksThunk,
  createProductStockThunk,
} from "../../../store/productStock";
import { checkNumeric } from "../../../utilities";
import "./ManageStock.css";

const ManageStock = ({ productId, showStock, setShowStock, setShowImage }) => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => Object.values(state.productStock));
  const [editSize, setEditSize] = useState("");
  const [editStock, setEditStock] = useState("");
  const [errors, setErrors] = useState({});
  const [reload, setReload] = useState(false);
  const stockRef = useRef();

  useEffect(() => {
    if (productId) {
      dispatch(getProductStocksThunk(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (!showStock) return;

    const closeStock = (e) => {
      if (!stockRef.current.contains(e.target)) {
        setShowStock(false);
      }
    };

    document.addEventListener("click", closeStock);

    return () => document.removeEventListener("click", closeStock);
  }, [showStock]);

  const openStock = (e) => {
    e.stopPropagation();
    setShowStock((prev) => !prev);
    setShowImage(false);
  };

  const handleCreateStock = () => {
    if (!editSize && sizes.length) {
      return setErrors((prev) => {
        return {
          ...prev,
          editSize: ["You have existing sizes, can't be blank"],
        };
      });
    }
    if (!editStock) {
      return setErrors((prev) => {
        return { ...prev, editStock: ["Stock cannot be blank"] };
      });
    } else if (!errors.editStock && !errors.editSize) {
      dispatch(
        createProductStockThunk({
          productId,
          size: editSize,
          stock: editStock,
        })
      );
      setEditSize("");
      setEditStock("");
      setShowStock(false);
      setReload((prev) => !prev);
    }
  };

  return (
    <>
      <div className="add-sizes-container">
        <b>Sizes</b>{" "}
        <button className="modal-add-button" onClick={(e) => openStock(e)}>
          + Add size/stock
        </button>
        <div
          className={"stock-dropdown" + (showStock ? "" : " hidden")}
          ref={stockRef}
        >
          <p style={{ fontSize: "0.7rem", marginTop: "0" }}>
            Leave size blank if product only has one size
          </p>
          <label className="product-input-label">
            Size:
            <input
              value={editSize}
              placeholder="S, M, L, etc..."
              onChange={(e) => {
                setErrors((prev) => {
                  delete prev.editSize;
                  return prev;
                });
                setEditSize(e.target.value);
              }}
              type="text"
            />
          </label>
          <div className="error-msg">
            {errors.editSize && errors.editSize[0]}&nbsp;
          </div>
          <label className="product-input-label">
            Stock:
            <input
              value={editStock}
              onChange={(e) => {
                setErrors((prev) => {
                  delete prev.editStock;
                  return prev;
                });
                if (checkNumeric(e.target.value) || !e.target.value) {
                  setEditStock(e.target.value);
                }
              }}
              type="text"
            />
          </label>
          <div className="error-msg">
            {errors.editStock && errors.editStock[0]}&nbsp;
          </div>
          <button
            onClick={handleCreateStock}
            className="modal-dropdown-button button-hover"
          >
            Add
          </button>
        </div>
      </div>
      {sizes.length > 0 && (
        <div style={{ display: "flex", overflow: "auto", overflowY: "hidden" }}>
          {sizes.map((size) => (
            <div className="list-size" key={size.id}>
              <b>
                {size.size || "Single Size"}-{size.stock}
              </b>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default ManageStock;
