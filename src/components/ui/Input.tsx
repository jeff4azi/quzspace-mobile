import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  helperText,
  required = false,
  leftElement,
  rightElement,
  containerClassName = '',
  onFocus,
  onBlur,
  editable = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full space-y-1.5 ${containerClassName}`}>
      {label && (
        <Text className="text-xs font-bold uppercase tracking-wider text-brand mb-1">
          {label} {required && <Text className="text-rose-500">*</Text>}
        </Text>
      )}

      <View
        className={`flex-row items-center w-full rounded-xl border px-3.5 ${
          editable ? 'bg-white' : 'bg-light/70'
        } ${
          error
            ? 'border-rose-500'
            : isFocused
            ? 'border-brand'
            : 'border-muted/30'
        }`}
        style={{ minHeight: 46 }}
      >
        {leftElement && <View className="mr-2.5">{leftElement}</View>}

        <TextInput
          editable={editable}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          placeholderTextColor="#aeabac"
          className="flex-1 text-sm font-medium text-brand py-2.5"
          style={{ fontSize: 14, color: '#242021' }}
          {...props}
        />

        {rightElement && <View className="ml-2.5">{rightElement}</View>}
      </View>

      {error ? (
        <Text className="text-xs text-rose-600 font-medium mt-1">{error}</Text>
      ) : helperText ? (
        <Text className="text-xs text-gray mt-1">{helperText}</Text>
      ) : null}
    </View>
  );
}

export default Input;
