import { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

/**
 * LoadingProvider — Global loading state management
 * Handles generic loading screens, loaders, and state
 */
export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const showLoader = useCallback((message = 'Setting things up for a smooth experience...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('');
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, loadingMessage, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
}

/**
 * useLoading — Access loading context
 */
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
