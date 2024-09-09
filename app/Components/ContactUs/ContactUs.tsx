"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import Container from "../Container/container";
import styles from "./ContactUs.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

// Define the form data type
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Track if form is submitting

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button and show loading state

    try {
      const res = await fetch("/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const result = await res.json();
        alert(`Failed to send message: ${result.message}`);
      }
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false); // Re-enable button after request completes
    }
  };

  return (
    <section className={styles.contact_us} id="Contact">
      <Container>
        <div className={styles.title}>
          <h3>Contact Us</h3>
        </div>
        <div className={styles.row}>
          <div className={styles.contact_left}>
            <div className={styles.contact_image_container}>
              <img 
                src="/Assets/ship.jpg" 
                alt="shipping grain from Canada to the world"
              />
            </div>
            <div className={styles.contact_info}>
              <h3>Si Ahmed Corps</h3>
              <ul>
                <li>
                  <FaLocationDot /> 
                  <span>
                    90 Burnhamthorpe Rd. West, Canada <br />
                    3 Clunies Ross Court, Eight Mile Plains
                  </span>
                </li>
                <li>
                  <SiGmail />
                  <span>siAhmed@gmail.com</span>
                </li>
                <li>
                  <FaPhoneAlt />
                  <span>+1 905.***.***</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.form_contact_container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.input_container}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Enter Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.submit_button}>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactUs;
