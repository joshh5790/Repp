import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCartsThunk } from '../../../store/carts';
import CartCard from './CartCard';

const Carts = () => {
  const dispatch = useDispatch()
  const carts = useSelector(state => Object.values(state.carts))

  useEffect(() => {
    dispatch(getCartsThunk())
  }, [])
  return (
    <div className="page-container flex-col-center">
      <div style={{ width: "90vw", maxWidth: "1200px" }}>
        <h1>Your Active Carts</h1>
        <div className="flex-col" style={{ gap: "1rem" }}>
          {carts.length ? (
            carts.map((cart) => <CartCard cart={cart} />)
          ) : (
            <div>No carts here!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carts
