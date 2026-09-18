import React from 'react';
import { Stack } from 'expo-router';

export default function QuizLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#f1f1f1' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Taking Quiz' }} />
      <Stack.Screen name="results" options={{ title: 'Quiz Results' }} />
    </Stack>
  );
}
