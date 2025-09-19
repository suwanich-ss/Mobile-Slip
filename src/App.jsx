import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ManageProduct from "./pages/ManageProduct"; // แก้การสะกด
import InsertProduct from "./pages/InsertProduct"; // แก้ชื่อ component

function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productsList" element={<ProductList />} />
        <Route path="/InsertProduct" element={<InsertProduct />} /> // แก้ path
        <Route path="/manageProduct" element={<ManageProduct />} /> // แก้ path
      </Routes>
    </div>
  );
}

export default App;