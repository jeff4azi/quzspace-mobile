import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, IconName } from '@/components/ui/Icon';

export interface SegmentOption<T extends string = string> {
  id: T;
  label: string;
  icon?: IconName;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
}

export function SegmentedControl<T extends string = string>({
  options,
  activeId,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <View className="flex-row p-1 rounded-xl bg-gray-100 border border-muted/30">
      {options.map((option) => {
        const isActive = activeId === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => onChange(option.id)}
            activeOpacity={0.8}
            className={`flex-1 flex-row items-center justify-center gap-2 py-2.5 px-3 rounded-lg ${
              isActive ? 'bg-white shadow-xs' : ''
            }`}
          >
            {option.icon && (
              <Icon
                name={option.icon}
                size={16}
                color={isActive ? '#242021' : '#5d5a5b'}
              />
            )}
            <Text
              className={`text-xs font-bold ${
                isActive ? 'text-brand' : 'text-gray'
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default SegmentedControl;
