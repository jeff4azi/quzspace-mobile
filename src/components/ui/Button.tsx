import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'google';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  // Variant base styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-brand text-light shadow-xs border border-transparent';
      case 'secondary':
        return 'bg-white text-brand border border-muted/30 shadow-xs';
      case 'outline':
        return 'bg-transparent text-brand border border-brand';
      case 'danger':
        return 'bg-rose-600 text-white shadow-xs border border-transparent';
      case 'ghost':
        return 'bg-transparent text-brand border border-transparent';
      case 'google':
        return 'bg-white text-brand border border-muted/30 shadow-xs';
      default:
        return 'bg-brand text-light';
    }
  };

  // Text color helper
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return 'text-light';
      case 'secondary':
      case 'outline':
      case 'ghost':
      case 'google':
      default:
        return 'text-brand';
    }
  };

  // Size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-3.5 text-xs';
      case 'lg':
        return 'py-3.5 px-6 text-base';
      case 'md':
      default:
        return 'py-3 px-5 text-sm';
    }
  };

  const getSpinnerColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return '#f1f1f1';
      default:
        return '#242021';
    }
  };

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.8}
      className={`rounded-xl flex-row items-center justify-center ${
        fullWidth ? 'w-full' : ''
      } ${getVariantStyles()} ${getSizeStyles()} ${
        isDisabled ? 'opacity-50' : 'active:opacity-90'
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={getSpinnerColor()} className="py-0.5" />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {leftIcon && <View>{leftIcon}</View>}
          {typeof children === 'string' ? (
            <Text
              className={`font-bold text-center ${getTextColor()}`}
              style={{ fontSize: size === 'sm' ? 12 : size === 'lg' ? 15 : 13.5 }}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {rightIcon && <View>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default Button;
