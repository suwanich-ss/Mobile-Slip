import React, { useState } from 'react';
import { insertProduct } from '../connectAPI/callProduct';
import { useNavigate } from 'react-router-dom'; 

function InsertProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !price || !category || !stock) {
      setMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setLoading(true);
    
    try {
      const productData = {
        name: name,
        price: parseFloat(price),
        category: category,
        stock: parseInt(stock),
        image_url: imageUrl // ใช้ URL จากเว็บ
      };

      const data = await insertProduct(productData);
      setMessage(data.message || "เพิ่มสินค้าสำเร็จ");
      setTimeout(() => navigate("/productsList"), 1500);
    } catch (err) {
      setMessage("เกิดข้อผิดพลาด: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(''); 
    setPrice('');
    setCategory('');
    setStock('');
    setImageUrl('');
    setMessage('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>เพิ่มสินค้าใหม่</h2>
      
      {/* Image URL Input */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL รูปภาพจากเว็บ (optional)"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {imageUrl && (
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <img 
            src={imageUrl} 
            alt="Preview" 
            style={{ 
              maxWidth: '200px', 
              maxHeight: '200px',
              borderRadius: '8px'
            }} 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Form Fields */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อสินค้า *"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="ราคา *"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="หมวดหมู่ *"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="จำนวนสต็อก *"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          style={{ 
            marginRight: '10px', 
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'กำลังเพิ่ม...' : 'เพิ่มสินค้า'}
        </button> 
        <button 
          onClick={handleCancel}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ยกเลิก
        </button>
      </div>

      {message && (
        <p style={{ 
          color: message.includes('ผิดพลาด') ? 'red' : 'green',
          padding: '10px',
          backgroundColor: message.includes('ผิดพลาด') ? '#ffe6e6' : '#e6ffe6',
          borderRadius: '4px'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default InsertProduct;