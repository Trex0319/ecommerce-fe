import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddProducts from "./AddProducts";
import EditProducts from "./EditProducts";
import Cart from "./Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products_add" element={<AddProducts />} />
        <Route path="/products/:id" element={<EditProducts />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
