import { LockKeyhole } from 'lucide-react'
import { MessageSquareText } from 'lucide-react'
import { Van } from 'lucide-react'


export const features = [
    {
        icon: LockKeyhole,
        title: "Secure payment",
        description: "Have you ever finally just"
    },
    {
        icon: MessageSquareText,
        title: "Customer support",
        description: "Have you ever finally just "
    },
    {
        icon: Van,
        title: "Free delivery ",
        description: "Have you ever finally just"
    }
];


const BasicInfo = () => {
    return (
        <div>
            {/* Basic information section */}
            <section className='py-5 lg:w-[75%]'>
                <div className='lg:flex lg:gap-24 grid grid-cols-3 items-center text-xs lg:text-base gap-2 justify-between lg:justify-start'>
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (<div key={index} className='flex lg:gap-4   gap-2 items-center'>
                            <div className='lg:h-10 lg:w-10 rounded-full bg-gray-400 flex items-center justify-center p-1'>
                                <Icon />
                            </div>
                            <div className='flex flex-col font-light '>
                                <h1>Secure payment</h1>
                                <h2 className='text-gray-400 '>Have you ever finally just </h2>
                            </div>
                        </div>)
                    })}
                </div>
            </section>
        </div>
    )
}

export default BasicInfo
