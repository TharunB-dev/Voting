import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/theme.css';
import '../styles/premium-voting.css';

const VotingDashboard = ({ auth, history }) => {
  const [language, setLanguage] = useState('english'); // 'english' or 'tamil'
  const [selectedConstituency, setSelectedConstituency] = useState('Chennai South');
  const [isLoading, setIsLoading] = useState(true);
  const [voteSuccess, setVoteSuccess] = useState(false);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const constituencies = [
    'Chennai South',
    'Chennai North',
    'Chennai Central',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Tirunelveli',
    'Vellore',
    'Kancheepuram'
  ];
  
  // Tamil labels for constituencies
  const tamilConstituencies = {
    'Chennai South': 'சென்னை தெற்கு',
    'Chennai North': 'சென்னை வடக்கு',
    'Chennai Central': 'சென்னை மத்திய',
    'Coimbatore': 'கோயம்புத்தூர்',
    'Madurai': 'மதுரை',
    'Tiruchirappalli': 'திருச்சிராப்பள்ளி',
    'Salem': 'சேலம்',
    'Tirunelveli': 'திருநெல்வேலி',
    'Vellore': 'வேலூர்',
    'Kancheepuram': 'காஞ்சிபுரம்'
  };
  
  // Candidate data
  const candidates = [
    {
      id: 1,
      name: 'M.K. Stalin',
      tamilName: 'மு.க. ஸ்டாலின்',
      photo: '/images/candidates/stalin.png',
      party: 'DMK',
      partyFull: 'Dravida Munnetra Kazhagam',
      partyTamil: 'திராவிட முன்னேற்றக் கழகம்',
      symbol: '/images/symbols/dmk.png',
      constituency: 'Chennai South',
      description: 'Current Chief Minister of Tamil Nadu and President of the DMK party.'
    },
    {
      id: 2,
      name: 'Edappadi K. Palaniswami',
      tamilName: 'எடப்பாடி கே. பழனிசாமி',
      photo: '/images/candidates/eps.png',
      party: 'ADMK',
      partyFull: 'All India Anna Dravida Munnetra Kazhagam',
      partyTamil: 'அனைத்திந்திய அண்ணா திராவிட முன்னேற்றக் கழகம்',
      symbol: '/images/symbols/admk.png',
      constituency: 'Chennai South',
      description: 'Former Chief Minister of Tamil Nadu and Joint Coordinator of the ADMK party.'
    },
    {
      id: 3,
      name: 'Seeman',
      tamilName: 'சீமான்',
      photo: '/images/candidates/seeman.png',
      party: 'NTK',
      partyFull: 'Naam Tamilar Katchi',
      partyTamil: 'நாம் தமிழர் கட்சி',
      symbol: '/images/symbols/ntk.png',
      constituency: 'Chennai South',
      description: 'Chief Coordinator of the Naam Tamilar Katchi, a Tamil nationalist party.'
    },
    {
      id: 4,
      name: 'K. Annamalai',
      tamilName: 'கே. அண்ணாமலை',
      photo: '/images/candidates/annamalai.png',
      party: 'BJP',
      partyFull: 'Bharatiya Janata Party',
      partyTamil: 'பாரதிய ஜனதா கட்சி',
      symbol: '/images/symbols/bjp.png',
      constituency: 'Chennai South',
      description: 'Tamil Nadu BJP State President and former IPS officer.'
    },
    {
      id: 5,
      name: 'Actor Vijay',
      tamilName: 'நடிகர் விஜய்',
      photo: '/images/candidates/vijay-actual.png',
      party: 'TVK',
      partyFull: 'Tamilaga Vettri Kazhagam',
      partyTamil: 'தமிழக வெற்றி கழகம்',
      symbol: '/images/symbols/tvk-new.png',
      constituency: 'Chennai South',
      description: 'Popular Tamil actor and founder of the newly formed Tamilaga Vettri Kazhagam party.'
    }
  ];
  
  // Filter candidates by selected constituency
  const filteredCandidates = candidates.filter(
    candidate => candidate.constituency === selectedConstituency
  );
  
  // Vote confirmation modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };
  
  const confirmVote = () => {
    // Here you would connect to backend to submit the vote
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(false);
      setVoteSuccess(true);
      
      // Hide success message after a delay
      setTimeout(() => {
        setVoteSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="premium-loading-overlay">
      <div className="premium-spinner">
        <div className="premium-spinner-inner"></div>
      </div>
      <p>{language === 'english' ? 'Loading...' : 'ஏற்றுகிறது...'}</p>
    </div>
  );
  
  // Vote success component
  const VoteSuccessMessage = () => (
    <div className="premium-success-message">
      <div className="premium-success-icon">✓</div>
      <h3>{language === 'english' ? 'Vote Cast Successfully!' : 'வாக்கு வெற்றிகரமாக பதிவாகியுள்ளது!'}</h3>
      <p>{language === 'english' ? 'Your vote has been recorded securely.' : 'உங்கள் வாக்கு பாதுகாப்பாக பதிவு செய்யப்பட்டுள்ளது.'}</p>
    </div>
  );
  
  // Check if user is authenticated
  if (!auth || !auth.isAuthenticated) {
    return (
      <div className="tn-voting-dashboard">
        {isLoading && <LoadingOverlay />}
        
        {/* Language Toggle */}
        <div className="tn-language-toggle">
          <div 
            className={`tn-language-option ${language === 'english' ? 'active' : ''}`}
            onClick={() => setLanguage('english')}
          >
            English
          </div>
          <div 
            className={`tn-language-option ${language === 'tamil' ? 'active' : ''}`}
            onClick={() => setLanguage('tamil')}
          >
            தமிழ்
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="tn-kolam-bg"></div>
        
        <div className="tn-container">
          <div className="tn-voting-header">
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
            </div>
            
            <h1 className="tn-voting-title">
              {language === 'english' ? 'Tamil Nadu State Election' : 'தமிழ்நாடு மாநில தேர்தல்'}
              <span className="tn-voting-subtitle">
                {language === 'english' ? 'Authentication Required' : 'அங்கீகாரம் தேவை'}
              </span>
            </h1>
          </div>
          
          <div className="tn-alert tn-alert-warning">
            <h3>{language === 'english' ? 'Please Login to Vote' : 'வாக்களிக்க உள்நுழையவும்'}</h3>
            <p>
              {language === 'english' 
                ? 'You must be logged in to cast your vote. Please login or register to continue.' 
                : 'நீங்கள் வாக்களிக்க உள்நுழைந்திருக்க வேண்டும். தொடர உள்நுழையவும் அல்லது பதிவு செய்யவும்.'}
            </p>
            <div className="tn-alert-actions">
              <button 
                className="tn-btn tn-btn-primary"
                onClick={() => history.push('/login')}
              >
                {language === 'english' ? 'Login' : 'உள்நுழைய'}
              </button>
              <button 
                className="tn-btn tn-btn-outline"
                onClick={() => history.push('/register')}
              >
                {language === 'english' ? 'Register' : 'பதிவு செய்ய'}
              </button>
            </div>
          </div>
          
          {/* Rules Link */}
          <div className="tn-more-info">
            <Link to="/rules" className="tn-btn tn-btn-outline">
              {language === 'english' ? 'View Voting Rules' : 'வாக்களிப்பு விதிகளைக் காண'}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="tn-voting-dashboard">
      {isLoading && <LoadingOverlay />}
      {voteSuccess && <VoteSuccessMessage />}
      
      {/* Language Toggle */}
      <div className="tn-language-toggle">
        <div 
          className={`tn-language-option ${language === 'english' ? 'active' : ''}`}
          onClick={() => setLanguage('english')}
        >
          English
        </div>
        <div 
          className={`tn-language-option ${language === 'tamil' ? 'active' : ''}`}
          onClick={() => setLanguage('tamil')}
        >
          தமிழ்
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="tn-kolam-bg"></div>
      
      <div className="tn-container">
        <div className="tn-voting-header">
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
          </div>
          
          <h1 className="tn-voting-title">
            {language === 'english' ? 'Tamil Nadu State Election' : 'தமிழ்நாடு மாநில தேர்தல்'}
            <span className="tn-voting-subtitle">
              {language === 'english' ? 'Cast your vote securely' : 'பாதுகாப்பாக உங்கள் வாக்கை அளிக்கவும்'}
            </span>
          </h1>
          
          <div className="tn-map-container">
            <img 
              src="/images/tn-map-outline.png" 
              alt="Tamil Nadu Map" 
              className="tn-map-outline"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/tn-map-outline.svg";
              }}
            />
          </div>
        </div>
        
        {/* Constituency Selector */}
        <div className="tn-constituency-selector">
          <label htmlFor="constituency" className="tn-form-label">
            {language === 'english' ? 'Select Your Constituency' : 'உங்கள் தொகுதியைத் தேர்ந்தெடுக்கவும்'}
          </label>
          <select
            id="constituency"
            className="tn-form-control"
            value={selectedConstituency}
            onChange={(e) => setSelectedConstituency(e.target.value)}
          >
            {constituencies.map(constituency => (
              <option key={constituency} value={constituency}>
                {language === 'english' 
                  ? constituency 
                  : tamilConstituencies[constituency] || constituency}
              </option>
            ))}
          </select>
        </div>
        
        {/* Candidate List */}
        <div className="tn-candidates-list">
          <h2 className="tn-section-title">
            {language === 'english' 
              ? `Candidates for ${selectedConstituency}` 
              : `${tamilConstituencies[selectedConstituency] || selectedConstituency} வேட்பாளர்கள்`}
          </h2>
          
          <div className="tn-candidates-grid">
            {filteredCandidates.map(candidate => (
              <div 
                key={candidate.id} 
                className={`tn-candidate-card tn-candidate-${candidate.party.toLowerCase()}`}
              >
                <div className="tn-candidate-header">
                  <div className="tn-candidate-photo-container">
                    <img 
                      src={candidate.photo} 
                      alt={candidate.name}
                      className="tn-candidate-photo"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-candidate.png";
                      }}
                    />
                  </div>
                  
                  <div className="tn-party-symbol-container">
                    <img 
                      src={candidate.symbol}
                      alt={`${candidate.party} Symbol`}
                      className="tn-party-symbol"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-symbol.png";
                      }}
                    />
                  </div>
                </div>
                
                <div className="tn-candidate-info">
                  <h3 className="tn-candidate-name">
                    {language === 'english' ? candidate.name : candidate.tamilName}
                    {language === 'english' && (
                      <span className="tn-candidate-name-tamil">{candidate.tamilName}</span>
                    )}
                  </h3>
                  
                  <div className="tn-party-details">
                    <div className="tn-party-name">
                      {language === 'english' ? candidate.partyFull : candidate.partyTamil}
                      <span className="tn-party-short">{candidate.party}</span>
                    </div>
                  </div>
                  
                  <p className="tn-candidate-description">
                    {candidate.description}
                  </p>
                </div>
                
                <div className="tn-vote-button">
                  <button 
                    className="tn-vote-btn"
                    onClick={() => handleVoteClick(candidate)}
                  >
                    {language === 'english' ? 'VOTE' : 'வாக்கு'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Vote Rules */}
        <div className="tn-voting-rules">
          <h2 className="tn-section-title">
            {language === 'english' ? 'Voting Rules' : 'வாக்களிப்பு விதிகள்'}
          </h2>
          
          <ul className="tn-rules-list">
            <li className="tn-rule-item">
              <div className="tn-rule-icon">1</div>
              <div className="tn-rule-content">
                <h3>{language === 'english' ? 'One Person, One Vote' : 'ஒரு நபர், ஒரு வாக்கு'}</h3>
                <p>
                  {language === 'english' 
                    ? 'Each registered voter is entitled to cast one vote in their constituency.' 
                    : 'ஒவ்வொரு பதிவுபெற்ற வாக்காளரும் தங்கள் தொகுதியில் ஒரு வாக்களிக்க உரிமை உண்டு.'}
                </p>
              </div>
            </li>
            <li className="tn-rule-item">
              <div className="tn-rule-icon">2</div>
              <div className="tn-rule-content">
                <h3>{language === 'english' ? 'Secure Voting' : 'பாதுகாப்பான வாக்களிப்பு'}</h3>
                <p>
                  {language === 'english' 
                    ? 'Your vote is encrypted and secure. No one can see whom you voted for.' 
                    : 'உங்கள் வாக்கு மறைகுறியாக்கப்பட்டு பாதுகாப்பாக உள்ளது. நீங்கள் யாருக்கு வாக்களித்தீர்கள் என்பதை யாரும் பார்க்க முடியாது.'}
                </p>
              </div>
            </li>
            <li className="tn-rule-item">
              <div className="tn-rule-icon">3</div>
              <div className="tn-rule-content">
                <h3>{language === 'english' ? 'Vote Verification' : 'வாக்கு சரிபார்ப்பு'}</h3>
                <p>
                  {language === 'english' 
                    ? 'You will receive a receipt of your vote that you can verify later.' 
                    : 'நீங்கள் பின்னர் சரிபார்க்கக்கூடிய உங்கள் வாக்கின் ரசீதைப் பெறுவீர்கள்.'}
                </p>
              </div>
            </li>
            <li className="tn-rule-item">
              <div className="tn-rule-icon">4</div>
              <div className="tn-rule-content">
                <h3>{language === 'english' ? 'Final Decision' : 'இறுதி முடிவு'}</h3>
                <p>
                  {language === 'english' 
                    ? 'Once cast, your vote cannot be changed or revoked.' 
                    : 'ஒருமுறை வாக்களித்தபின், உங்கள் வாக்கை மாற்றவோ ரத்து செய்யவோ முடியாது.'}
                </p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Links to more information */}
        <div className="tn-more-info">
          <Link to="/rules" className="tn-btn tn-btn-outline">
            {language === 'english' ? 'Detailed Voting Rules' : 'விரிவான வாக்களிப்பு விதிகள்'}
          </Link>
          <Link to="/results" className="tn-btn tn-btn-primary">
            {language === 'english' ? 'View Live Results' : 'நேரடி முடிவுகளைக் காண'}
          </Link>
        </div>
      </div>
      
      {/* Vote Confirmation Modal */}
      {showModal && selectedCandidate && (
        <div className="tn-modal-backdrop" onClick={closeModal}>
          <div className="tn-modal tn-glass" onClick={e => e.stopPropagation()}>
            <h2>
              {language === 'english' 
                ? 'Confirm Your Vote' 
                : 'உங்கள் வாக்கை உறுதிப்படுத்தவும்'}
            </h2>
            
            <div className="tn-vote-confirmation">
              <p>
                {language === 'english'
                  ? `You are about to vote for ${selectedCandidate.name} (${selectedCandidate.party}).`
                  : `நீங்கள் ${selectedCandidate.tamilName} (${selectedCandidate.party}) க்கு வாக்களிக்க உள்ளீர்கள்.`}
              </p>
              
              <div className="tn-confirmation-candidate">
                <img 
                  src={selectedCandidate.photo} 
                  alt={selectedCandidate.name}
                  className="tn-candidate-photo"
                  style={{width: '80px', height: '80px'}}
                />
                <img 
                  src={selectedCandidate.symbol}
                  alt={`${selectedCandidate.party} Symbol`}
                  className="tn-party-symbol"
                  style={{width: '40px', height: '40px', position: 'static', marginLeft: '10px'}}
                />
              </div>
              
              <p>
                {language === 'english'
                  ? 'This action cannot be undone. Do you want to proceed?'
                  : 'இந்த செயலை ரத்து செய்ய முடியாது. தொடர விரும்புகிறீர்களா?'}
              </p>
              
              <div className="tn-confirmation-buttons">
                <button 
                  className="tn-btn tn-btn-outline"
                  onClick={closeModal}
                  disabled={isLoading}
                >
                  {language === 'english' ? 'Cancel' : 'ரத்து செய்'}
                </button>
                <button 
                  className="tn-btn tn-btn-primary"
                  onClick={confirmVote}
                  disabled={isLoading}
                >
                  {isLoading ? 
                    (language === 'english' ? 'Processing...' : 'செயலாக்குகிறது...') : 
                    (language === 'english' ? 'Confirm Vote' : 'வாக்கை உறுதிசெய்')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(
  connect(
    store => ({
      auth: store.auth
    })
  )(VotingDashboard)
); 