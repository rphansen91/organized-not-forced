import React from 'react';

export function Component() {
  return <FlashCards />;
}

const mantra = "It's about how your body balances between gravity pulling you down and the ground pushing you up — and how learning to organize yourself across that, day after day, even when conditions aren't perfect, builds a kind of confidence most people never develop.";

const cards = [
  {
    question: "What do you mean by organization?",
    answer: "Most people think strength is about trying harder — more effort, more force. But your body has a skeleton that can either stack with gravity or fight it. Organization is when your joints and bones line up so force transfers cleanly. You stop muscling through and start letting your structure do the work."
  },
  {
    question: "So it's a fitness book?",
    answer: "It's a movement book that uses calisthenics as the training ground. The skills — pistol squats, muscle-ups, planches — are just the context. The real subject is how you learn to find organization across variables: tired days, cold days, unmotivated days. That transfers to everything — surfing, running, how you sit at your desk."
  },
  {
    question: "Why calisthenics specifically?",
    answer: "Because you can't fake it. There's no machine guiding your movement, no weight you can just muscle through with bad form. Your body has to organize itself or the skill doesn't happen. It's honest feedback."
  },
  {
    question: "Do I need to be strong to start?",
    answer: "You need to be willing to show up. The book isn't about where you start — it's about maintaining rhythm even when conditions aren't perfect. Some people start with pull-ups, some start with wall push-ups. The sequence matters more than the starting point."
  },
  {
    question: "What's the rhythm thing about?",
    answer: "Most people wait for perfect weeks to train. But life doesn't give you perfect weeks. The rhythm is about never breaking the sequence — even if some beats are slower, even if weeks pass between sessions. The tempo changes. The rhythm doesn't."
  }
];

const cardStyle: React.CSSProperties = {
  maxWidth: '600px',
  padding: '48px',
  background: 'linear-gradient(135deg, #1a1a1a 0%, #141414 100%)',
  border: '2px solid #d4af37',
  borderRadius: '16px',
  boxShadow: '0 0 40px rgba(212, 175, 55, 0.15)',
  marginBottom: '40px',
};

const questionStyle: React.CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#d4af37',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  marginBottom: '20px',
};

const answerStyle: React.CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '20px',
  lineHeight: 1.7,
  color: '#e8e8e8',
  margin: 0,
};

const FlashCards: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
    }}>
      {/* Mantra Card */}
      <div style={cardStyle}>
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
          {mantra}
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

      <h2 style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '14px',
        fontWeight: 400,
        color: '#d4af37',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        marginBottom: '32px',
        marginTop: '24px',
        textAlign: 'center',
      }}>
        Common Questions
      </h2>
      
      {cards.map((card, index) => (
        <div key={index} style={cardStyle}>
          <h2 style={questionStyle}>{card.question}</h2>
          <p style={answerStyle}>{card.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FlashCards;
