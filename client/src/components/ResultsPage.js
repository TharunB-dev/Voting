import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../styles/theme.css';

// Mock data for election results
const MOCK_RESULTS = {
  totalSeats: 234,
  totalVoters: 6240000,
  votesPolled: 4420800,
  turnout: 70.85,
  parties: [
    { name: 'Tamil Nadu Democratic Alliance', short: 'TNDA', seats: 145, votes: 1724112, color: '#ff9933' },
    { name: 'Progressive Tamil Front', short: 'PTF', seats: 58, votes: 1105200, color: '#138808' },
    { name: 'Tamil People\'s Congress', short: 'TPC', seats: 20, votes: 663120, color: '#1a3a6c' },
    { name: 'Tamil Nadu Workers Party', short: 'TNWP', seats: 9, votes: 486288, color: '#b71c1c' },
    { name: 'Independent', short: 'IND', seats: 2, votes: 442080, color: '#6a1b9a' }
  ],
  constituencies: {
    'Chennai South': { winner: 'TNDA', margin: 12500 },
    'Chennai North': { winner: 'PTF', margin: 8200 },
    'Chennai Central': { winner: 'TNDA', margin: 5600 },
    'Coimbatore': { winner: 'TNDA', margin: 15800 },
    'Madurai': { winner: 'TPC', margin: 3700 },
    'Tiruchirappalli': { winner: 'TNDA', margin: 7200 },
    'Salem': { winner: 'TNDA', margin: 9400 },
    'Tirunelveli': { winner: 'PTF', margin: 4800 },
    'Vellore': { winner: 'TNWP', margin: 2100 },
    'Kancheepuram': { winner: 'TNDA', margin: 11200 }
  }
};

const ResultsPage = ({ auth }) => {
  const [results] = useState(MOCK_RESULTS);
  const [selectedConstituency, setSelectedConstituency] = useState('');
  
  // Calculate percentage for bar charts
  const getPercentage = (value, total) => {
    return ((value / total) * 100).toFixed(1);
  };
  
  return (
    <div className="tn-results-page">
      <div className="tn-container">
        <div className="tn-results-header">
          <h1 className="tn-results-title">
            Tamil Nadu Election Results
            <span className="tn-tamil-text tn-results-title-tamil">
              தமிழ்நாடு தேர்தல் முடிவுகள்
            </span>
          </h1>
          
          <div className="tn-results-summary">
            <div className="tn-results-stat">
              <span className="tn-stat-label">Total Seats</span>
              <span className="tn-stat-value">{results.totalSeats}</span>
            </div>
            <div className="tn-results-stat">
              <span className="tn-stat-label">Votes Polled</span>
              <span className="tn-stat-value">{results.votesPolled.toLocaleString()}</span>
            </div>
            <div className="tn-results-stat">
              <span className="tn-stat-label">Voter Turnout</span>
              <span className="tn-stat-value">{results.turnout}%</span>
            </div>
          </div>
        </div>
        
        <div className="tn-results-grid">
          {/* Seats Won Chart */}
          <div className="tn-results-card">
            <div className="tn-card-header">
              <h3>Seats Won</h3>
            </div>
            <div className="tn-card-body">
              <div className="tn-seats-chart">
                {results.parties.map(party => (
                  <div key={party.short} className="tn-seats-bar-container">
                    <div className="tn-party-label">
                      <span className="tn-party-short">{party.short}</span>
                      <span className="tn-seats-count">{party.seats}</span>
                    </div>
                    <div className="tn-seats-bar-wrapper">
                      <div 
                        className="tn-seats-bar" 
                        style={{
                          width: `${getPercentage(party.seats, results.totalSeats)}%`,
                          backgroundColor: party.color
                        }}
                      >
                        {getPercentage(party.seats, results.totalSeats)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="tn-legend">
                {results.parties.map(party => (
                  <div key={party.short} className="tn-legend-item">
                    <span 
                      className="tn-color-box" 
                      style={{ backgroundColor: party.color }}
                    ></span>
                    <span className="tn-legend-text">{party.name} ({party.short})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Vote Share Chart */}
          <div className="tn-results-card">
            <div className="tn-card-header">
              <h3>Vote Share</h3>
            </div>
            <div className="tn-card-body">
              <div className="tn-vote-share-chart">
                <div className="tn-vote-chart-visual">
                  {results.parties.map((party, index) => {
                    const offset = results.parties
                      .slice(0, index)
                      .reduce((acc, p) => acc + (p.votes / results.votesPolled) * 100, 0);
                    
                    return (
                      <div 
                        key={party.short}
                        className="tn-vote-segment"
                        style={{
                          backgroundColor: party.color,
                          width: `${(party.votes / results.votesPolled) * 100}%`,
                          marginLeft: index === 0 ? '0' : 'auto',
                          transform: index === 0 ? 'none' : `translateX(-${offset}%)`
                        }}
                      ></div>
                    );
                  })}
                </div>
                
                <div className="tn-vote-share-details">
                  {results.parties.map(party => (
                    <div key={party.short} className="tn-vote-share-item">
                      <div className="tn-vote-share-header">
                        <span 
                          className="tn-party-indicator" 
                          style={{ backgroundColor: party.color }}
                        ></span>
                        <span className="tn-party-name">{party.short}</span>
                      </div>
                      <div className="tn-vote-numbers">
                        <span className="tn-vote-percentage">
                          {getPercentage(party.votes, results.votesPolled)}%
                        </span>
                        <span className="tn-vote-count">
                          {party.votes.toLocaleString()} votes
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Constituency Results */}
          <div className="tn-results-card tn-constituency-results">
            <div className="tn-card-header">
              <h3>Constituency Results</h3>
            </div>
            <div className="tn-card-body">
              <div className="tn-constituency-selector">
                <label htmlFor="constituency" className="tn-form-label">Select Constituency:</label>
                <select 
                  id="constituency" 
                  className="tn-form-control"
                  value={selectedConstituency}
                  onChange={(e) => setSelectedConstituency(e.target.value)}
                >
                  <option value="">All Constituencies</option>
                  {Object.keys(results.constituencies).map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              
              <div className="tn-constituency-list">
                {Object.keys(results.constituencies)
                  .filter(name => !selectedConstituency || name === selectedConstituency)
                  .map(name => {
                    const constituency = results.constituencies[name];
                    const winningParty = results.parties.find(p => p.short === constituency.winner);
                    
                    return (
                      <div key={name} className="tn-constituency-item">
                        <div className="tn-constituency-name">
                          <h4>{name}</h4>
                        </div>
                        <div className="tn-winner-info">
                          <div 
                            className="tn-winner-indicator" 
                            style={{ backgroundColor: winningParty && winningParty.color ? winningParty.color : '#1a3a6c' }}
                          ></div>
                          <div className="tn-winner-details">
                            <span className="tn-winner-party">{constituency.winner}</span>
                            <span className="tn-winner-margin">
                              Won by {constituency.margin.toLocaleString()} votes
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  store => ({
    auth: store.auth
  })
)(ResultsPage);

// Add this CSS to your theme.css file or create a separate results.css
const style = document.createElement('style');
style.innerHTML = `
  .tn-results-page {
    padding: 3rem 0;
    background-color: var(--tn-background);
  }
  
  .tn-results-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .tn-results-title {
    font-size: 2.25rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tn-results-title-tamil {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    color: var(--tn-text-secondary);
  }
  
  .tn-results-summary {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin: 2rem 0;
  }
  
  .tn-results-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tn-stat-label {
    font-size: 1rem;
    color: var(--tn-text-secondary);
    margin-bottom: 0.5rem;
  }
  
  .tn-stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--tn-primary);
  }
  
  .tn-results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .tn-constituency-results {
    grid-column: 1 / -1;
  }
  
  .tn-results-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .tn-seats-chart, .tn-vote-share-chart {
    margin-bottom: 1.5rem;
  }
  
  .tn-seats-bar-container {
    margin-bottom: 1rem;
  }
  
  .tn-party-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .tn-party-short {
    font-weight: 600;
  }
  
  .tn-seats-count {
    font-weight: 600;
  }
  
  .tn-seats-bar-wrapper {
    width: 100%;
    height: 24px;
    background-color: #f0f0f0;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .tn-seats-bar {
    height: 100%;
    border-radius: 12px;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    transition: width 1s ease-out;
  }
  
  .tn-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  
  .tn-legend-item {
    display: flex;
    align-items: center;
  }
  
  .tn-color-box {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin-right: 0.5rem;
  }
  
  .tn-legend-text {
    font-size: 0.875rem;
  }
  
  .tn-vote-chart-visual {
    height: 40px;
    border-radius: 20px;
    display: flex;
    margin-bottom: 1.5rem;
    overflow: hidden;
    position: relative;
  }
  
  .tn-vote-segment {
    height: 100%;
    position: relative;
  }
  
  .tn-vote-share-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .tn-vote-share-item {
    padding: 0.75rem;
    border-radius: 8px;
    background-color: #f8f9fa;
  }
  
  .tn-vote-share-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .tn-party-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  
  .tn-vote-numbers {
    display: flex;
    flex-direction: column;
  }
  
  .tn-vote-percentage {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  
  .tn-vote-count {
    font-size: 0.75rem;
    color: var(--tn-text-secondary);
  }
  
  .tn-constituency-selector {
    margin-bottom: 1.5rem;
  }
  
  .tn-constituency-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .tn-constituency-item {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
    transition: transform 0.2s ease;
  }
  
  .tn-constituency-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .tn-constituency-name h4 {
    margin: 0 0 0.75rem 0;
    font-size: 1.125rem;
  }
  
  .tn-winner-info {
    display: flex;
    align-items: center;
  }
  
  .tn-winner-indicator {
    width: 16px;
    height: 40px;
    border-radius: 4px;
    margin-right: 0.75rem;
  }
  
  .tn-winner-details {
    display: flex;
    flex-direction: column;
  }
  
  .tn-winner-party {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .tn-winner-margin {
    font-size: 0.875rem;
    color: var(--tn-text-secondary);
  }
  
  @media (max-width: 768px) {
    .tn-results-summary {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .tn-vote-share-details {
      grid-template-columns: 1fr;
    }
    
    .tn-constituency-list {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(style); 