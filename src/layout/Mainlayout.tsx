
const Mainlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className='bg-surface rounded-2xl h-full p-6  shadow-lg shadow-primary/10'>
            {children}
        </section>
    )
}

export default Mainlayout