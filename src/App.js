import React, { useState,useEffect } from 'react';
import Products from './components/Products';
import Carts from './components/Carts';
import {items} from './data/items'
import './App.css';

function App() {

  const [cart,setCart] = useState([]);
  const [page,setPage] = useState('products');
  const[currencies,setCurrencies] = useState([]);
  const [base,setBase] = useState('GBP');
  const [products] = useState(items);

  useEffect(()=>{
    getCurrency();
  },[])



const getCurrency = async() => {
  await fetch('https://api.exchangeratesapi.io/latest?base=GBP')
  .then(response =>response.json())
  .then(data => setCurrencies(data.rates))
  .catch(error => console.log(error))
}

// add item to the cart
const addTocart = (item) => { 
  setCart(currentCart => [...currentCart, item])
}
// remove item from the cart
const removeFromCart = (item) => {
  setCart(currentCart => {
    const indexOfItemToRemove  =  
        currentCart.findIndex( cartItem => cartItem.id === item.id )
    if(indexOfItemToRemove === -1){
      return currentCart
    }
    return [
      ...currentCart.slice(0, indexOfItemToRemove),
      ...currentCart.slice(indexOfItemToRemove+1)
    ]
  })
 }

  const handleCurrencyChange = (e) => {
     setBase(e.target.value)
  }
// get currency rate
const getRate = () => {
  let rates = Object.entries(currencies)
    for(let rate of rates){
      if(rate[0] === base){return rate[1]}
    }
  return rates[1]
}
 
//get the total amount
  const getTotals = () => {
    let total = cart.reduce((sum,{price}) => sum + price, 0)    
    return total
  }


  return (
    <div className="App">
      <header>
        <button onClick={()=>setPage('carts')}>Go to Checkoout({cart.length})</button>{" "}
        <button onClick={()=>setPage('products')}>Go to Products</button>
      </header>

      {page === 'products' &&  
      <Products products={products} base={base} 
                addTocart={addTocart} removeFromCart={removeFromCart}/>}

      {page === 'carts' &&  
      <Carts base={base} getTotals={getTotals} 
            getRate={getRate} handleCurrencyChange={handleCurrencyChange} 
            currencies={currencies} />}
    </div>
  );
}

export default App;
