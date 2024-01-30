// NotFoundPage.js

import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default PageNotFound;
