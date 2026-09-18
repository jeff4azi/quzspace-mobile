import React from 'react';
import { View, Text, Switch, Platform } from 'react-native';

export interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  className = '',
}: ToggleProps) {
  return (
    <View className={`flex-row items-center justify-between gap-4 py-3 ${className}`}>
      <View className="flex-1 pr-2">
        <Text className="text-sm font-bold text-brand">{label}</Text>
        {description && (
          <Text className="text-xs text-gray mt-0.5 leading-relaxed">
            {description}
          </Text>
        )}
      </View>

      <Switch
        value={checked}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{
          false: '#e2e0e1',
          true: '#242021',
        }}
        thumbColor={
          Platform.OS === 'android'
            ? checked
              ? '#f1f1f1'
              : '#f4f3f4'
            : '#ffffff'
        }
        ios_backgroundColor="#e2e0e1"
      />
    </View>
  );
}

export default Toggle;
