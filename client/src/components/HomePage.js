import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/theme.css';

const HomePage = () => {
  return (
    <div className="tn-homepage">
      {/* Hero Section */}
      <section className="tn-hero tn-temple-bg">
        <div className="tn-hero-overlay"></div>
        <div className="tn-map-accent"></div>
        <div className="tn-container">
          <div className="tn-govt-logo-container">
            <img 
              src="/images/tn-govt-logo.png" 
              alt="Tamil Nadu Government" 
              className="tn-govt-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/tn-govt-logo.svg";
              }}
            />
            <div className="tn-logo-glow"></div>
          </div>
          <div className="tn-hero-content tn-fade-in">
            <h1 className="tn-hero-title">
              Welcome to Tamil Nadu Digital Voting Portal
              <span className="tn-tamil-text tn-hero-tamil">
                தமிழ்நாடு மின்னணு வாக்குப்பதிவு இணையதளம்
              </span>
            </h1>
            <p className="tn-hero-subtitle">
              Secure, Transparent, and Accessible Voting for Everyone
            </p>
            <div className="tn-hero-buttons">
              <Link to="/tn-vote" className="tn-btn tn-btn-primary tn-btn-hero">
                <span className="tn-btn-icon" aria-label="Vote ballot">Vote Now</span>
              </Link>
              <Link to="/rules" className="tn-btn tn-btn-accent2 tn-btn-hero">
                <span className="tn-btn-icon" aria-label="Rules clipboard">Voting Rules</span>
              </Link>
              <Link to="/register" className="tn-btn tn-btn-outline tn-btn-hero">
                <span className="tn-btn-icon" aria-label="Register">Register</span>
              </Link>
            </div>
          </div>
          <div className="tn-hero-image tn-fade-in">
            <div className="tn-glass tn-hero-glass">
              <img 
                src="/images/tn-voting.png" 
                alt="Electronic Voting" 
                className="tn-voting-illustration"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/tn-voting.svg";
                }}
              />
            </div>
          </div>
        </div>
        <div className="tn-hero-pattern-bottom"></div>
      </section>

      {/* Features Section */}
      <section className="tn-features tn-glass-bg">
        <div className="tn-container">
          <h2 className="tn-section-title">Why Vote with TN E-Vote?</h2>
          <div className="tn-features-grid">
            <div className="tn-feature-card tn-premium-card">
              <div className="tn-feature-icon">
                <img 
                  src="/images/icons/security.svg" 
                  alt="Security" 
                  className="tn-premium-icon"
                />
              </div>
              <h3 className="tn-feature-title">Advanced Security</h3>
              <p className="tn-feature-desc">
                Multi-layered encryption protocols safeguard your vote.
              </p>
              <div className="tn-feature-details">
                <ul className="tn-feature-list">
                  <li>Biometric verification ensures authentic identity</li>
                  <li>End-to-end encryption protects vote integrity</li>
                  <li>Blockchain technology prevents tampering</li>
                  <li>Audit trails for complete transparency</li>
                </ul>
              </div>
            </div>
            
            <div className="tn-feature-card tn-premium-card">
              <div className="tn-feature-icon">
                <img 
                  src="/images/icons/accessibility.svg" 
                  alt="Accessibility" 
                  className="tn-premium-icon"
                />
              </div>
              <h3 className="tn-feature-title">Universal Accessibility</h3>
              <p className="tn-feature-desc">
                Designed for all citizens regardless of ability or location.
              </p>
              <div className="tn-feature-details">
                <ul className="tn-feature-list">
                  <li>Tamil and English language support</li>
                  <li>Screen reader compatibility for visually impaired</li>
                  <li>Voice-assisted voting options</li>
                  <li>Mobile-optimized for rural connectivity</li>
                </ul>
              </div>
            </div>
            
            <div className="tn-feature-card tn-premium-card">
              <div className="tn-feature-icon">
                <img 
                  src="/images/icons/transparency.svg" 
                  alt="Transparency" 
                  className="tn-premium-icon"
                />
              </div>
              <h3 className="tn-feature-title">Complete Transparency</h3>
              <p className="tn-feature-desc">
                Public verification mechanisms ensure electoral integrity.
              </p>
              <div className="tn-feature-details">
                <ul className="tn-feature-list">
                  <li>Real-time voting statistics available</li>
                  <li>Voter-verified receipts provided</li>
                  <li>Open-source code for public review</li>
                  <li>Independent audit capabilities</li>
                </ul>
              </div>
            </div>
            
            <div className="tn-feature-card tn-premium-card">
              <div className="tn-feature-icon">
                <img 
                  src="/images/icons/speed.svg" 
                  alt="Speed" 
                  className="tn-premium-icon"
                />
              </div>
              <h3 className="tn-feature-title">Instant Results</h3>
              <p className="tn-feature-desc">
                Rapid counting with real-time results and analytics.
              </p>
              <div className="tn-feature-details">
                <ul className="tn-feature-list">
                  <li>Instant vote tabulation and counting</li>
                  <li>District-wise result visualization</li>
                  <li>Trend analysis and projections</li>
                  <li>Historical comparison with past elections</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="tn-info-section">
        <div className="tn-container">
          <div className="tn-info-grid">
            <div className="tn-info-content">
              <h2 className="tn-info-title">How to Vote</h2>
              <ul className="tn-steps-list">
                <li className="tn-step">
                  <div className="tn-step-number">1</div>
                  <div className="tn-step-content">
                    <h4>Register on the platform</h4>
                    <p>Create an account with your voter ID and personal details.</p>
                  </div>
                </li>
                <li className="tn-step">
                  <div className="tn-step-number">2</div>
                  <div className="tn-step-content">
                    <h4>Verify your identity</h4>
                    <p>Complete the verification process with your biometric data.</p>
                  </div>
                </li>
                <li className="tn-step">
                  <div className="tn-step-number">3</div>
                  <div className="tn-step-content">
                    <h4>Cast your vote</h4>
                    <p>Access the voting dashboard and select your preferred candidate.</p>
                  </div>
                </li>
                <li className="tn-step">
                  <div className="tn-step-number">4</div>
                  <div className="tn-step-content">
                    <h4>Confirm and submit</h4>
                    <p>Review your selection, confirm, and receive your voting receipt.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="tn-info-image">
              <img 
                src="/images/tn-vote-process.png" 
                alt="Voting Process" 
                className="tn-process-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/tn-vote-process.svg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="tn-faq-section">
        <div className="tn-container">
          <h2 className="tn-section-title">Frequently Asked Questions</h2>
          <div className="tn-faq-grid">
            <div className="tn-faq-item">
              <h3 className="tn-faq-question">Is online voting secure?</h3>
              <p className="tn-faq-answer">
                Yes, our platform uses multi-layered security including end-to-end encryption, blockchain technology, and biometric verification to ensure your vote is secure and tamper-proof.
              </p>
            </div>
            <div className="tn-faq-item">
              <h3 className="tn-faq-question">What documents do I need to register?</h3>
              <p className="tn-faq-answer">
                You'll need your Voter ID, Aadhaar card, and a valid phone number for OTP verification during the registration process.
              </p>
            </div>
            <div className="tn-faq-item">
              <h3 className="tn-faq-question">Can I vote from anywhere?</h3>
              <p className="tn-faq-answer">
                Yes, you can cast your vote from anywhere with an internet connection, making it convenient for citizens who are away from their registered constituencies.
              </p>
            </div>
            <div className="tn-faq-item">
              <h3 className="tn-faq-question">How can I verify my vote was counted?</h3>
              <p className="tn-faq-answer">
                After voting, you'll receive a unique receipt code that you can use to verify your vote was recorded correctly in the final tally, without revealing who you voted for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tn-cta-section">
        <div className="tn-container">
          <div className="tn-cta-content">
            <h2 className="tn-cta-title">Ready to Make Your Voice Heard?</h2>
            <p className="tn-cta-subtitle">Join millions of Tamil Nadu citizens in shaping our future through secure digital voting.</p>
            <div className="tn-cta-buttons">
              <Link to="/register" className="tn-btn tn-btn-primary tn-btn-lg">
                Register Now
              </Link>
              <Link to="/rules" className="tn-btn tn-btn-outline tn-btn-lg tn-btn-light">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
