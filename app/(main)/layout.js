import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
