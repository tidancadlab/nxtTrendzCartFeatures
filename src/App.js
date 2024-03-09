import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [
      {
        availability: 'In Stock',
        brand: 'LEGO',
        description:
          'Collect all mystery mini-figures in the new series 11 and grow your LEGO Minifigure Collection. Each mini-figure comes in a sealed “mystery” bag with its accessories, display plate, and collector’s booklet. Only 1 of 16 individual mini-figures will be available in each “mystery” bag.',
        id: 1002,
        imageUrl:
          'https://assets.ccbp.in/frontend/react-js/ecommerce/toys-people-toys.png',
        price: 760,
        rating: 3.9,
        title: 'Minifigures',
        totalReviews: 5463,
        quantity: 1,
      },
    ],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const isAlready = cartList.find(value => value.id === product.id)
    this.setState(prevState => ({
      cartList: isAlready
        ? prevState.cartList.map(value => {
            if (value.id === product.id) {
              return {...value, quantity: value.quantity + product.quantity}
            }
            return value
          })
        : [...prevState.cartList, product],
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(previous => ({
      cartList: previous.cartList.filter(value => id !== value.id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(value => {
        if (value.id === id) {
          return {...value, quantity: value.quantity + 1}
        }
        return value
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(value => {
        if (value.id === id) {
          if (value.quantity > 1) {
            return {...value, quantity: value.quantity - 1}
          }
          this.removeCartItem(id)
        }
        return value
      }),
    }))
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
