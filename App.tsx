import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from './src/components/SplashScreen';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time as needed
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? (
        // Show the splash screen while loading
        <SplashScreen />
      ) : (
        // Once loading is complete, render the main navigation
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      )}
    </QueryClientProvider>
  );
};

export default App;
