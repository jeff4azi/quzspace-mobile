import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Icon } from './Icon';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  label,
  error,
  className = '',
  disabled = false,
}: CheckboxProps) {
  return (
    <View className={`w-full ${className}`}>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => onChange(!checked)}
        className="flex-row items-start gap-3 py-1"
        activeOpacity={0.7}
      >
        <View
          className={`w-5 h-5 rounded-md items-center justify-center mt-0.5 border transition-all ${
            checked
              ? 'bg-brand border-brand shadow-xs'
              : 'bg-white border-muted/50'
          }`}
          style={{ width: 20, height: 20 }}
        >
          {checked && <Icon name="checkmark" size={14} color="#f1f1f1" />}
        </View>

        {label && (
          <View className="flex-1">
            {typeof label === 'string' ? (
              <Text className="text-xs text-gray leading-normal">{label}</Text>
            ) : (
              label
            )}
          </View>
        )}
      </TouchableOpacity>

      {error && (
        <Text className="text-xs text-rose-600 font-medium mt-1 ml-8">
          {error}
        </Text>
      )}
    </View>
  );
}

export default Checkbox;
