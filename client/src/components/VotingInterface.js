import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/theme.css';

// Mock data for candidates - In a real app, this would come from an API
const MOCK_CANDIDATES = [
  {
    id: 1,
    name: 'M.K. Stalin',
    tamilName: 'மு.க. ஸ்டாலின்',
    party: 'Dravida Munnetra Kazhagam',
    partyShort: 'DMK',
    symbol: 'dmk',
    photo: '/images/candidates/stalin.png'
  },
  {
    id: 2,
    name: 'Edappadi K. Palaniswami',
    tamilName: 'எடப்பாடி கே. பழனிசாமி',
    party: 'All India Anna Dravida Munnetra Kazhagam',
    partyShort: 'ADMK',
    symbol: 'admk',
    photo: '/images/candidates/eps.png'
  },
  {
    id: 3,
    name: 'K. Annamalai',
    tamilName: 'கே. அண்ணாமலை',
    party: 'Bharatiya Janata Party',
    partyShort: 'BJP',
    symbol: 'bjp',
    photo: '/images/candidates/annamalai.png'
  },
  {
    id: 4,
    name: 'Seeman',
    tamilName: 'சீமான்',
    party: 'Naam Tamilar Katchi',
    partyShort: 'NTK',
    symbol: 'ntk',
    photo: '/images/candidates/seeman.png'
  },
  {
    id: 5,
    name: 'Actor Vijay',
    tamilName: 'நடிகர் விஜய்',
    party: 'Tamilaga Vettri Kazhagam',
    partyShort: 'TVK',
    symbol: 'tvk-new',
    photo: '/images/candidates/vijay-actual.png'
  }
];

// Party color mapping
const PARTY_COLORS = {
  'DMK': '#ff0000', // Red
  'ADMK': '#00aa55',  // Green
  'BJP': '#ff9933', // Saffron
  'NTK': '#ffcc00',   // Yellow
  'TVK': '#800080'   // Purple
};

const VotingInterface = ({ auth, history }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [constituency, setConstituency] = useState('Chennai South'); // Default for mock data
  
  // In a real app, you would fetch this from the API based on the user's constituency
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
  
  // This would be fetched from the user's profile
  useEffect(() => {
    if (auth && auth.user && auth.user.constituency) {
      setConstituency(auth.user.constituency);
      // You would also fetch candidates for this constituency here
    }
  }, [auth]);
  
  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setShowConfirmation(true);
  };
  
  const handleVoteConfirm = () => {
    setLoading(true);
    
    // Simulate API call to cast vote
    setTimeout(() => {
      setVoted(true);
      setLoading(false);
      setShowConfirmation(false);
      
      // Show success for 3 seconds before redirecting
      setTimeout(() => {
        history.push('/vote-confirmation');
      }, 3000);
    }, 1500);
  };
  
  const handleModalClose = () => {
    setShowConfirmation(false);
    setSelectedCandidate(null);
  };
  
  if (!auth.isAuthenticated) {
    return (
      <div className="tn-voting-page">
        <div className="tn-container">
          <div className="tn-alert tn-alert-warning">
            <h3>Authentication Required</h3>
            <p>You must be logged in to vote. Please login or register to continue.</p>
            <div className="tn-alert-actions">
              <button 
                className="tn-btn tn-btn-premium tn-btn-premium-primary"
                onClick={() => history.push('/login')}
              >
                <React.Fragment>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Login
                </React.Fragment>
              </button>
              <button 
                className="tn-btn tn-btn-premium tn-btn-premium-outline"
                onClick={() => history.push('/register')}
              >
                <React.Fragment>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Register
                </React.Fragment>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="tn-voting-page">
      <div className="tn-container">
        <div className="tn-voting-header">
          <h1 className="tn-voting-title">
            Cast Your Vote
            <span className="tn-tamil-text tn-voting-title-tamil">
              உங்கள் வாக்கை அளியுங்கள்
            </span>
          </h1>
          
          <div className="tn-voting-info">
            <div className="tn-voting-constituency">
              <span className="tn-info-label">Constituency:</span>
              <span className="tn-info-value">{constituency}</span>
            </div>
            <div className="tn-voting-election">
              <span className="tn-info-label">Election:</span>
              <span className="tn-info-value">Tamil Nadu Assembly Elections 2023</span>
            </div>
          </div>
        </div>
        
        {voted ? (
          <div className="tn-vote-success tn-fade-in">
            <div className="tn-success-icon">✓</div>
            <h2>Vote Cast Successfully!</h2>
            <p>Thank you for participating in the democratic process.</p>
            <p>Redirecting to confirmation page...</p>
          </div>
        ) : (
          <div className="tn-candidates-list">
            <h2 className="tn-candidates-heading">
              Select Your Candidate
              <span className="tn-tamil-text tn-candidates-heading-tamil">
                உங்கள் வேட்பாளரைத் தேர்ந்தெடுக்கவும்
              </span>
            </h2>
            
            {candidates.map(candidate => (
              <div 
                key={candidate.id} 
                className="tn-candidate-card"
                style={{
                  borderLeft: `4px solid ${PARTY_COLORS[candidate.partyShort] || '#1a3a6c'}`
                }}
              >
                <div className="tn-candidate-photo-container">
                  <img 
                    src={candidate.photo}
                    alt={candidate.name} 
                    className="tn-candidate-photo"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/default-candidate.png';
                    }}
                  />
                </div>
                
                <div className="tn-party-symbol-container">
                  <div 
                    className="tn-party-symbol"
                    style={{
                      backgroundColor: PARTY_COLORS[candidate.partyShort] || '#1a3a6c'
                    }}
                  >
                    <img 
                      src={`/images/symbols/${candidate.symbol}.png`}
                      alt={candidate.party}
                      className="tn-symbol-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-candidate.png';
                      }}
                    />
                  </div>
                </div>
                
                <div className="tn-candidate-info">
                  <h3 className="tn-candidate-name">
                    {candidate.name}
                    <span className="tn-tamil-text tn-candidate-name-tamil">
                      {candidate.tamilName}
                    </span>
                  </h3>
                  <p className="tn-party-name">{candidate.party}</p>
                  <span className="tn-party-short">{candidate.partyShort}</span>
                </div>
                
                <div className="tn-vote-button">
                  <button 
                    className="tn-btn tn-btn-primary"
                    onClick={() => handleCandidateSelect(candidate)}
                  >
                    Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Confirmation Modal */}
        {showConfirmation && selectedCandidate && (
          <div className="tn-modal-backdrop">
            <div className="tn-modal tn-confirmation-modal">
              <button className="tn-modal-close" onClick={handleModalClose}>×</button>
              
              <div className="tn-confirmation-header">
                <h3>Confirm Your Vote</h3>
                <p className="tn-tamil-text">உங்கள் வாக்கை உறுதிப்படுத்தவும்</p>
              </div>
              
              <div className="tn-confirmation-content">
                <p>You are about to cast your vote for:</p>
                
                <div className="tn-candidate-preview">
                  <img 
                    src={selectedCandidate.photo}
                    alt={selectedCandidate.name} 
                    className="tn-candidate-preview-photo"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/default-candidate.png';
                    }}
                  />
                  
                  <div className="tn-candidate-preview-details">
                    <h4>{selectedCandidate.name}</h4>
                    <p>{selectedCandidate.party} ({selectedCandidate.partyShort})</p>
                  </div>
                </div>
                
                <div className="tn-confirmation-note">
                  <p>Please note: Once submitted, your vote cannot be changed.</p>
                </div>
              </div>
              
              <div className="tn-confirmation-actions">
                <button 
                  className="tn-btn tn-btn-outline"
                  onClick={handleModalClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  className="tn-btn tn-btn-primary"
                  onClick={handleVoteConfirm}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm Vote'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(
  connect(
    store => ({
      auth: store.auth
    })
  )(VotingInterface)
);

// Add this CSS to your theme.css file or create a separate voting.css
const style = document.createElement('style');
style.innerHTML = `
  .tn-voting-page {
    padding: 3rem 0;
    background-color: var(--tn-background);
  }
  
  .tn-voting-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .tn-voting-title {
    font-size: 2.25rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tn-voting-title-tamil {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    color: var(--tn-text-secondary);
  }
  
  .tn-voting-info {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }
  
  .tn-info-label {
    font-weight: 600;
    color: var(--tn-text-secondary);
    margin-right: 0.5rem;
  }
  
  .tn-info-value {
    font-weight: 600;
    color: var(--tn-primary);
  }
  
  .tn-candidates-heading {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tn-candidates-heading-tamil {
    font-size: 1.125rem;
    margin-top: 0.25rem;
    color: var(--tn-text-secondary);
  }
  
  .tn-candidates-list {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .tn-candidate-card {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .tn-candidate-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .tn-candidate-photo-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1.5rem;
    border: 3px solid white;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
  
  .tn-candidate-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .tn-party-symbol-container {
    margin-right: 1.5rem;
  }
  
  .tn-party-symbol {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
  
  .tn-symbol-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
  
  .tn-candidate-info {
    flex: 1;
  }
  
  .tn-candidate-name {
    margin: 0 0 0.5rem 0;
    display: flex;
    flex-direction: column;
  }
  
  .tn-candidate-name-tamil {
    font-size: 0.9rem;
    margin-top: 0.25rem;
    color: var(--tn-text-secondary);
  }
  
  .tn-party-name {
    margin: 0 0 0.25rem 0;
    color: var(--tn-text-secondary);
    font-weight: 500;
  }
  
  .tn-party-short {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background-color: var(--tn-background);
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .tn-vote-button {
    margin-left: 1rem;
  }
  
  /* Alert styles */
  .tn-alert {
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .tn-alert-warning {
    background-color: rgba(255, 193, 7, 0.1);
    border: 1px solid var(--tn-warning);
    color: var(--tn-text-primary);
  }
  
  .tn-alert h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .tn-alert p {
    margin-bottom: 1.5rem;
  }
  
  .tn-alert-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  /* Confirmation Modal */
  .tn-confirmation-modal {
    max-width: 500px;
  }
  
  .tn-confirmation-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .tn-confirmation-header h3 {
    margin: 0 0 0.25rem 0;
  }
  
  .tn-confirmation-header p {
    margin: 0;
    color: var(--tn-text-secondary);
  }
  
  .tn-candidate-preview {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: var(--tn-background);
    border-radius: 8px;
    margin: 1rem 0;
  }
  
  .tn-candidate-preview-photo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
  }
  
  .tn-candidate-preview-details h4 {
    margin: 0 0 0.25rem 0;
  }
  
  .tn-candidate-preview-details p {
    margin: 0;
    color: var(--tn-text-secondary);
  }
  
  .tn-confirmation-note {
    padding: 0.75rem;
    background-color: rgba(220, 53, 69, 0.1);
    border-radius: 4px;
    margin: 1rem 0;
  }
  
  .tn-confirmation-note p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--tn-danger);
  }
  
  .tn-confirmation-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  /* Success state */
  .tn-vote-success {
    text-align: center;
    padding: 3rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
  
  .tn-success-icon {
    width: 80px;
    height: 80px;
    background-color: var(--tn-success);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin: 0 auto 2rem;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .tn-candidate-card {
      flex-wrap: wrap;
    }
    
    .tn-candidate-info {
      width: 100%;
      margin: 1rem 0;
    }
    
    .tn-vote-button {
      width: 100%;
      margin-left: 0;
      margin-top: 1rem;
    }
    
    .tn-vote-button .tn-btn {
      width: 100%;
    }
    
    .tn-voting-info {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;
document.head.appendChild(style); 