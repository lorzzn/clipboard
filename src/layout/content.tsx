type ContentProps = {
  children: React.ReactNode
}

const Content = ({ children }: ContentProps) => {
  return (
    <div className="flex-1 flex flex-col w-full items-center">
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export default Content
