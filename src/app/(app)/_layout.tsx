import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Icon } from '@/components/ui/Icon';
import { AppHeader } from '@/components/layout/AppHeader';

export default function AppLayout() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-light">
      <AppHeader />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#242021',
          tabBarInactiveTintColor: '#5d5a5b',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: 'rgba(174, 171, 172, 0.3)',
            borderTopWidth: 1,
            height: Platform.OS === 'ios' ? 88 : 64,
            paddingTop: 8,
            paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        {/* Dashboard Tab */}
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? 'layers' : 'layers-outline'}
                size={22}
                color={color}
              />
            ),
          }}
        />

        {/* Center Raised Create Button */}
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: () => null,
            tabBarButton: (props) => (
              <TouchableOpacity
                onPress={() => router.push('/(app)/create')}
                className="flex-1 items-center justify-center -top-4"
                activeOpacity={0.85}
              >
                <View className="w-13 h-13 rounded-full bg-brand items-center justify-center shadow-lg active:scale-95 transition-transform" style={{ width: 48, height: 48, borderRadius: 24 }}>
                  <Icon name="add" size={26} color="#f1f1f1" />
                </View>
                <Text className="text-[11px] font-bold text-brand mt-1">
                  Create
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        {/* Settings Tab */}
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? 'settings' : 'settings-outline'}
                size={22}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
