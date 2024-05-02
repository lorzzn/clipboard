type ContentProps = {
  children: React.ReactNode
}

const Content = ({ children }: ContentProps) => {
  return (
    <div className="flex-1 flex flex-col w-full items-center pt-6 pb-16">
      <div className="flex-1 flex flex-col w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 transition-[width]">
        {children}
      </div>
    </div>
  )
}

export default Content
