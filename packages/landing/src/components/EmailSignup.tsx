export function EmailSignup() {
  return (
    <div className="email-signup">
      {/* Beehiiv embed placeholder - replace with your actual embed code */}
      <div className="beehiiv-embed">
        <p className="signup-placeholder">
          <a 
            href="https://beehiiv.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="signup-link"
          >
            Subscribe for updates →
          </a>
        </p>
        <p className="signup-note">
          <small>No spam. Just the journey.</small>
        </p>
      </div>
      
      {/* 
        To embed your Beehiiv form, replace the above with:
        
        <iframe 
          src="https://embeds.beehiiv.com/YOUR-FORM-ID"
          data-test-id="beehiiv-embed"
          width="100%"
          height="320"
          frameBorder="0"
          scrolling="no"
          style={{ 
            borderRadius: '4px',
            border: '1px solid #333',
            margin: 0,
            backgroundColor: 'transparent'
          }}
        />
      */}
    </div>
  )
}
