import React from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';

export default function SpaceIndexRedirect() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Redirect href={`/spaces/${id}/summary` as any} />;
}
