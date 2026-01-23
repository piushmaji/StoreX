import React from 'react'
import MyCart from './MyCart'
import SaveForLater from './SaveForLater'
import BasicInfo from './BasicInfo'

const Cart = () => {
    return (
        <div className='flex flex-col lg:px-20 lg:pt-4 gap-4 bg-gray-50'>


            {/*My cart section */}
            <MyCart />

            {/*Basic information section */}
            <BasicInfo />

            {/*Saved for later section */}
            <SaveForLater />
        </div>
    )
}

export default Cart
