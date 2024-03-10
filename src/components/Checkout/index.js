import {Component} from 'react'
import './index.css'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {paymentOption: '', isPaid: false}
  }

  onPaymentOption = e => {
    this.setState({paymentOption: e.target.id})
  }

  onPayment = () => {
    this.setState({isPaid: true})
  }

  render() {
    const {cartList, removeAllCartItems, close} = this.props
    const {paymentOption, isPaid} = this.state
    const baseAmount = [...[0], ...cartList].reduce(
      (total, value) => total + value.price * value.quantity,
    )
    const taxRate = 0
    const taxAmount = (taxRate * baseAmount) / 100
    const payable = baseAmount + taxAmount
    return isPaid ? (
      <div className=" order-conform-container">
        <div className="checkout-popup-container order-conform">
          <h4>Your order has been placed successfully</h4>
          <button
            className="clear-cart-btn"
            onClick={() => {
              removeAllCartItems()
              close()
            }}
            aria-label="close"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    ) : (
      <div className="checkout-popup-container">
        <button
          style={{position: 'absolute', top: 6, right: 6}}
          onClick={close}
          className="close_btn"
          type="button"
          aria-label="Close"
        >
          &times;
        </button>
        <h1 style={{textAlign: 'center'}}>Checkout</h1>
        <h2>Items</h2>
        <div className="checkout-popup-payment-option">
          <ul className="checkout-items">
            {cartList.map(value => (
              <li className="checkout-item">
                <div>
                  <h3>
                    <span style={{fontSize: '16px', fontWeight: 'normal'}}>
                      {value.quantity}x
                    </span>{' '}
                    {value.title}
                  </h3>
                  <p>by {value.brand}</p>
                </div>
                <p>
                  <strong>INR {value.price * value.quantity} /-</strong>
                </p>
              </li>
            ))}
          </ul>
          <div className="checkout-bill-container">
            <div className="checkout-bill-summary">
              <h3>Bill Summary</h3>
              <p>
                Base Amount: <span>{baseAmount.toFixed(2)}/-</span>
              </p>
              <p>
                GST Rate: <span>{taxRate.toFixed(2)}%</span>
              </p>
              <p>
                GST Amount: <span>{taxAmount.toFixed(2)}/-</span>
              </p>
              <hr />
              <p>
                Total Payable: <span>{payable.toFixed(2)}/-</span>
              </p>
            </div>
            <div className="payment-option-container">
              <label htmlFor="paymentOption">Payment option</label>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  id="upi"
                  disabled
                  onClick={this.onPaymentOption}
                />
                <label htmlFor="upi">UPI (PhonePe, Paytm)</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  id="debitCard"
                  disabled
                  onClick={this.onPaymentOption}
                />
                <label htmlFor="debitCard">Debit Card</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  id="creditCard"
                  disabled
                  onClick={this.onPaymentOption}
                />
                <label htmlFor="creditCard">Credit Card</label>
              </div>
              <div className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  onClick={this.onPaymentOption}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
            <button
              className="order_btn"
              disabled={paymentOption !== 'cod'}
              onClick={this.onPayment}
              type="button"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Checkout
