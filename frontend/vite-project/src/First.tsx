import Header from "./componets/Header.tsx"
import Footer from "./componets/Footer.tsx"
import { Outlet } from 'react-router-dom'

const First = () => {
 return (
    <>
      <Header />
      <Outlet />
      <Footer />
      
    </>
  );
}

export default First;