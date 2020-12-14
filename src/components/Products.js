import React from 'react'


export default function Products({products,base,addTocart,removeFromCart}) {
  return (
    <>
      <h1>Products List</h1><hr/>
      <div className="products">
        {
          products.map((product,idx) => (          
            <div className="product" key={idx}>
              <h3>{product.name}</h3>
              <h4>{`${base} ${product.price}`}</h4>
              <img src={product.images} alt={product.name}/>
              <button data-testid="add-button" onClick={()=> addTocart(product)}>Add to cart</button>{" "}
              <button onClick={()=> removeFromCart(product)}>Remove item</button>
            </div>        
          ))
        }
      </div>
    </>
  )
}
