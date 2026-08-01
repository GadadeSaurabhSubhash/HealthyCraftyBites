import React, { useState } from 'react'
import '../css_cash_counter_service/ViewOrderCSS.css'
import { fetchOrderByNumber, placeOrderPayment } from '../../../api/ViewOrderApi'
import FindProductBox from './FindProductBox'
import OrderDetailsDisplayBox from './OrderDetailsDisplayBox'

function ViewOrder(){
  const [orderNo, setOrderNo] = useState('')
  const [order, setOrder] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [paymentMode, setPaymentMode] = useState('cash')
  const [paymentDone, setPaymentDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  async function searchOrder(){
    const trimmedOrderNo = orderNo.trim()
    if(!trimmedOrderNo) return

    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')
    setOrder(null)
    setPaymentDone(false)

    try {
      const foundOrder = await fetchOrderByNumber(trimmedOrderNo)
      setOrder(foundOrder)
      setPaymentMode('cash')
    } catch(error){
      setOrder(null)
      setPaymentDone(false)
      setErrorMessage(error?.message || 'Oops! Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  function handlePaymentDone(){
    if(!order) return
    setPaymentDone(true)
    setSuccessMessage('Payment completed successfully.')
  }

  async function handlePlaceOrder(){
    if(!order) return

    setPlacingOrder(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await placeOrderPayment(order.orderNumber, paymentMode)
      setPaymentDone(true)
      setSuccessMessage('Order placed successfully.')
    } catch(error){
      setErrorMessage(error?.message || 'Oops! Something went wrong.')
    } finally {
      setPlacingOrder(false)
    }
  }

  function calculateTotal(){
    if(!order || !order.items) return 0
    return order.items.reduce((sum, item) => sum + (item.qty * item.price), 0)
  }

  function calculateQtyTotal(){
    if(!order || !order.items) return 0
    return order.items.reduce((sum, item) => sum + item.qty, 0)
  }

  return (
    <div className="ViewOrder">

      <FindProductBox
        orderNo={orderNo}
        onChange={e => setOrderNo(e.target.value)}
        onCheck={searchOrder}
        loading={loading}
      />

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      {successMessage && !errorMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {order && (
        <OrderDetailsDisplayBox
          order={order}
          paymentMode={paymentMode}
          onPaymentModeChange={e => setPaymentMode(e.target.value)}
          onPaymentDone={handlePaymentDone}
          onPlaceOrder={handlePlaceOrder}
          paymentDone={paymentDone}
          placingOrder={placingOrder}
          errorMessage={errorMessage}
          successMessage={successMessage}
          calculateTotal={calculateTotal}
          calculateQtyTotal={calculateQtyTotal}
        />
      )}
    </div>
  )
}

export default ViewOrder
