import { LockKeyhole, MessageSquareText, Van } from 'lucide-react'

export const features = [
    { icon: LockKeyhole, title: "Secure Payment", description: "Your data is fully encrypted" },
    { icon: MessageSquareText, title: "24/7 Support", description: "We're here whenever you need" },
    { icon: Van, title: "Free Delivery", description: "On all orders above ₹499" },
]

const BasicInfo = () => {
    return (
        <section className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:pb-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {features.map(({ icon: Icon, title, description }, i) => (
                    <div key={i} className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-2xl bg-gray-50 hover:bg-blue-50/60 hover:border-blue-100 border border-transparent transition-all duration-200 group">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center shrink-0 transition-colors duration-200">
                            <Icon size={15} className="text-blue-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] sm:text-xs font-extrabold text-gray-800 leading-tight truncate">{title}</p>
                            <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium leading-tight mt-0.5 hidden sm:block truncate">{description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BasicInfo