import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/theme.css';

const RulesPage = () => {
  const [language, setLanguage] = useState('english'); // 'english' or 'tamil'
  
  return (
    <div className="tn-rules-page">
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
          
          <h1 className="tn-rules-title">
            {language === 'english' ? 'Tamil Nadu Election Rules' : 'தமிழ்நாடு தேர்தல் விதிகள்'}
            <span className="tn-rules-subtitle">
              {language === 'english' ? 'Guidelines for fair and secure voting' : 'நியாயமான மற்றும் பாதுகாப்பான வாக்களிப்புக்கான வழிகாட்டுதல்கள்'}
            </span>
          </h1>
        </div>
        
        {/* Rules Content */}
        <div className="tn-rules-content tn-card">
          <div className="tn-card-header">
            {language === 'english' ? 'Election Voting Rules' : 'தேர்தல் வாக்களிப்பு விதிகள்'}
          </div>
          
          <div className="tn-card-body">
            <h2 className="tn-section-title">
              {language === 'english' ? 'Eligibility' : 'தகுதி'}
            </h2>
            
            <ul className="tn-rules-list">
              <li className="tn-rule-item">
                <div className="tn-rule-icon">1</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Age Requirement' : 'வயது தேவை'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'You must be at least 18 years of age on the qualifying date.' 
                      : 'தகுதித் தேதியன்று நீங்கள் குறைந்தபட்சம் 18 வயது நிரம்பியவராக இருக்க வேண்டும்.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">2</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Voter ID' : 'வாக்காளர் அடையாள அட்டை'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'You must have a valid Voter ID card issued by the Election Commission.' 
                      : 'தேர்தல் ஆணையத்தால் வழங்கப்பட்ட செல்லுபடியாகும் வாக்காளர் அடையாள அட்டையை நீங்கள் கொண்டிருக்க வேண்டும்.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">3</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Constituency Registration' : 'தொகுதி பதிவு'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'You must be registered in the electoral roll of the constituency where you intend to vote.' 
                      : 'நீங்கள் வாக்களிக்க உத்தேசித்துள்ள தொகுதியின் வாக்காளர் பட்டியலில் நீங்கள் பதிவு செய்யப்பட்டிருக்க வேண்டும்.'}
                  </p>
                </div>
              </li>
            </ul>
            
            <h2 className="tn-section-title">
              {language === 'english' ? 'Voting Process' : 'வாக்களிப்பு செயல்முறை'}
            </h2>
            
            <ul className="tn-rules-list">
              <li className="tn-rule-item">
                <div className="tn-rule-icon">1</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Authentication' : 'அங்கீகாரம்'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Login with your Voter ID and Aadhaar for two-factor authentication.' 
                      : 'இரண்டு-காரணி அங்கீகாரத்திற்காக உங்கள் வாக்காளர் அடையாள அட்டை மற்றும் ஆதாருடன் உள்நுழையவும்.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">2</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Constituency Selection' : 'தொகுதி தேர்வு'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Select your registered constituency from the dropdown menu.' 
                      : 'கீழ்தோன்றும் மெனுவிலிருந்து உங்களுடைய பதிவுசெய்யப்பட்ட தொகுதியைத் தேர்ந்தெடுக்கவும்.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">3</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Candidate Selection' : 'வேட்பாளர் தேர்வு'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Choose one candidate by clicking on the VOTE button next to their profile.' 
                      : 'அவர்களின் சுயவிவரத்தின் அருகே உள்ள வாக்கு பொத்தானைக் கிளிக் செய்வதன் மூலம் ஒரு வேட்பாளரைத் தேர்ந்தெடுக்கவும்.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">4</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Verification' : 'சரிபார்ப்பு'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Confirm your selection in the confirmation modal.' 
                      : 'உறுதிப்படுத்தல் மாடலில் உங்கள் தேர்வை உறுதிப்படுத்தவும்.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">5</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Receipt' : 'ரசீது'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'After successful voting, you will receive a digital receipt with a unique transaction ID.' 
                      : 'வெற்றிகரமான வாக்களிப்புக்குப் பிறகு, தனித்துவமான பரிவர்த்தனை ஐடியுடன் ஒரு டிஜிட்டல் ரசீதைப் பெறுவீர்கள்.'}
                  </p>
                </div>
              </li>
            </ul>
            
            <h2 className="tn-section-title">
              {language === 'english' ? 'Security Measures' : 'பாதுகாப்பு நடவடிக்கைகள்'}
            </h2>
            
            <ul className="tn-rules-list">
              <li className="tn-rule-item">
                <div className="tn-rule-icon">1</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Encryption' : 'மறையாக்கம்'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'All votes are encrypted end-to-end to ensure confidentiality.' 
                      : 'இரகசியத்தன்மையை உறுதி செய்ய அனைத்து வாக்குகளும் முழுவதும் மறைகுறியாக்கப்படுகின்றன.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">2</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Blockchain Technology' : 'பிளாக்செயின் தொழில்நுட்பம்'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Votes are stored on a secure blockchain ledger that prevents tampering.' 
                      : 'வாக்குகள் சீர்குலைப்பைத் தடுக்கும் பாதுகாப்பான பிளாக்செயின் லெட்ஜரில் சேமிக்கப்படுகின்றன.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">3</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Anonymity' : 'அநாமதேயம்'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Your identity is separated from your vote to maintain the secrecy of the ballot.' 
                      : 'வாக்குச்சீட்டின் ரகசியத்தன்மையைப் பேண உங்கள் அடையாளம் உங்கள் வாக்கிலிருந்து பிரிக்கப்படுகிறது.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">4</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Audit Trail' : 'தணிக்கை தடம்'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'A verifiable audit trail ensures the integrity of the voting process.' 
                      : 'சரிபார்க்கக்கூடிய தணிக்கைத் தடம் வாக்களிப்பு செயல்முறையின் நேர்மையை உறுதிசெய்கிறது.'}
                  </p>
                </div>
              </li>
            </ul>
            
            <h2 className="tn-section-title">
              {language === 'english' ? 'Prohibited Activities' : 'தடைசெய்யப்பட்ட செயல்பாடுகள்'}
            </h2>
            
            <ul className="tn-rules-list">
              <li className="tn-rule-item">
                <div className="tn-rule-icon">1</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Multiple Voting' : 'பல வாக்களிப்பு'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Attempting to vote more than once is strictly prohibited and will result in legal action.' 
                      : 'ஒன்றுக்கு மேற்பட்ட முறை வாக்களிக்க முயற்சிப்பது கண்டிப்பாக தடைசெய்யப்பட்டுள்ளது மற்றும் சட்ட நடவடிக்கையில் முடியும்.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">2</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Impersonation' : 'மாறுவேடம்'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Voting on behalf of another person is a criminal offense.' 
                      : 'மற்றொரு நபரின் சார்பாக வாக்களிப்பது ஒரு குற்றவியல் குற்றமாகும்.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">3</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Hacking Attempts' : 'ஹேக்கிங் முயற்சிகள்'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Any attempt to compromise the voting system will be prosecuted to the fullest extent of the law.' 
                      : 'வாக்களிப்பு அமைப்பை சீர்குலைக்க முயற்சிப்பது சட்டத்தின் முழு அளவிற்கும் வழக்குத் தொடரப்படும்.'}
                  </p>
                </div>
              </li>
              <li className="tn-rule-item">
                <div className="tn-rule-icon">4</div>
                <div className="tn-rule-content">
                  <h3>{language === 'english' ? 'Vote Buying/Selling' : 'வாக்கு வாங்குதல்/விற்றல்'}</h3>
                  <p>
                    {language === 'english' 
                      ? 'Buying or selling votes is illegal and undermines democratic principles.' 
                      : 'வாக்குகளை வாங்குதல் அல்லது விற்பது சட்டவிரோதமானது மற்றும் ஜனநாயக கொள்கைகளை குறைக்கிறது.'}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Back to Voting */}
        <div className="tn-more-info">
          <Link to="/tn-vote" className="tn-btn tn-btn-primary">
            {language === 'english' ? 'Back to Voting' : 'வாக்களிப்புக்குத் திரும்பு'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RulesPage; 