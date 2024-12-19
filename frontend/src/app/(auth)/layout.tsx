
import { ModeToggle } from "@/components/theme-toggle";
const Layout = ({ children }: { children: React.ReactNode }) => {


    return (
        <div className='flex flex-col relative min-h-screen w-full overflow-hidden'>
            <div className='w-full absolute z-10 right-4 top-4 flex items-center justify-end'>
                <ModeToggle />
            </div>
            <div className="flex-grow h-full w-full flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default Layout;
