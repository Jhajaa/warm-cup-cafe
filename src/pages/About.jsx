import React from 'react';

const About = () => {
  return (
    <div className="container">
      <section style={{ paddingTop: '80px' }}>
        <div className="section-head">
          <h2>About Warm Cup Café</h2>
        </div>
        
        <div className="grid" style={{ marginTop: '40px' }}>
          <div className="card">
            <h3>Our Story</h3>
            <p>Founded in 2020, Warm Cup Café began as a small dream to create a space where coffee lovers could enjoy exceptional brews in a minimalist, distraction-free environment. We believe that great coffee should be simple, pure, and savored.</p>
          </div>
          
          <div className="card">
            <h3>Our Mission</h3>
            <p>To provide the finest coffee experience through carefully sourced beans, expert brewing techniques, and a welcoming atmosphere that encourages relaxation and connection.</p>
          </div>
          
          <div className="card">
            <h3>Our Values</h3>
            <p>Quality, simplicity, sustainability, and community. We source our beans ethically, minimize waste, and create a space where everyone feels welcome.</p>
          </div>
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <h3>Meet Our Team</h3>
          <p className="muted">Passionate coffee professionals dedicated to your perfect cup</p>
          
          <div className="grid" style={{ marginTop: '30px' }}>
            <div className="card">
              <h4>Maria Santos</h4>
              <p className="muted">Head Barista</p>
              <p>With 8 years of experience in specialty coffee, Maria ensures every cup meets our high standards.</p>
            </div>
            
            <div className="card">
              <h4>John Cruz</h4>
              <p className="muted">Coffee Roaster</p>
              <p>John carefully roasts our beans to perfection, bringing out the unique flavors of each origin.</p>
            </div>
            
            <div className="card">
              <h4>Sarah Lee</h4>
              <p className="muted">Manager</p>
              <p>Sarah keeps our café running smoothly and ensures every customer has a great experience.</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <h3>Visit Our Café</h3>
          <p>123 Coffee Lane, Cabuyao City</p>
          <p>Open daily: 7 AM – 9 PM</p>
          <p className="muted">We'd love to welcome you to our space!</p>
        </div>
      </section>
    </div>
  );
};

export default About;
