"use client";
import { useState } from "react";
import { FaHome, FaPlus, FaUsers, FaUser } from "react-icons/fa";
import Link from "next/link";
import styles from "./AdminPanel.module.css";
import Home from "../Home/Home";
import CreateProduct from "../CreateProduct/CreateProduct";
import Customers from "../Customers/Customers";
import Profile from "../Profile/Profile";

const SideBar = () => {
  const [activeComponent, setActiveComponent] = useState<string>("Home");
  const [editProductId, setEditProductId] = useState<number | null>(null);

  const handleMenuClick = (title: string) => {
    setActiveComponent(title);
    if (title === "Create Product") {
      setEditProductId(null); // Reset id when creating a new product
    }
  };

  const handleEditProduct = (id: number) => {
    setEditProductId(id);
    setActiveComponent("Create Product");
  };

  // Define components with the current editProductId for CreateProduct
  const components: Record<string, JSX.Element> = {
    Home: <Home onEdit={handleEditProduct} />,
    "Create Product": <CreateProduct id={editProductId} />,
    Customers: <Customers />,
    Profile: <Profile />,
  };

  const menuItems = [
    { title: "Home", icon: <FaHome /> },
    { title: "Create Product", icon: <FaPlus /> },
    { title: "Customers", icon: <FaUsers /> },
    { title: "Profile", icon: <FaUser /> },
  ];

  return (
    <div className={styles.admin_panel_container}>
      <div className={styles.sidebar}>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.title}
              className={`${styles.menuItem} ${
                activeComponent === item.title ? styles.active : ""
              }`}
            >
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(item.title);
                }}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.componentContainer}>
        {components[activeComponent]}
      </div>
    </div>
  );
};

export default SideBar;
