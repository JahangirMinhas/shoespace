import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Verifying...');
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3001/api/signup/verify-email?token=${token}`)
        .then((response) => {
          setStatus('Email verified successfully! You can now log in.');
        })
        .catch((error) => {
          console.error('Verification error:', error);
          setStatus('Verification failed. The link may have expired or is invalid.');
        });
    } else {
      setStatus('Invalid verification link.');
    }
  }, [token]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{status}</h1>
    </div>
  );
}

export default VerifyEmail;