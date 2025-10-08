import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'why-travel', 'journeys', 'included', 'guides']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h2>Spanish Wine Camps</h2>
          </div>
          <ul className="nav-menu">
            <li><a href="#hero" onClick={() => scrollToSection('hero')} className={activeSection === 'hero' ? 'active' : ''}>Home</a></li>
            <li><a href="#why-travel" onClick={() => scrollToSection('why-travel')} className={activeSection === 'why-travel' ? 'active' : ''}>Why Travel</a></li>
            <li><a href="#journeys" onClick={() => scrollToSection('journeys')} className={activeSection === 'journeys' ? 'active' : ''}>Journeys</a></li>
            <li><a href="#included" onClick={() => scrollToSection('included')} className={activeSection === 'included' ? 'active' : ''}>What's Included</a></li>
            <li><a href="#guides" onClick={() => scrollToSection('guides')} className={activeSection === 'guides' ? 'active' : ''}>Guides</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>Spanish Wine Camps</h1>
          <h2>Catalunya Natural Revolution</h2>
          <div className="hero-text">
            <p>Journey alongside <strong>vignerons</strong>, cellar masters, and the singular new voices of Spanish winemaking for the deepest exploration of unparalleled terroirs.</p>
            <p>Created with professional rigor and unparalleled access, Spanish Wine Camps moves beyond the classical tourist route, bringing small, intimate groups together to discover Spain through its most <strong>defiant and delicious wines</strong>.</p>
            <p>We don't just visit vineyards; we work the land, taste from barrels deep within the <em>bodegas</em>, and sit at the kitchen tables of the families rewriting the rules of Spanish viticulture, from the granite slopes of Gredos to the salt-laced fog of the Atlantic coast.</p>
            <p className="cta-text">These are intimate, ethical, intense, and unlike any other wine experience of their kind. <strong>Space is limited.</strong></p>
          </div>
          <button className="cta-button" onClick={() => scrollToSection('journeys')}>
            Discover Our Journeys
          </button>
        </div>
        <div className="hero-image">
          <div className="placeholder-image">
            <span>Vineyard Landscape</span>
          </div>
        </div>
      </section>

      {/* Why Travel Deeper Section */}
      <section id="why-travel" className="why-travel">
        <div className="container">
          <h2>Why Travel Deeper</h2>
          <p className="section-intro">Every wine has a story. We bring you the hand-picked vineyard and their winemakers, the hidden cellars, and the dramatic landscapes. Our voyages are:</p>
          
          <div className="features-grid">
            <div className="feature">
              <h3>Boutique & Intimate</h3>
              <p>Only small groups, never more than 12 guests.</p>
            </div>
            <div className="feature">
              <h3>Authentic & Immersive</h3>
              <p>From vine to bottle, full access to producers, solo barrel rooms, tastings not open to the general public.</p>
            </div>
            <div className="feature">
              <h3>Story-led Travel</h3>
              <p>Learned guides, regional experts, winemaking families, tasting traditions passed down generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Journeys Section */}
      <section id="journeys" className="journeys">
        <div className="container">
          <h2>Upcoming Journeys</h2>
          
          <div className="journey-card">
            <div className="journey-header">
              <h3>The Penedés Rebellion</h3>
              <p className="journey-subtitle">Catalonia's Heartland | <em>The New Guard and the Resurrection of Xarel·lo</em></p>
            </div>
            
            <div className="journey-content">
              <div className="journey-text">
                <p>This is not the Penedés of industrial giants; this is a journey into the heart of a <strong>Rebellion</strong>. We travel alongside Nuria Renom, a second-generation <em>vigneron</em> who has turned her back on the established norms of Cava and Penedés DOs to embrace ancestral methods and radical minimal intervention.</p>
                
                <p>This weekend is an intimate exploration of the revolutionary shift toward still wines and <em>Mètode Ancestral</em> sparklers, centered entirely on the often-misunderstood <strong>Xarel·lo</strong> grape.</p>
                
                <p>We'll spend two days on the chalky, sun-drenched slopes, learning to read the subtle signals of the Mediterranean-influenced terroir. The access here is absolute: from visiting the region's most interesting producers to a deep-dive tasting session in her subterranean cellar focusing on <strong>skin-contact wines</strong> and the pure, unfiltered essence of her single-parcel cuvées.</p>
                
                <p>Discover the <strong>authenticity and fierce independence</strong> of a generation reclaiming their landscape, one biodynamic vine at a time. It's a taste of the future, delivered with the grit of the past.</p>
              </div>
              
              <div className="journey-details">
                <div className="guide-info">
                  <h4>Local Guide</h4>
                  <p><strong>Nuria Renom</strong><br/>
                  <em>Rebel Vigneron, Natural Wine Architect</em></p>
                </div>
                
                <div className="experience-info">
                  <h4>The Experience</h4>
                  <p>Exclusive tasting of <strong>different Penedès</strong> served alongside with Catalan-Italian fusion cuisine by Partida Creus deep within the vineyard.</p>
                </div>
                
                <div className="itinerary">
                  <h4>Itinerary</h4>
                  <div className="day">
                    <strong>Day 1:</strong> Joan Ribó, Nuria Renom, Amós Bañeras and Partida Creus
                  </div>
                  <div className="day">
                    <strong>Day 2:</strong> Bodegas más de Burbujas tipo Corpinnat y Ancestrales
                  </div>
                  <div className="day">
                    <strong>Day 3:</strong> Clos Lentiscus, Mas Candí, Ton Rimbau, Recaredo and Esteve Gisbert
                  </div>
                </div>
              </div>
            </div>
            
            <div className="journey-map">
              <div className="placeholder-map">
                <span>Penedés Region Map</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section id="included" className="included">
        <div className="container">
          <h2>What's Included</h2>
          <div className="included-grid">
            <div className="included-item">
              <h3>Accommodation</h3>
              <p>Hotels (casa rural, etc)</p>
            </div>
            <div className="included-item">
              <h3>All Meals</h3>
              <p>Including dinners paired with local wines (comidas o cenas también en gastronómicos en línea con el perfil de las bodegas)</p>
            </div>
            <div className="included-item">
              <h3>Guided Tours</h3>
              <p>Vineyards, cellars, barrel rooms</p>
            </div>
            <div className="included-item">
              <h3>Private Tastings</h3>
              <p>Masterclasses with local winemakers / sommeliers</p>
            </div>
            <div className="included-item">
              <h3>Transportation</h3>
              <p>During the journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Guides & Hosts Section */}
      <section id="guides" className="guides">
        <div className="container">
          <h2>Our Guides & Hosts</h2>
          <p className="section-intro">Meet the people who make the stories possible.</p>
          
          <div className="guides-grid">
            <div className="guide-category">
              <h3>Local Viticulturists & Winemakers</h3>
              <p>People who live the soil; from Rioja's old vine keepers to innovators in Catalunya.</p>
            </div>
            <div className="guide-category">
              <h3>Sommelier Storytellers</h3>
              <p>Helping you taste, understand, and remember every bottle.</p>
            </div>
            <div className="guide-category">
              <h3>Cultural Anchors</h3>
              <p>Historians, chefs, elder locals who share food, music, lore, and each region's unique identity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Spanish Wine Camps</h3>
              <p>Catalunya Natural Revolution</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Space is limited. Scroll to learn more.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Spanish Wine Camps. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
