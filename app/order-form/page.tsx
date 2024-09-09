import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import OrderForm from "../Components/OrderForm/OrderForm";
import OrderFormClinet from "../Components/OrderForm/OrderFormClient"

const Order_Form = () => {
  return ( 
    <>
      <Navbar />
      <OrderFormClinet />
      <Footer />
    </>
   );
}
 
export default Order_Form;