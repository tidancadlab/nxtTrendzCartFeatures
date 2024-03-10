import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import Checkout from '../Checkout'
import './index.css'

export default () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems} = value
      const totalAmount = value.cartList.reduce(
        (total, item) => total + parseFloat(item.price * item.quantity),
        0,
      )
      return (
        <div className="summery_container">
          <h1 className="ttl_amount">
            Order Total: <span>{totalAmount} /-</span>
          </h1>
          <p className="total_item">{value.cartList.length} Items in cart</p>
          <Popup
            trigger={() => (
              <button className="checkOut_btn" type="button">
                Checkout
              </button>
            )}
            modal
            nested
            closeOnDocumentClick={false}
          >
            {close => (
              <>
                <Checkout
                  cartList={value.cartList}
                  close={close}
                  removeAllCartItems={removeAllCartItems}
                />
              </>
            )}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)
