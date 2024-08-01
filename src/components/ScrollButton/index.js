import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const ScrollButton = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <button
      onClick={isAtTop ? scrollToBottom : scrollToTop}
      style={{
        position: 'fixed',
        bottom: '60px',
        right: '70px',
        background: '#2dce89',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        padding: '10px',
        width: '50px',
        height: '50px',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      <FontAwesomeIcon size="lg" icon={isAtTop ? faArrowDown : faArrowUp} />
    </button>
  );
};

export default ScrollButton;