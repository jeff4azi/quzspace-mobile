import React from 'react';
import { Redirect } from 'expo-router';

/**
 * Root entry router:
 * Mobile apps do not have a marketing landing page.
 * Unauthenticated users are routed directly to the Login screen.
 */
export default function RootIndexRedirect() {
  const isAuthenticated = false; // Auth state placeholder

  if (isAuthenticated) {
    return <Redirect href="/(app)/dashboard" />;
  }

  return <Redirect href="/(public)/login" />;
}
