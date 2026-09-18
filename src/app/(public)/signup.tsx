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
import { Checkbox } from '@/components/ui/Checkbox';
import { Icon } from '@/components/ui/Icon';

export default function SignupScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateFullName = (name: string) => {
    if (!name.trim()) return 'Full name is required';
    return '';
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return 'Email address is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }

    if (field === 'password' && formData.confirmPassword) {
      if (formData.confirmPassword !== value) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = () => {
    const nameErr = validateFullName(formData.fullName);
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);
    const confirmErr = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );
    const termsErr = !formData.termsAgreed
      ? 'You must agree to the Terms to continue'
      : '';

    if (nameErr || emailErr || passErr || confirmErr || termsErr) {
      setErrors({
        fullName: nameErr,
        email: emailErr,
        password: passErr,
        confirmPassword: confirmErr,
        termsAgreed: termsErr,
      });
      return;
    }

    setIsLoading(true);

    // Simulate signup transition
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(app)/dashboard');
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    Alert.alert(
      'Google Sign-Up',
      'Google Sign-Up is decorative for this preview build.',
      [{ text: 'OK' }]
    );
  };

  const isFormValid =
    formData.fullName.trim() !== '' &&
    formData.email !== '' &&
    formData.password.length >= 8 &&
    formData.confirmPassword === formData.password &&
    formData.termsAgreed;

  return (
    <SafeAreaView className="flex-1 bg-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className="px-6 py-6"
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
                Create your account
              </Text>
              <Text className="text-xs font-medium text-gray text-center mt-1 max-w-xs leading-relaxed">
                Turn lecture notes into personalized AI study suites today.
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

              {/* Full Name Input */}
              <Input
                label="Full Name"
                value={formData.fullName}
                onChangeText={(val) => handleInputChange('fullName', val)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    fullName: validateFullName(formData.fullName),
                  }))
                }
                placeholder="Jane Doe"
                autoCapitalize="words"
                error={errors.fullName}
                required
                leftElement={<Icon name="person-outline" size={18} color="#aeabac" />}
              />

              {/* Email Address */}
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

              {/* Password Input */}
              <Input
                label="Password"
                value={formData.password}
                onChangeText={(val) => handleInputChange('password', val)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    password: validatePassword(formData.password),
                  }))
                }
                placeholder="At least 8 characters"
                helperText="Must be at least 8 characters long"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                error={errors.password}
                required
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

              {/* Confirm Password Input */}
              <Input
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(val) => handleInputChange('confirmPassword', val)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: validateConfirmPassword(
                      formData.confirmPassword,
                      formData.password
                    ),
                  }))
                }
                placeholder="Re-enter password"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                error={errors.confirmPassword}
                required
                leftElement={<Icon name="shield-checkmark-outline" size={18} color="#aeabac" />}
                rightElement={
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-1"
                    activeOpacity={0.7}
                  >
                    <Icon
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={18}
                      color="#5d5a5b"
                    />
                  </TouchableOpacity>
                }
              />

              {/* Terms Agreement Checkbox */}
              <View className="pt-1">
                <Checkbox
                  checked={formData.termsAgreed}
                  onChange={(val) => handleInputChange('termsAgreed', val)}
                  error={errors.termsAgreed}
                  label={
                    <Text className="text-xs text-gray leading-normal">
                      I agree to the{' '}
                      <Text className="text-brand font-bold">
                        Terms of Service
                      </Text>{' '}
                      and{' '}
                      <Text className="text-brand font-bold">
                        Privacy Policy
                      </Text>
                      .
                    </Text>
                  }
                />
              </View>

              {/* Submit Button */}
              <Button
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isLoading}
                disabled={!isFormValid}
                onPress={handleSubmit}
                className="mt-2"
              >
                Create Account
              </Button>
            </View>

            {/* Bottom Link to Login */}
            <View className="flex-row items-center justify-center gap-1.5 pt-2">
              <Text className="text-xs text-gray font-medium">
                Already have an account?
              </Text>
              <Link href="/(public)/login" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-xs font-bold text-brand underline">
                    Log in
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
