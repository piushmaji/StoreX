import { CircleCheck, Home, MapPin, Pencil, Phone, Plus, Trash2 } from 'lucide-react'

const PaymentMethod = () => {
    return (
        <div>
            <div className='bg-gray-50 border rounded-lg border-gray-300 py-3 lg:px-6 '>

                {/* Naming section and add to new address button section */}
                <section className='flex justify-between items-center px-2 lg:px-0'>
                    <div className='text-2xl py-2 px-4 lg:px-0'>
                        <h1>Payment Method</h1>
                    </div>

                    <div>
                        <button className='bg-blue-600 rounded-lg text-white flex justify-center items-center p-2 shadow-lg  cursor-pointer'>
                            <Plus />
                            <h1>Add New Card</h1>
                        </button>
                    </div>
                </section>

                {/* Saved address section */}
                <section className='grid lg:grid-cols-2 gap-4 lg:py-6 px-2 py-6'>

                    {/* each address section */}
                    {[1, 2, 3, 4].map(() => (
                        <div className='flex flex-col gap-4 border rounded-lg border-gray-300 shadow-lg p-4 bg-linear-to-br from-sky-50 to-sky-200 '>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <h1>Default Payment Method</h1>
                                    <CircleCheck className='bg-green-400 rounded-full text-white' />
                                </div>

                                <div className='flex gap-2'>
                                    <div className='h-6 w-6 flex items-center justify-center rounded-md bg-blue-300 text-blue-600 p-1 hover:scale-95 transition-all'><Pencil size={16} /></div>
                                    <div className='h-6 w-6 flex items-center justify-center rounded-md bg-red-300 text-red-600 p-1 hover:scale-95 transition-all'><Trash2 size={16} /></div>
                                </div>
                            </div>
                            <div className='flex gap-2 font-semibold'>
                                <div>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAfCAMAAACF8f6iAAAAdVBMVEX///8UNMsAJMkAKspca9YALMoAJskAD8cIL8oAIMgAHcioreYAFMextumiqOUAAMaMlN9GV9G+wuxLXNLv8Pp7hdxlctf6+/7Cxu3f4fbm6PiVnOLO0fHV1/PZ3PSco+RWZtU5TdCBit0tRM5vetkfOswnP839FUl8AAAB00lEQVQ4je1TW4KDIAwkIIKIj/q2rda27t7/iJsE63KE/dj5aIlJJiQThPjHn8KjbbcEkQfzjkY7ihZ/ZzS7R+uMf/YLO+chSbbikzlOQ6W1ria2EqnlIGajtSFWk1oAsL5kp1RayySqelUAqqZT5wH8IgoJ9iLEDS0rM6n8Ss4iQxJQ8X1rBbbli6dgn0L0ioi6CkBfiql4GY56UnXw1yjx7vADHdCRYRNvC1nDFexv0Oopjxy/GH1gmpAgPc2HxLD7GbQrJJVHTx+0XEJsGtI6XEAjDZXwfRdCsH27jebo6RQlhfTGTfmOLT3g10tKwzCPTwhyf2GFOHFxSCduR8KgQbIAiad5uI3OOHk30n39HGc6mrNlLQT9u9Db9E0SONyOxoHqBQklizgxwSI5qvcmWbG3ajwcJVJSWxcLab6uNJ0+TsQkOLQQTRYIAlBTlHamQaXOYVjkQ8xBJElnXAdibXhdSHa1U/qJ8zYMzevEGuGtqI/WfO2vXWHDZiFlrSHIs/8DO1F61swATw5DtCI+/xJlWF4RplPGiYWR0vHmL5WUuJzXKsPHoJWj6lkmTXh4c3WEfdCVeV6yQiueaEZdU+/JXtNzu5Lz2CA85uIffws/lusXjWNFJpAAAAAASUVORK5CYII=" alt="visa" />
                                </div>
                                <div className='text-sm'>
                                    <h1>Visa</h1>
                                    <p>***4243</p>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='text-2xl font-bold'>
                                    <h1>Piush Maji</h1>
                                </div>
                                <div className='font-extralight'>
                                    <h1>Cardholder</h1>
                                </div>
                            </div>
                        </div>
                    ))}

                </section>
            </div >
        </div >
    )
}

export default PaymentMethod
