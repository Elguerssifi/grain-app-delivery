"use client";
import Container from "../Container/container";
import Item from "./Item";
import styles from "./WhyChoosingUs.module.css";
import { FaGlobe, FaMapMarkerAlt, FaHandshake } from "react-icons/fa"; // Example icons

const content = [
  {
    icon: <FaGlobe />,
    title: "Export to the World",
    description:
      "For agricultural commodities like grains, we ensure top-notch quality by arranging independent inspection, verification, testing, and certification before dispatch. This process eliminates the risk and worry of not receiving the expected shipment.",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Import to Canada",
    description:
      "We assist our customers in entering the North American market through Canada. We guide them through the Canadian Government’s import requirements, from ensuring the goods are permitted into Canada (customs) to navigating various duties and taxes.",
  },
  {
    icon: <FaHandshake />,
    title: "Brokerage Services",
    description:
      "We identify opportunities for our customers by providing timely and accurate information. This helps minimize risk from start to finish – from purchasing commodities to arranging cost-effective shipping partners, customs liaison, and more.",
  },
];

const WhyChoosingUs = () => {
  return (
    <section className={styles.why_choosing_us}>
      <Container>
        <div className={styles.row}>
          <div className={styles.why_choosing_us_title}>
            <h3>Why Choosing Us</h3>
          </div>
          <div className={styles.items_container}>
            {content.map((item, index) => (
              <Item
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChoosingUs;
