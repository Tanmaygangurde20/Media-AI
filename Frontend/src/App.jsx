import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from 'react';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ErrorBoundary from "./Components/ErrorBoundary";
import LandingPage from "./pages/LandingPage";
import ImageCaptionPage from "./pages/ImageCaptionPage";
import TextToImagePage from "./pages/TextToImagePage";

// Global error handler for uncaught errors
const handleGlobalError = (event) => {
  console.error('Global error:', event.error);
  // You can add error reporting here (e.g., Sentry, LogRocket, etc.)
};

// Global unhandled promise rejection handler
const handleUnhandledRejection = (event) => {
  console.error('Unhandled rejection:', event.reason);
  // You can add error reporting here
};

function App() {
  useEffect(() => {
    // Add global error handlers
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Clean up event listeners
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Router>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route 
                path="/image-to-text" 
                element={
                  <ErrorBoundary>
                    <ImageCaptionPage />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/text-to-image" 
                element={
                  <ErrorBoundary>
                    <TextToImagePage />
                  </ErrorBoundary>
                } 
              />
              {/* 404 Route */}
              <Route 
                path="*" 
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                      <p className="text-xl text-gray-300 mb-6">Page not found</p>
                      <a 
                        href="/" 
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                      >
                        Go to Home
                      </a>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #4b5563',
                padding: '16px',
                borderRadius: '0.5rem',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#111827',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#111827',
                },
              },
            }}
          />
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
