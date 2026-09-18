import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { mockUser } from '@/data/mockUser';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { Icon } from '@/components/ui/Icon';

const AVATAR_COLORS = [
  { name: 'Brand Dark', hex: '#242021', bgClass: 'bg-brand' },
  { name: 'Purple', hex: '#9333ea', bgClass: 'bg-purple-600' },
  { name: 'Emerald', hex: '#059669', bgClass: 'bg-emerald-600' },
  { name: 'Amber', hex: '#d97706', bgClass: 'bg-amber-600' },
  { name: 'Rose', hex: '#e11d48', bgClass: 'bg-rose-600' },
  { name: 'Blue', hex: '#2563eb', bgClass: 'bg-blue-600' },
];

export default function SettingsScreen() {
  // Profile state
  const [name, setName] = useState(mockUser.name);
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0]);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: mockUser.preferences.emailNotifications,
    studyReminders: mockUser.preferences.studyReminders,
    weeklyReport: mockUser.preferences.weeklyReport,
    soundEffects: mockUser.preferences.soundEffects,
  });
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);
  const [prefsSuccessMsg, setPrefsSuccessMsg] = useState('');

  // Danger zone state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Avatar Initials
  const avatarInitials =
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'QS';

  const handleSaveProfile = () => {
    setIsSavingProfile(true);
    setProfileSuccessMsg('');
    setTimeout(() => {
      setIsSavingProfile(false);
      setProfileSuccessMsg('Profile changes saved successfully!');
      setTimeout(() => setProfileSuccessMsg(''), 3000);
    }, 600);
  };

  const handleSavePreferences = () => {
    setIsSavingPrefs(true);
    setPrefsSuccessMsg('');
    setTimeout(() => {
      setIsSavingPrefs(false);
      setPrefsSuccessMsg('Preferences updated!');
      setTimeout(() => setPrefsSuccessMsg(''), 3000);
    }, 500);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Account Deletion Simulated',
      'In a production app, all your study spaces, flashcards, and quizzes would be erased.',
      [{ text: 'OK', onPress: () => setShowDeleteConfirm(false) }]
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{ padding: 20, paddingBottom: 60, gap: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Settings Header */}
      <View>
        <Text className="text-2xl font-extrabold text-brand tracking-tight">
          Settings
        </Text>
        <Text className="text-xs font-medium text-gray mt-1">
          Manage your profile details and study preferences.
        </Text>
      </View>

      {/* SECTION 1: PROFILE */}
      <View className="bg-white p-5 rounded-2xl border border-muted/30 shadow-xs space-y-5">
        <View className="flex-row items-center gap-2 border-b border-muted/20 pb-3">
          <Icon name="person-outline" size={18} color="#242021" />
          <Text className="text-base font-bold text-brand">
            Profile Information
          </Text>
        </View>

        {/* Avatar + Theme Color Selector */}
        <View className="flex-row items-center gap-4">
          <View
            className="w-16 h-16 rounded-full items-center justify-center shadow-xs"
            style={{ backgroundColor: avatarColor.hex }}
          >
            <Text className="text-xl font-bold text-light">
              {avatarInitials}
            </Text>
          </View>

          <View className="flex-1 space-y-1.5">
            <Text className="text-xs font-bold uppercase tracking-wider text-brand">
              Avatar Color
            </Text>
            <View className="flex-row items-center gap-2 flex-wrap">
              {AVATAR_COLORS.map((col) => (
                <TouchableOpacity
                  key={col.name}
                  onPress={() => setAvatarColor(col)}
                  className="w-7 h-7 rounded-full items-center justify-center border"
                  style={{
                    backgroundColor: col.hex,
                    borderColor:
                      avatarColor.name === col.name ? '#242021' : 'transparent',
                    borderWidth: avatarColor.name === col.name ? 2 : 0,
                  }}
                  activeOpacity={0.8}
                >
                  {avatarColor.name === col.name && (
                    <Icon name="checkmark" size={14} color="#ffffff" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Name and Email */}
        <View className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
            required
            leftElement={<Icon name="person-outline" size={16} color="#aeabac" />}
          />

          <View className="space-y-1">
            <Text className="text-xs font-bold uppercase tracking-wider text-brand">
              Email Address
            </Text>
            <View className="w-full px-3.5 py-3 rounded-xl border border-muted/30 bg-light/70">
              <Text className="text-sm font-medium text-gray">
                {mockUser.email}
              </Text>
            </View>
            <Text className="text-[11px] text-muted">
              Email cannot be changed here.
            </Text>
          </View>
        </View>

        {/* Save Profile Button & Inline Feedback */}
        <View className="space-y-2 pt-1">
          <Button
            variant="primary"
            isLoading={isSavingProfile}
            onPress={handleSaveProfile}
            size="md"
          >
            Save Profile Changes
          </Button>

          {profileSuccessMsg ? (
            <View className="flex-row items-center justify-center gap-1.5 py-1">
              <Icon name="checkmark-circle" size={16} color="#059669" />
              <Text className="text-xs font-bold text-emerald-700">
                {profileSuccessMsg}
              </Text>
            </View>
          ) : (
            <Text className="text-[11px] text-gray text-center">
              Member since {mockUser.joinedDate}
            </Text>
          )}
        </View>
      </View>

      {/* SECTION 2: APP PREFERENCES */}
      <View className="bg-white p-5 rounded-2xl border border-muted/30 shadow-xs space-y-4">
        <View className="flex-row items-center gap-2 border-b border-muted/20 pb-3">
          <Icon name="options-outline" size={18} color="#242021" />
          <Text className="text-base font-bold text-brand">App Preferences</Text>
        </View>

        <View className="divide-y divide-muted/20">
          <Toggle
            label="Email Notifications"
            description="Receive updates on shared space activity and milestone badges."
            checked={preferences.emailNotifications}
            onChange={(val) =>
              setPreferences((prev) => ({ ...prev, emailNotifications: val }))
            }
          />

          <Toggle
            label="Study Streak Reminders"
            description="Daily notifications to keep your active study streak going strong."
            checked={preferences.studyReminders}
            onChange={(val) =>
              setPreferences((prev) => ({ ...prev, studyReminders: val }))
            }
          />

          <Toggle
            label="Weekly Performance Digest"
            description="Receive a weekly breakdown of your quiz mastery and recommended review areas."
            checked={preferences.weeklyReport}
            onChange={(val) =>
              setPreferences((prev) => ({ ...prev, weeklyReport: val }))
            }
          />

          <Toggle
            label="Interactive Sound Effects"
            description="Play subtle feedback audio cues during quiz completion and flashcard flips."
            checked={preferences.soundEffects}
            onChange={(val) =>
              setPreferences((prev) => ({ ...prev, soundEffects: val }))
            }
          />
        </View>

        <View className="space-y-2 pt-2">
          <Button
            variant="secondary"
            isLoading={isSavingPrefs}
            onPress={handleSavePreferences}
            size="md"
          >
            Save Preferences
          </Button>

          {prefsSuccessMsg ? (
            <View className="flex-row items-center justify-center gap-1.5 py-1">
              <Icon name="checkmark-circle" size={16} color="#059669" />
              <Text className="text-xs font-bold text-emerald-700">
                {prefsSuccessMsg}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* SECTION 3: DANGER ZONE */}
      <View className="bg-rose-50/40 p-5 rounded-2xl border border-rose-200/80 shadow-xs space-y-3">
        <View className="flex-row items-center gap-2 border-b border-rose-200/60 pb-3">
          <Icon name="warning-outline" size={18} color="#e11d48" />
          <Text className="text-base font-bold text-rose-900">Danger Zone</Text>
        </View>

        <Text className="text-xs text-rose-700 leading-relaxed">
          Permanently remove your account, study spaces, flashcard decks, and quiz attempt records. This action cannot be undone.
        </Text>

        {!showDeleteConfirm ? (
          <Button
            variant="danger"
            size="sm"
            onPress={() => setShowDeleteConfirm(true)}
            className="self-start"
          >
            Delete Account
          </Button>
        ) : (
          <View className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-3">
            <Text className="text-xs font-bold text-rose-900">
              Are you sure? This action is irreversible.
            </Text>
            <View className="flex-row items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onPress={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel Keep Account
              </Button>
              <Button
                variant="danger"
                size="sm"
                onPress={handleDeleteAccount}
                className="flex-1"
              >
                Confirm Delete Account
              </Button>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
