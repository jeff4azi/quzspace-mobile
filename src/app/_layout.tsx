import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f1f1f1' },
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="spaces/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="quiz/[quizId]" options={{ headerShown: false }} />
        <Stack.Screen name="s/[shareCode]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
