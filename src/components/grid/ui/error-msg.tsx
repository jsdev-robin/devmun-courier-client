import React, { useEffect, useState } from 'react';
import { ServerOff } from 'lucide-react';
import { Button } from '../../ui/button';

const ErrorMsg = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const reload = () => {
    if (isOnline) {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ServerOff size={52} className="text-red-500 mb-6" />
      <h2 className="text-2xl font-semibold text-red-600 mb-3">
        Failed to Load Data
      </h2>
      <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
        {isOnline
          ? 'Something went wrong. Please try refreshing the page.'
          : "You're currently offline. Please check your internet connection."}
      </p>
      <Button onClick={reload} variant="outline" disabled={!isOnline}>
        {isOnline ? 'Refresh Page' : 'No Connection'}
      </Button>
    </div>
  );
};

export default ErrorMsg;
