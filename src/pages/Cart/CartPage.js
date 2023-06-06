import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

// Components
import BTitle from "../../components/Base/BTitle/BTitle";
import CartItem_Donation from "./components/CartItems/CartItem_Donation";

const CartPage = () => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  const totalPrice = cart.cartState.donations.reduce(
    (partSum, i) => partSum + i.price,
    0
  );
  // +
  // cart.cartState.products.reduce((partSum, i) => partSum + i.price, 0) +
  // cart.cartState.pieces.reduce((partSum, i) => partSum + i.price, 0);

  return (
    <section className="cart-section">
      <BTitle>Košík</BTitle>
      {cart.cartState.donations && (
        <Fragment>
          {/* <h2>Darovat</h2> */}
          <section className="cart-items-donations-section">
            {cart.cartState.donations.map((don, i) => (
              <CartItem_Donation
                key={i}
                don={don}
                removeF={() => cart.removeDonation(don.id)}
              />
            ))}
          </section>
        </Fragment>
      )}
      {cart.cartState.pieces &&
        cart.cartState.pieces.map((p) => <p key={p.number}>{p.title}</p>)}
      {/* {cart.cartState.products && <h2>Produkty</h2>} */}
      {cart.cartState.products &&
        cart.cartState.products.map((prod) => (
          <p key={prod.number}>{prod.title}</p>
        ))}
      {cart.cartState.donations.length !== 0 && <p>Cena celkem: {totalPrice}</p>}
      {cart.cartState.donations.length === 0 && <p>Košík je prázdný</p>}
      {cart.cartState.donations.length !== 0 && (
        <Fragment>
          {" "}
          {!auth.token ? (
            <NavLink className="btn--primary" to={`/nakup`}>
              Nákup bez registrace
            </NavLink>
          ) : (
            <NavLink className="btn--primary" to={`/nakup`}>
              Nakoupit
            </NavLink>
          )}
        </Fragment>
      )}
    </section>
  );
};

export default CartPage;
