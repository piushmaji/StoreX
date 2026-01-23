import { LockKeyhole, MessageSquareText, Van } from 'lucide-react'

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
            <section className='py-5 w-[75%]'>
                <div className='flex gap-24 items-center'>
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (<div key={index} className='flex gap-4 items-center'>
                            <div className='h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center'>
                                <Icon />
                            </div>
                            <div className='flex flex-col font-light'>
                                <h1>Secure payment</h1>
                                <h2 className='text-gray-300 '>Have you ever finally just </h2>
                            </div>
                        </div>)
                    })}
                </div>
            </section>
        </div>
    )
}

export default BasicInfo
