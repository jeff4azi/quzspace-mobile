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

export default function SignupScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const keyboardHeight = useKeyboardHeight();

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

  const scrollToInput = (yOffset: number) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
    }, 120);
  };

  const isFormValid =
    formData.fullName.trim() !== '' &&
    formData.email !== '' &&
    formData.password.length >= 8 &&
    formData.confirmPassword === formData.password &&
    formData.termsAgreed;

  return (
    <SafeAreaView className="flex-1 bg-light">
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 24,
          paddingHorizontal: 16,
          paddingBottom: keyboardHeight > 0 ? keyboardHeight + 80 : 40,
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
                Create your account
              </Text>
              <Text className="text-sm text-gray leading-relaxed text-center px-2">
                Turn lecture notes into personalized AI study suites today.
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
              {/* Full Name Input */}
              <Input
                label="Full Name"
                value={formData.fullName}
                onChangeText={(val) => handleInputChange('fullName', val)}
                onFocus={() => scrollToInput(120)}
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
                containerStyle={{ marginBottom: 18 }}
              />

              {/* Email Address */}
              <Input
                label="Email Address"
                value={formData.email}
                onChangeText={(val) => handleInputChange('email', val)}
                onFocus={() => scrollToInput(200)}
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

              {/* Password Input */}
              <Input
                label="Password"
                value={formData.password}
                onChangeText={(val) => handleInputChange('password', val)}
                onFocus={() => scrollToInput(300)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    password: validatePassword(formData.password),
                  }))
                }
                placeholder="At least 8 characters"
                helperText={errors.password ? undefined : 'Must be at least 8 characters long'}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                error={errors.password}
                required
                containerStyle={{ marginBottom: 18 }}
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
                onFocus={() => scrollToInput(380)}
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
                containerStyle={{ marginBottom: 18 }}
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
              <View style={{ marginBottom: 22, paddingTop: 4 }}>
                <TouchableOpacity
                  onPress={() =>
                    handleInputChange('termsAgreed', !formData.termsAgreed)
                  }
                  className="flex-row items-start gap-2.5"
                  activeOpacity={0.7}
                >
                  <View
                    className={`w-4 h-4 rounded mt-0.5 items-center justify-center border transition-all ${
                      formData.termsAgreed
                        ? 'bg-brand border-brand'
                        : 'bg-white border-muted/60'
                    }`}
                  >
                    {formData.termsAgreed && (
                      <Icon name="checkmark" size={11} color="#f1f1f1" />
                    )}
                  </View>

                  <Text className="text-xs text-gray leading-normal flex-1">
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
                </TouchableOpacity>

                {errors.termsAgreed ? (
                  <Text className="text-xs text-rose-600 font-medium mt-1.5 ml-6">
                    {errors.termsAgreed}
                  </Text>
                ) : null}
              </View>

              {/* Submit Button */}
              <Button
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isLoading}
                disabled={!isFormValid}
                onPress={handleSubmit}
                className="py-3.5"
                style={{ marginTop: 4 }}
              >
                Create Account
              </Button>
            </View>

            {/* Footer switch link */}
            <View
              className="border-t border-muted/20 flex-row items-center justify-center gap-1.5"
              style={{ marginTop: 24, paddingTop: 20 }}
            >
              <Text className="text-sm text-gray font-normal">
                Already have an account?
              </Text>
              <Link href="/(public)/login" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-sm font-bold text-brand underline">
                    Log in
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
