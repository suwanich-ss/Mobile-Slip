import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "../connectAPI/callProduct";

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("โหลดข้อมูลล้มเหลว:", err);
      setMessage("โหลดข้อมูลล้มเหลว: " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจว่าต้องการลบสินค้านี้ใช่หรือไม่?")) {
      try {
        await deleteProduct(id);
        setMessage("ลบสินค้าสำเร็จ");
        fetchProducts();
        setTimeout(() => setMessage(""), 2000);
      } catch (err) {
        console.error("ลบไม่สำเร็จ:", err);
        setMessage("ลบไม่สำเร็จ: " + err.message);
        setTimeout(() => setMessage(""), 2000);
      }
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditCategory(product.category);
    setEditStock(product.stock);
    setEditImageUrl(product.image_url || "");
  };

  const handleUpdate = async (id) => {
    if (!editName || !editPrice || !editCategory || !editStock) {
      setMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    setLoading(true);
    try {
      await updateProduct(id, {
        name: editName,
        price: parseFloat(editPrice),
        category: editCategory,
        stock: parseInt(editStock),
        image_url: editImageUrl
      });
      
      setMessage("อัปเดตสินค้าสำเร็จ");
      setEditId(null);
      setEditImageUrl("");
      fetchProducts();
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("อัปเดตไม่สำเร็จ:", err);
      setMessage("อัปเดตไม่สำเร็จ: " + err.message);
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditImageUrl("");
    setMessage("");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>จัดการสินค้า</h2>
      
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: message.includes('สำเร็จ') ? '#d4edda' : '#f8d7da',
          color: message.includes('สำเร็จ') ? '#155724' : '#721c24',
          border: '1px solid',
          borderColor: message.includes('สำเร็จ') ? '#c3e6cb' : '#f5c6cb',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold' }}>รูปภาพ</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold' }}>ชื่อสินค้า</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold' }}>ราคา</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold' }}>หมวดหมู่</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold' }}>สต๊อก</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontWeight: 'bold' }}>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                {editId === product.id ? (
                  <>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>{product.id}</td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      <input
                        type="url"
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.target.value)}
                        placeholder="URL รูปภาพ"
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          marginBottom: '8px'
                        }}
                      />
                      {editImageUrl && (
                        <img 
                          src={editImageUrl} 
                          alt="Preview" 
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                      />
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        style={{
                          width: '100px',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                      />
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      <input
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                      />
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      <input
                        type="number"
                        value={editStock}
                        onChange={(e) => setEditStock(e.target.value)}
                        style={{
                          width: '80px',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                      />
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'top', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleUpdate(product.id)}
                        disabled={loading}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: loading ? '#6c757d' : '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          marginRight: '8px'
                        }}
                      >
                        {loading ? '...' : 'บันทึก'}
                      </button>
                      <button 
                        onClick={cancelEdit}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        ยกเลิก
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '12px', verticalAlign: 'middle', fontWeight: 'bold' }}>{product.id}</td>
                    <td style={{ padding: '12px', verticalAlign: 'middle' }}>
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                          border: '1px dashed #ddd'
                        }}>
                          📷
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'middle', fontWeight: 'bold' }}>{product.name}</td>
                    <td style={{ padding: '12px', verticalAlign: 'middle' }}>{product.price} บาท</td>
                    <td style={{ padding: '12px', verticalAlign: 'middle' }}>{product.category}</td>
                    <td style={{ padding: '12px', verticalAlign: 'middle' }}>{product.stock}</td>
                    <td style={{ padding: '12px', verticalAlign: 'middle', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleEdit(product)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '8px'
                        }}
                      >
                        แก้ไข
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        ลบ
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#6c757d',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          ไม่มีข้อมูลสินค้า
        </div>
      )}
    </div>
  );
}

export default ManageProduct;