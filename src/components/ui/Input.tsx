import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  helperText,
  required = false,
  leftElement,
  rightElement,
  containerClassName = '',
  containerStyle,
  onFocus,
  onBlur,
  editable = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`w-full flex-col mb-5 ${containerClassName}`}
      style={[{ marginBottom: 18 }, containerStyle]}
    >
      {label && (
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xs font-bold uppercase tracking-wider text-brand">
            {label}
            {required && <Text className="text-rose-500 ml-1"> *</Text>}
          </Text>
        </View>
      )}

      <View
        className={`relative flex-row items-center w-full rounded-xl border px-3.5 ${
          editable ? 'bg-white' : 'bg-light/70'
        } ${
          error
            ? 'border-rose-500 bg-rose-50/30'
            : isFocused
            ? 'border-brand'
            : 'border-muted/40'
        }`}
        style={{ minHeight: 48 }}
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
          style={{ fontSize: 14, color: '#242021', paddingVertical: 10 }}
          {...props}
        />

        {rightElement && (
          <View className="ml-2.5 items-center justify-center">
            {rightElement}
          </View>
        )}
      </View>

      {error ? (
        <Text className="text-xs text-rose-600 font-medium mt-1.5">
          {error}
        </Text>
      ) : helperText ? (
        <Text className="text-xs text-gray/80 mt-1.5">{helperText}</Text>
      ) : null}
    </View>
  );
}

export default Input;
