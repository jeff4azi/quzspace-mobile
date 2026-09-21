import React, { useEffect, useRef } from 'react';
import { View, Animated, Platform } from 'react-native';
import { Icon } from '@/components/ui/Icon';

export function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -4,
            duration: 350,
            delay,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 350,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      );
    };

    const anim1 = animateDot(dot1, 0);
    const anim2 = animateDot(dot2, 180);
    const anim3 = animateDot(dot3, 360);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  return (
    <View className="flex-row items-center gap-2 mb-4">
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: '#242021',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="sparkles" size={13} color="#fbbf24" />
      </View>

      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderRadius: 18,
          borderBottomLeftRadius: 4,
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: 'rgba(174, 171, 172, 0.3)',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Animated.View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#5d5a5b',
            transform: [{ translateY: dot1 }],
          }}
        />
        <Animated.View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#5d5a5b',
            transform: [{ translateY: dot2 }],
          }}
        />
        <Animated.View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#5d5a5b',
            transform: [{ translateY: dot3 }],
          }}
        />
      </View>
    </View>
  );
}

export default TypingIndicator;
