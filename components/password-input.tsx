import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        {...props}
        type={show ? 'text' : 'password'}
        style={{
          width: '100%',
          paddingRight: '2.5rem',
          height: '48px', // tinggi diperbesar di sini
          fontSize: '1rem',
          boxSizing: 'border-box'
        }}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        style={{
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          height: '32px',
          width: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        tabIndex={-1}
      >
        <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
      </button>
    </div>
  );
};

export default PasswordInput;