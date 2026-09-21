import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui/Icon';
import { AppHeader } from '@/components/layout/AppHeader';

export default function AppLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Dynamic bottom padding: handles devices with gesture pill (insets.bottom > 0)
  // as well as 3-button navigation / older devices where insets.bottom is 0.
  const bottomPadding = insets.bottom > 0 ? insets.bottom + 6 : 14;
  const tabHeight = 58 + bottomPadding;

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
            borderTopColor: 'rgba(174, 171, 172, 0.25)',
            borderTopWidth: 1,
            height: tabHeight,
            paddingTop: 8,
            paddingBottom: bottomPadding,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 2,
          },
          tabBarItemStyle: {
            paddingVertical: 2,
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
                onPress={props.onPress}
                accessibilityState={props.accessibilityState}
                className="flex-1 items-center justify-center -top-5"
                activeOpacity={0.85}
              >
                <View
                  className="rounded-full bg-brand items-center justify-center shadow-lg"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    shadowColor: '#242021',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 6,
                  }}
                >
                  <Icon name="add" size={28} color="#f1f1f1" />
                </View>
                <Text className="text-[11px] font-bold text-brand mt-1.5">
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

