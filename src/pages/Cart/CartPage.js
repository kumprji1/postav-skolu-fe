import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { CartContext } from '../../contexts/CartContext'

const CartPage = () => {
  const auth = useContext(AuthContext)
  const cart = useContext(CartContext)
  console.log('CartPage: cart: ', cart)
  return (
    <section className="cart-section">
        <h1>Košík</h1>
        <h2>Darovat</h2>
        {cart.cartState.donations && cart.cartState.donations.map(don => <p key={don.number}>{don.title}</p>)}
        {cart.cartState.pieces && cart.cartState.pieces.map(p => <p key={p.number}>{p.title}</p>)}
        <h2>Produkty</h2>
        {cart.cartState.products && cart.cartState.products.map(prod => <p key={prod.number}>{prod.title}</p>)}
        <p>Cena celkem: 0</p>
        {!auth.token ? <NavLink to={`/nakup`}>Nákup bez registrace</NavLink> : <NavLink to={`/nakup`}>Nakoupit</NavLink>}
    </section>
  )
}

export default CartPage