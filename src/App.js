import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddProducts from "./AddProducts";
import EditProducts from "./EditProducts";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Orders from "./Orders";
import PaymentVerification from "./PaymentVerification";
import Login from "./Login";
import SignUp from "./Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products_add" element={<AddProducts />} />
        <Route path="/products/:id" element={<EditProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify-payment" element={<PaymentVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
