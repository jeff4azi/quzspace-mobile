import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export default function LoginScreen() {
  const router = useRouter();

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

  return (
    <SafeAreaView className="flex-1 bg-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className="px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full max-w-sm mx-auto space-y-6">
            {/* Header / Logo Section */}
            <View className="items-center mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <Image
                  source={require('@/assets/images/Quzspace_logo.png')}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
                <Text className="text-2xl font-extrabold text-brand tracking-tight">
                  Quz<Text className="text-gray font-semibold">Space</Text>
                </Text>
              </View>

              <Text className="text-2xl font-extrabold text-brand tracking-tight text-center">
                Welcome back
              </Text>
              <Text className="text-xs font-medium text-gray text-center mt-1 max-w-xs leading-relaxed">
                Log in to access your personalized AI study workspace.
              </Text>
            </View>

            {/* Auth Form Card */}
            <View className="bg-white p-6 rounded-2xl border border-muted/30 shadow-sm space-y-4">
              {/* Decorative Google Button */}
              <Button
                variant="google"
                fullWidth
                onPress={handleGoogleSignIn}
                leftIcon={<Icon name="logo-google" size={18} color="#ea4335" />}
              >
                Continue with Google
              </Button>

              {/* Divider */}
              <View className="flex-row items-center justify-center my-3">
                <View className="flex-1 h-[1px] bg-muted/30" />
                <Text className="px-3 text-[11px] uppercase tracking-wider text-muted font-bold">
                  or
                </Text>
                <View className="flex-1 h-[1px] bg-muted/30" />
              </View>

              {/* Email Input */}
              <Input
                label="Email Address"
                value={formData.email}
                onChangeText={(val) => handleInputChange('email', val)}
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
                leftElement={<Icon name="mail-outline" size={18} color="#aeabac" />}
              />

              {/* Password Input with Forgot Password Link */}
              <View className="space-y-1">
                <View className="flex-row items-center justify-between">
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
                  leftElement={<Icon name="lock-closed-outline" size={18} color="#aeabac" />}
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
                className="mt-2"
              >
                Log In
              </Button>
            </View>

            {/* Bottom Link to Signup */}
            <View className="flex-row items-center justify-center gap-1.5 pt-2">
              <Text className="text-xs text-gray font-medium">
                Don't have an account?
              </Text>
              <Link href="/(public)/signup" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-xs font-bold text-brand underline">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
