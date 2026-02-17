import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 error for analytics
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-white/70 mb-4">Oops! Page not found</p>
        <a href="/" className="text-sky-300 hover:text-sky-200 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
