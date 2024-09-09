"use client";
import { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios"; // Import Axios
import Container from "../Container/container";
import styles from "./OrderForm.module.css";

interface OrderItem {
  productName: string;
  quantity: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  orders: OrderItem[];
  message: string;
}

const OrderForm: React.FC = () => {
  const searchParams = useSearchParams();
  const product = searchParams?.get("product") || ""; // Handle the case where searchParams might be null
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { productName: "", quantity: "" },
    { productName: "", quantity: "" },
    { productName: "", quantity: "" },
    { productName: "", quantity: "" },
    { productName: "", quantity: "" },
  ]);

  const [productTitles, setProductTitles] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);  // Ref to the form element

  useEffect(() => {
    const fetchProductTitles = async () => {
      try {
        const response = await fetch("/api/products/titles"); // Adjust the API route if needed
        const data = await response.json();
        setProductTitles(data.map((product: any) => product.title));
      } catch (error) {
        console.error("Failed to fetch product titles", error);
      }
    };

    fetchProductTitles();
  }, []);

  useEffect(() => {
    if (product) {
      const selectedProduct = productTitles.find((title) => title === product);
      if (selectedProduct) {
        setOrderItems((prevOrderItems) => [
          { productName: selectedProduct, quantity: "" },
          ...prevOrderItems.slice(1),
        ]);
      }
    }
  }, [product, productTitles]);

  const handleProductChange = (index: number, productName: string) => {
    setOrderItems((prevOrderItems) =>
      prevOrderItems.map((item, i) =>
        i === index ? { ...item, productName } : item
      )
    );
  };

  const handleQuantityChange = (index: number, quantity: string) => {
    setOrderItems((prevOrderItems) =>
      prevOrderItems.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const formData: FormData = {
        fullName: formRef.current.fullName.value,
        email: formRef.current.email.value,
        phone: formRef.current.phone.value,
        company: formRef.current.company.value,
        orders: orderItems.filter((item) => item.productName && item.quantity),
        message: formRef.current.message.value,
      };

      console.log("Submitting form data:", formData); // Add this line to debug

      try {
        // Submit to /api/orders
        await axios.post("/api/orders", formData);
        // Submit to /api/order-form/send
        const response = await axios.post("/api/order-form/send", formData);
        if (response.status === 200) {
          alert("Order submitted successfully!");
          setOrderItems([
            { productName: "", quantity: "" },
            { productName: "", quantity: "" },
            { productName: "", quantity: "" },
            { productName: "", quantity: "" },
            { productName: "", quantity: "" },
          ]);
          formRef.current.reset();  // Use formRef to reset the form
        } else {
          alert("Failed to submit order.");
        }
      } catch (error) {
        console.error("Failed to submit order", error);
        alert("An error occurred while submitting the order.");
      }
    }
  };

  return (
    <section className={styles.order_section}>
      <div className={styles.heading}>
        <h2>Order Form</h2>
      </div>
      <Container>
        <div className={styles.row}>
          <div className={styles.description_buyer}>
            <div className={styles.title}>
              <h3>Buyer Request Form</h3>
            </div>
            <div className={styles.info}>
              <p>
                Please fill out the following order form, selecting your desired
                product and specifying the quantity in kilograms (Kg). Ensure
                all required fields are completed. If you have any questions or
                need assistance, feel free to contact us. We will get in touch
                with you shortly regarding your request.
              </p>
              <Link href="/#Contact">Contact Us</Link>
            </div>
          </div>
          <div className={styles.form_order}>
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className={`${styles.input_container} ${styles.w50}`}>
                <label>Full Name (required)</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>
              <div className={`${styles.input_container} ${styles.w50}`}>
                <label>Email (required)</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className={`${styles.input_container} ${styles.w50}`}>
                <label>Phone (required)</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Your Phone"
                  required
                />
              </div>
              <div className={`${styles.input_container} ${styles.w50}`}>
                <label>Company Name</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Enter Your Company Name"
                />
              </div>
              <div className={styles.product_selection}>
                {orderItems.map((item, index) => (
                  <div key={index} className={styles.input_row}>
                    <div className={`${styles.input_container} ${styles.w50}`}>
                      <label>Product {index + 1}</label>
                      <select
                        value={item.productName}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          handleProductChange(index, e.target.value)
                        }
                        required={index === 0}
                      >
                        <option value="">Select a product</option>
                        {productTitles.map((title, index) => (
                          <option key={index} value={title}>
                            {title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={`${styles.input_container} ${styles.w50}`}>
                      <label>Quantity Product {index + 1} (Kg)</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        placeholder="Enter quantity"
                        required={index === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={`${styles.input_container} ${styles.w100}`}>
                <label>Message (required)</label>
                <textarea name="message" id="" required></textarea>
              </div>
              <div className={styles.submit_button}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OrderForm;
