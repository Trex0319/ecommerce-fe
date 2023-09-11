import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddProducts from "./AddProducts";
import EditProducts from "./EditProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product_add" element={<AddProducts />} />
        <Route path="/product/:id" element={<EditProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
