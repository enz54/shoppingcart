import React from 'react'


export default function Carts({base, getTotals,getRate,handleCurrencyChange,currencies}) {
  return (
    <>
    <h1>Cart Checkout</h1>
        <div className="carts">         
          <label>
            Select a currency {" "}            
            <select value={base} onChange={ handleCurrencyChange}>
            {
              Object.keys(currencies).map((currency,idx) => {
                return <option value={currency} key={idx}>{currency}</option>
              })             
            }
            </select> 
            <hr/>             
            <h3>Total Amount: {base} {(getRate() * getTotals()).toPrecision(3)}</h3>
          </label>       
        </div>
  </>
  )
}
