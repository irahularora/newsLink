import React from 'react';

const ErrorPage = ({ errorMessage }) => {
  const defaultErrorMessage = 'Oops! Something went wrong.';
  const messageToDisplay = errorMessage || defaultErrorMessage;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{messageToDisplay}</h1>
    </div>
  );
};

export default ErrorPage;
