import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
import { Icon } from '@/components/ui/Icon';
import { useKeyboardHeight } from '@/components/ui/KeyboardAwareLayout';

export default function LoginScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const keyboardHeight = useKeyboardHeight();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    if (!email.trim()) return 'Email address is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    return '';
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    setIsLoading(true);

    // Simulate login transition
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(app)/dashboard');
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    Alert.alert(
      'Google Sign-In',
      'Google Sign-In is decorative for this preview build.',
      [{ text: 'OK' }]
    );
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Password Reset',
      'Password reset instructions will be sent to your email.',
      [{ text: 'OK' }]
    );
  };

  const scrollToInput = (yOffset: number) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
    }, 120);
  };

  return (
    <SafeAreaView className="flex-1 bg-light">
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 24,
          paddingHorizontal: 16,
          paddingBottom: keyboardHeight > 0 ? keyboardHeight + 60 : 40,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-md mx-auto my-auto">
          {/* Main Auth Card matching Web version */}
          <View className="bg-white rounded-2xl shadow-sm border border-muted/30 p-6 sm:p-8">
            {/* Header Section: Logo + Title + Subtitle */}
            <View className="items-center mb-6">
              <Image
                source={require('@/assets/images/Quzspace_logo.png')}
                className="w-12 h-12 mb-3"
                resizeMode="contain"
              />
              <Text className="text-2xl sm:text-3xl font-extrabold text-brand tracking-tight text-center mb-1.5">
                Welcome back
              </Text>
              <Text className="text-sm text-gray leading-relaxed text-center px-2">
                Log in to access your personalized AI study workspace.
              </Text>
            </View>

            {/* Decorative Google Button */}
            <Button
              variant="google"
              fullWidth
              onPress={handleGoogleSignIn}
              leftIcon={<GoogleIcon size={18} />}
              className="py-3.5"
            >
              Continue with Google
            </Button>

            {/* Divider */}
            <View
              className="relative flex-row items-center justify-center"
              style={{ marginVertical: 20 }}
            >
              <View className="flex-1 h-[1px] bg-muted/20" />
              <Text className="px-3 text-xs uppercase tracking-wider text-muted font-bold bg-white">
                or
              </Text>
              <View className="flex-1 h-[1px] bg-muted/20" />
            </View>

            {/* Form Content */}
            <View>
              {/* Email Address */}
              <Input
                label="Email Address"
                value={formData.email}
                onChangeText={(val) => handleInputChange('email', val)}
                onFocus={() => scrollToInput(120)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    email: validateEmail(formData.email),
                  }))
                }
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email}
                required
                containerStyle={{ marginBottom: 18 }}
              />

              {/* Password Input with Forgot Password link in header row */}
              <View className="w-full flex-col" style={{ marginBottom: 22 }}>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-xs font-bold uppercase tracking-wider text-brand">
                    Password <Text className="text-rose-500">*</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={handleForgotPassword}
                    activeOpacity={0.7}
                  >
                    <Text className="text-xs font-semibold text-gray">
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>

                <Input
                  value={formData.password}
                  onChangeText={(val) => handleInputChange('password', val)}
                  onFocus={() => scrollToInput(220)}
                  onBlur={() =>
                    setErrors((prev) => ({
                      ...prev,
                      password: validatePassword(formData.password),
                    }))
                  }
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  error={errors.password}
                  containerStyle={{ marginBottom: 0 }}
                  rightElement={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-1"
                      activeOpacity={0.7}
                    >
                      <Icon
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={18}
                        color="#5d5a5b"
                      />
                    </TouchableOpacity>
                  }
                />
              </View>

              {/* Submit Button */}
              <Button
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isLoading}
                onPress={handleSubmit}
                className="py-3.5"
                style={{ marginTop: 4 }}
              >
                Log In
              </Button>
            </View>

            {/* Footer switch link */}
            <View
              className="border-t border-muted/20 flex-row items-center justify-center gap-1.5"
              style={{ marginTop: 24, paddingTop: 20 }}
            >
              <Text className="text-sm text-gray font-normal">
                Don't have an account?
              </Text>
              <Link href="/(public)/signup" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-sm font-bold text-brand underline">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
