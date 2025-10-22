import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section id="hero">
        <h1>Welcome to Warm Cup Café</h1>
        <p>A minimalist coffee experience for those who savor every sip.</p>
      </section>

      <section id="featured">
        <div className="container">
          <div className="section-head">
            <h2>Featured Drinks</h2>
            <p className="muted">Our seasonal favorites</p>
          </div>
          <div className="grid">
            <div className="card">
              <img 
                src="https://perfectdailygrind.com/wp-content/uploads/2018/11/flat-white-1024x640.jpg"
                alt="Flat White"
              />
              <h3>Flat White</h3>
              <p className="muted">Velvety microfoam over rich espresso</p>
            </div>
            <div className="card">
              <img 
                src="https://www.justonecookbook.com/wp-content/uploads/2022/12/Matcha-Latte-4598-I-1-500x375.jpg"
                alt="Matcha Latte"
              />
              <h3>Matcha Latte</h3>
              <p className="muted">Creamy matcha with steamed milk</p>
            </div>
            <div className="card">
              <img 
                src="https://i2.wp.com/melscoffeetravels.com/wp-content/uploads/2023/10/IMG_1559-scaled.jpg?fit=1024%2C683&ssl=1"
                alt="Cold Brew"
              />
              <h3>Cold Brew</h3>
              <p className="muted">Smooth, bold, and refreshing</p>
            </div>
          </div>
        </div>
      </section>

      <section id="menu">
        <div className="container">
          <div className="section-head">
            <h2>Our Menu</h2>
            <p className="muted">Freshly brewed, always delightful</p>
          </div>
          <div className="grid">
            <div className="card">
              <img 
                src="https://cdn.prod.website-files.com/63e8e2c268e3264531e67ac9/651d40d207d6e4f2a8e9804f_roasters.blog.espresso.drinks.jpg"
                alt="Espresso"
              />
              <h3>Espresso</h3>
              <p className="muted">Intense and rich, served in a small cup</p>
              <p className="price">₱130</p>
              <Link to="/order" className="order-btn">Order Now</Link>
            </div>
            <div className="card">
              <img 
                src="https://www.acouplecooks.com/wp-content/uploads/2020/10/how-to-make-cappuccino-005.jpg"
                alt="Cappuccino"
              />
              <h3>Cappuccino</h3>
              <p className="muted">Perfect balance of espresso, milk, and foam</p>
              <p className="price">₱115</p>
              <Link to="/order" className="order-btn">Order Now</Link>
            </div>
            <div className="card">
              <img 
                src="https://myeverydaytable.com/wp-content/uploads/AmericanoHotandIced-3.jpg" 
                alt="Americano"
              />
              <h3>Americano</h3>
              <p className="muted">Smooth espresso diluted with hot water</p>
              <p className="price">₱120</p>
              <Link to="/order" className="order-btn">Order Now</Link>
            </div>
            <div className="card">
              <img 
                src="https://vibrantlygfree.com/wp-content/uploads/2023/07/iced-mocha-1.jpg" 
                alt="Mocha"
              />
              <h3>Mocha</h3>
              <p className="muted">Chocolate-infused espresso with steamed milk</p>
              <p className="price">₱70</p>
              <Link to="/order" className="order-btn">Order Now</Link>
            </div>
            <div className="card">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCC9mkH4WFv2bs6fBogqb1jT8Y9ywKWUFHQ&s"
                alt="Latte"
              />
              <h3>Latte</h3>
              <p className="muted">Smooth espresso with a creamy milk layer</p>
              <p className="price">₱80</p>
              <Link to="/order" className="order-btn">Order Now</Link>
            </div>
            <div className="card">
              <img 
                src="https://dinnerthendessert.com/wp-content/uploads/2023/10/Caramel-Macchiato-10.jpg"
                alt="Caramel Macchiato"
              />
              <h3>Caramel Macchiato</h3>
              <p className="muted">Espresso layered with milk and caramel drizzle</p>
              <p className="price">₱150</p>
              <Link to="/order" className="order-btn">Order Now</Link>
            </div>
            <div className="card">
              <img 
                src="https://frostingandfettuccine.com/wp-content/uploads/2022/12/Caramel-Iced-Coffee-6.jpg"
                alt="Iced Coffee"
              />
              <h3>Iced Coffee</h3>
              <p className="muted">Chilled coffee served over ice for refreshment</p>
              <p className="price">₱100</p>
              <Link to="/order" className="order-btn">Order Now</Link>
            </div>
            <div className="card">
              <img 
                src="https://markieskitchen.com/wp-content/uploads/2023/06/hazelnut-iced-coffee-1.jpg"
                alt="Hazelnut Coffee"
              />
              <h3>Hazelnut Coffee</h3>
              <p className="muted">Nutty and aromatic, perfect for cozy moments</p>
              <p className="price">₱199</p>
              <Link to="/order" className="order-btn">Order Now</Link>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/menu" className="cta">View All Menu</Link>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="section-head">
            <h2>About Us</h2>
          </div>
          <p>At Warm Cup Café, we believe in simplicity. Our space is designed
            to help you relax and enjoy coffee without distractions. Every cup is
            brewed with care, using only the finest beans.</p>
        </div>
      </section>

      <section id="visit">
        <div className="container">
          <div className="section-head">
            <h2>Visit Us</h2>
          </div>
          <p>123 Coffee Lane, Cabuyao City</p>
          <p>Open daily: 7 AM – 9 PM</p>
          <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.580639779757!2d121.1277775!3d14.2752779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd630d3356d697%3A0xf557621baa9b52b4!2sCabuyao%2C%20Laguna!5e0!3m2!1sen!2sph!4v1723555555555!5m2!1sen!2sph"
              width="100%" 
              height="350" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Cafe Location"
            ></iframe>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p className="muted">© {new Date().getFullYear()} Warm Cup Café Coffee Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
