import React from 'react';
import { ColorValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';

export type IconName = keyof typeof Ionicons.glyphMap;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string | ColorValue;
  className?: string;
}

/**
 * Standardized QuzSpace Icon component using Expo's Ionicons family
 * matching the consistent single-family icon convention from the web app.
 */
export function Icon({ name, size = 20, color = palette.brand, className }: IconProps) {
  return <Ionicons name={name} size={size} color={color as any} className={className} />;
}

export default Icon;
