import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Intense and rich, served in a small cup',
      price: 130,
      image: 'https://cdn.prod.website-files.com/63e8e2c268e3264531e67ac9/651d40d207d6e4f2a8e9804f_roasters.blog.espresso.drinks.jpg'
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Perfect balance of espresso, milk, and foam',
      price: 115,
      image: 'https://www.acouplecooks.com/wp-content/uploads/2020/10/how-to-make-cappuccino-005.jpg'
    },
    {
      id: 3,
      name: 'Americano',
      description: 'Smooth espresso diluted with hot water',
      price: 120,
      image: 'https://myeverydaytable.com/wp-content/uploads/AmericanoHotandIced-3.jpg'
    },
    {
      id: 4,
      name: 'Mocha',
      description: 'Chocolate-infused espresso with steamed milk',
      price: 70,
      image: 'https://vibrantlygfree.com/wp-content/uploads/2023/07/iced-mocha-1.jpg'
    },
    {
      id: 5,
      name: 'Latte',
      description: 'Smooth espresso with a creamy milk layer',
      price: 80,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxCC9mkH4WFv2bs6fBogqb1jT8Y9ywKWUFHQ&s'
    },
    {
      id: 6,
      name: 'Caramel Macchiato',
      description: 'Espresso layered with milk and caramel drizzle',
      price: 150,
      image: 'https://dinnerthendessert.com/wp-content/uploads/2023/10/Caramel-Macchiato-10.jpg'
    },
    {
      id: 7,
      name: 'Iced Coffee',
      description: 'Chilled coffee served over ice for refreshment',
      price: 100,
      image: 'https://frostingandfettuccine.com/wp-content/uploads/2022/12/Caramel-Iced-Coffee-6.jpg'
    },
    {
      id: 8,
      name: 'Hazelnut Coffee',
      description: 'Nutty and aromatic, perfect for cozy moments',
      price: 199,
      image: 'https://markieskitchen.com/wp-content/uploads/2023/06/hazelnut-iced-coffee-1.jpg'
    },
    {
      id: 9,
      name: 'Flat White',
      description: 'Velvety microfoam over rich espresso',
      price: 140,
      image: 'https://perfectdailygrind.com/wp-content/uploads/2018/11/flat-white-1024x640.jpg'
    },
    {
      id: 10,
      name: 'Matcha Latte',
      description: 'Creamy matcha with steamed milk',
      price: 160,
      image: 'https://www.justonecookbook.com/wp-content/uploads/2022/12/Matcha-Latte-4598-I-1-500x375.jpg'
    },
    {
      id: 11,
      name: 'Cold Brew',
      description: 'Smooth, bold, and refreshing',
      price: 120,
      image: 'https://i2.wp.com/melscoffeetravels.com/wp-content/uploads/2023/10/IMG_1559-scaled.jpg?fit=1024%2C683&ssl=1'
    },
    {
      id: 12,
      name: 'Affogato',
      description: 'Espresso poured over vanilla ice cream',
      price: 180,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'
    }
  ];

  return (
    <div className="container">
      <section style={{ paddingTop: '80px' }}>
        <div className="section-head">
          <h2>Our Full Menu</h2>
          <p className="muted">Freshly brewed, always delightful</p>
        </div>
        
        <div className="grid">
          {menuItems.map(item => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="muted">{item.description}</p>
              <p className="price">₱{item.price}</p>
              <Link to="/order" className="order-btn">Order Now</Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="/" className="cta">← Back to Home</Link>
        </div>
      </section>
    </div>
  );
};

export default Menu;
