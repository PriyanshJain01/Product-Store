import React from 'react'
import { Link } from 'react-router-dom'
import { EditIcon } from 'lucide-react' // Importing the Edit icon from lucide-react
import { Trash2Icon } from 'lucide-react' // Importing the Trash icon from lucide-react
import { useProductStore } from '../Store/useProductStore'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../Store/useUserStore'
import toast from 'react-hot-toast'

function ProductCard({product}) {
  const Navigate=useNavigate();
  const {Admin}=useUserStore();
    const { deleteProduct , buyProduct, addCurrentProduct} = useProductStore();
  return (
    <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
      {/* Product Image */}
      <figure className="relative pt-[56.25%]">
        <img
  src={product.image}
  alt={product.name}
  className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
  onClick={() => {
    const isAdmin = useUserStore.getState().Admin; // get fresh state
    if (isAdmin) {
      Navigate(`../product/${product.id}`);
    }
  }}
/>
      </figure>

      <div className='card-body'> 
        {/* Product Info */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>

        {/* CARD ACTIONS */}
        {Admin && (
          <div className="card-actions justify-end mt-4">
          <Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline">
            <EditIcon className="size-4" />
          </Link>
          <button
            className="btn btn-sm btn-error  btn-outline" onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon className="size-4"/>
          </button>
        </div>
        )}
        {!Admin && (
          <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-info btn-outline" onClick={()=> buyProduct()}>
            Buy Now
          </button>
          <button
            className="btn btn-sm btn-error  btn-outline" onClick={() => addCurrentProduct()}
          >
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
</svg>

          </button>
        </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
