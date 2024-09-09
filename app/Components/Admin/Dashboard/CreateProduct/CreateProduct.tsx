"use client";
import React, { useState, ChangeEvent, DragEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import styles from "./CreateProducts.module.css";

interface CreateProductProps {
  id?: number | null; // Optional product ID for update
}

const CreateProduct: React.FC<CreateProductProps> = ({ id }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch product details for update
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${id}`);
          const product = response.data;
          setTitle(product.title || '');
          setDescription(product.description || '');
          setPreview(product.image ? `data:image/jpeg;base64,${product.image}` : null);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleClick = () => {
    document.getElementById('file_input')?.click();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    (document.getElementById('file_input') as HTMLInputElement).value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('title', title);
    formData.append('description', description);

    setLoading(true);

    try {
      const endpoint = id ? `/api/products/${id}` : '/api/products';
      const method = id ? 'put' : 'post';
      const response = await axios.request({
        url: endpoint,
        method,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      alert(id ? 'Product updated successfully!' : 'Product created successfully!');
      
      // Clear form inputs after successful submission
      setFile(null);
      setPreview(null);
      setTitle('');
      setDescription('');
      (document.getElementById('file_input') as HTMLInputElement).value = "";
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.create_product_container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>Title (required)</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Product Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.input_container}>
          <label>Description (required)</label>
          <textarea
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.input_container}>
          <label>Upload Image (required)</label>
          <div
            className={styles.drop_area}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" />
                <button type="button" className={styles.cancel_button} onClick={handleCancel}>×</button>
              </>
            ) : (
              <p>Drag & drop a file here or click to upload</p>
            )}
          </div>
          <input
            type="file"
            id="file_input"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input_file}
          />
        </div>
        <div className={styles.submit_button}>
          <button type="submit" disabled={loading}>
            {id ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
