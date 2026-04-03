import { LayoutDashboard, LibraryBig } from 'lucide-react'
import LogoCodeNest from '../assets/logo_codenest.png'
import ThemeToggle from '../common/ThemeToggle'

const SideBar = () => {
    return (
        <aside className='bg-surface h-full rounded-2xl flex flex-col  justify-between items-center shadow-lg shadow-primary/10 '>
            <div className='h-full'>
                <img src={LogoCodeNest} className="mt-2 w-[70%] mx-auto" alt="CodeNest Logo" />
                <div className='h-full mt-2 w-full   flex flex-col gap-1'>
                    {/* item nav  */}
                    <div className='group flex gap-2 text-primary h-fit items-stretch hover:bg-primary/10 transition-colors duration-200 cursor-pointer'>
                        <div className='w-1 rounded-2xl bg-primary opacity-0 group-hover:opacity-100 transition-all duration-200'></div>
                        <div className='flex gap-2 items-center text-text-primary group-hover:text-primary p-2'>
                            <LayoutDashboard />
                            <a href="/" className='text-sm font-medium  '>Dashboard</a>
                        </div>
                    </div>
                    {/* end item nav */}

                    {/* item nav  */}
                    <div className='group flex gap-2 text-primary h-fit items-stretch hover:bg-primary/10 transition-colors duration-200 cursor-pointer'>
                        <div className='w-1 rounded-2xl bg-primary opacity-0 group-hover:opacity-100 transition-all duration-200'></div>
                        <div className='flex gap-2 items-center text-text-primary group-hover:text-primary p-2'>
                            <LibraryBig />
                            <a href="/" className='text-sm font-medium'>Quản lý khóa học</a>
                        </div>
                    </div>
                    {/* end item nav */}

                </div>
            </div>

            <div className='h-fit w-full flex justify-end mr-6  mb-3'>
                <ThemeToggle />
            </div>
        </aside>
    )
}

export default SideBar