import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>ยินดีต้อนรับสู่หน้า HomePage</h1>
      <p>
        <Link to="/InsertProduct">เพิ่มสินค้า</Link>
      </p>
      <p>
        <Link to="/manageProduct">จัดการสินค้า</Link>
      </p>
      <button onClick={() => navigate("/productsList")}>
        ไปหน้ารายการสินค้า
      </button>
    </div>
  );
}

export default HomePage;