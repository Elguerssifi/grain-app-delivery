"use client"
import Container from "../Container/container";
import styles from "./About.module.css"

const images_1 = [
  {
    src : "/Assets/about_img_1.jpg",
    alt : "Farme Image"
  },
  {
    src : "/Assets/about_img_2.jpg",
    alt : "Grain Image"
  }
]
const images_2 = [
  {
    src : "/Assets/about_img_3.jpg",
    alt : "Farme Image"
  },
  {
    src : "/Assets/img_2.jpg",
    alt : "Grain Image"
  },
]
const About = () => {
  return ( 
    <section className={styles.about} id="About">
      <Container>
        <div className={styles.row}>
          <div className={styles.images_area}>   
            <div className={styles.image_container_1}>
              {images_1.map((img,index) => (
                  <img 
                    key={index}
                    src={img.src}
                    alt={img.alt}
                  />
                ))}
              </div>
            <div className={styles.image_container_2}>
              {images_2.map((img,index) => (
                  <img 
                    key={index}
                    src={img.src}
                    alt={img.alt}
                  />
                ))}
            </div>
          </div>
          <div className={styles.description_area}>
            <div className={styles.about_title}>
              <h3>About Us</h3>
              <h5>Brand Name</h5>
            </div>
            <div className={styles.description_brand}>
              <p>Si Ahmed Corp takes pride in offering premium quality products under the Si Ahmed brand in the Agricultural-Commodities sector. We are continuously expanding our global network, sourcing top-quality commodities from Canada, the US, and Russia on a regular basis.</p>
              <p>We ensure peace of mind by arranging independent inspection, verification, testing, and certification before dispatching shipments. This rigorous process eliminates the risk and concern of not receiving the expected shipment.</p>
              <p>Whether you need Supplier/Buyer Identification, Purchasing, Brokerage Services, Contracting and Consulting, Shipping, Warehousing, or Delivery, Si Ahmed Corp is here to assist you.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
   );
}
 
export default About;