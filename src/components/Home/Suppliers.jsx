import React from 'react'

const Suppliers = () => {
    const regions = [
        {
            id: 1,
            title: "Arabic Emirates",
            website: "shopname.ae",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1920px-Flag_of_the_United_Arab_Emirates.svg.png"
        },
        {
            id: 2,
            title: "Australia",
            website: "shopname.ae",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png"
        },
        {
            id: 3,
            title: "United States",
            website: "shopname.ae",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg/1920px-Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg.png"
        },
        {
            id: 4,
            title: "Russia",
            website: "shopname.ru",
            flag: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1920px-Flag_of_Russia.svg.png?20120812153731"
        },
        {
            id: 5,
            title: "Italy",
            website: "shopname.it",
            flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/250px-Flag_of_Italy.svg.png"
        },
        {
            id: 6,
            title: "Denmark",
            website: "denmark.com.dk",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/250px-Flag_of_Denmark.svg.png"
        },
        {
            id: 7,
            title: "France",
            website: "shopname.com.fr",
            flag: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/250px-Flag_of_France.svg.png"
        },
        {
            id: 8,
            title: "Arabic Emirates",
            website: "shopname.ae",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1920px-Flag_of_the_United_Arab_Emirates.svg.png"
        },
        {
            id: 9,
            title: "China",
            website: "shopname.ae",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png"
        },
        {
            id: 10,
            title: "Great Britain",
            website: "shopname.co.uk",
            flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/960px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png"
        }
    ]

    return (
        <div className='p-2'>
            <div className='text-2xl p-2'>
                <h1>Suppliers by region</h1>
            </div>
            <div className='grid lg:grid-cols-5 grid-cols-2 p-2 lg:p-0'>
                {regions.map((items) => [
                    <div key={items.id} className='flex lg:p-2 p-1 mb-2'>
                        <div className='h-8 w-10 flex items-center'>
                            <img src={items.flag} alt={items.title} />
                        </div>
                        <div className='flex flex-col pl-4'>
                            <h1
                                className='text-sm'
                            >{items.title}</h1>
                            <a
                                className='text-xs text-gray-400'
                                href={items.website}>{items.website}</a>
                        </div>
                    </div>

                ])}
            </div>
        </div>
    )
}

export default Suppliers