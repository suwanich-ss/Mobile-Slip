import React, { useEffect, useState } from "react";
import { getProducts } from '../connectAPI/callProduct.js';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);



  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      console.log("Products data received:", data);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("โหลดข้อมูลสินค้าล้มเหลว:", err);
      setError("ไม่สามารถโหลดข้อมูลสินค้าได้: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

//   if (loading) return <div>กำลังโหลดข้อมูลสินค้า...</div>;
//   if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div>
      <h2> รายการสินค้า ({products.length} รายการ)</h2>
      {products.length === 0 ? (
        <div>ไม่มีข้อมูลสินค้าในฐานข้อมูล</div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
          {products.map((product) => (
            <div key={product.id} >
              <h3>{product.name}</h3>
              <p> ราคา: {product.price} บาท</p>
              <p> สต็อก: {product.stock} ชิ้น</p>
              <p>หมวดหมู่: {product.category}</p>
              
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  style={{
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }} 
                />
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;