import Content from "./content"
import Header from "./header"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col max-h-screen overflow-x-hidden">
      <Header />
      <Content>{children}</Content>
    </div>
  )
}

export default Layout
