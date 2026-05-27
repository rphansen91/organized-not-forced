import React from 'react';

export function Component() {
  return <MantraCard />;
}

const MantraCard: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '48px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)',
        border: '2px solid #d4af37',
        borderRadius: '16px',
        boxShadow: '0 0 40px rgba(212, 175, 55, 0.15)',
      }}>
        <h1 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: '14px',
          fontWeight: 400,
          color: '#d4af37',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          Organized, Not Forced
        </h1>
        
        <p style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: '24px',
          lineHeight: 1.6,
          color: '#e8e8e8',
          textAlign: 'center',
          margin: 0,
        }}>
          It's about how your body balances between gravity pulling you down and the ground pushing you up — and how learning to organize yourself across that, day after day, even when conditions aren't perfect, builds a kind of confidence most people never develop.
        </p>
        
        <div style={{
          marginTop: '32px',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '16px',
            color: '#d4af37',
            fontStyle: 'italic',
          }}>
            The tempo changes. The rhythm doesn't.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MantraCard;
