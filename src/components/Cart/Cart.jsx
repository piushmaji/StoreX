import React from 'react'
import MyCart from './MyCart'
import SaveForLater from './SaveForLater'
import BasicInfo from './BasicInfo'

const Cart = () => {
    return (
        <div className='flex flex-col lg:px-20 lg:pt-8 gap-4 p-2 bg-gray-50 overflow-x-hidden'>


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
