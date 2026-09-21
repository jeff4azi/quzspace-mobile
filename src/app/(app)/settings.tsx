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
      setProfileSuccessMsg('Profile information updated successfully!');
      setTimeout(() => setProfileSuccessMsg(''), 3000);
    }, 600);
  };

  const handleSavePreferences = () => {
    setIsSavingPrefs(true);
    setPrefsSuccessMsg('');
    setTimeout(() => {
      setIsSavingPrefs(false);
      setPrefsSuccessMsg('Preferences saved!');
      setTimeout(() => setPrefsSuccessMsg(''), 3000);
    }, 500);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    Alert.alert(
      'Account Deletion Simulated',
      'In a production app, all your study spaces, flashcards, and quizzes would be erased.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-light"
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 90,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Settings Header */}
      <View style={{ marginBottom: 24 }}>
        <Text className="text-2xl sm:text-3xl font-extrabold text-brand tracking-tight">
          Settings
        </Text>
        <Text className="text-sm text-gray mt-1">
          Manage your profile details and study preferences.
        </Text>
      </View>

      {/* SECTION 1: PROFILE INFORMATION */}
      <View
        className="bg-white rounded-2xl border border-muted/30 shadow-xs"
        style={{ padding: 24, marginBottom: 24 }}
      >
        <View
          className="flex-row items-center gap-2 border-b border-muted/20"
          style={{ paddingBottom: 16, marginBottom: 24 }}
        >
          <Icon name="person-outline" size={20} color="#242021" />
          <Text className="text-lg font-bold text-brand">
            Profile Information
          </Text>
        </View>

        {/* Avatar Row */}
        <View className="flex-row items-center gap-5" style={{ marginBottom: 24 }}>
          <View
            className="w-16 h-16 rounded-full items-center justify-center shadow-xs"
            style={{ backgroundColor: avatarColor.hex }}
          >
            <Text className="text-xl font-bold text-light">
              {avatarInitials}
            </Text>
          </View>

          <View className="flex-1">
            <Text className="text-xs font-bold uppercase tracking-wider text-brand mb-2">
              Avatar Color Theme
            </Text>
            <View className="flex-row items-center gap-2.5 flex-wrap">
              {AVATAR_COLORS.map((col) => (
                <TouchableOpacity
                  key={col.name}
                  onPress={() => setAvatarColor(col)}
                  className="w-7 h-7 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: col.hex,
                    borderWidth: avatarColor.name === col.name ? 2 : 0,
                    borderColor: '#242021',
                    transform: [{ scale: avatarColor.name === col.name ? 1.1 : 1 }],
                  }}
                  activeOpacity={0.8}
                >
                  {avatarColor.name === col.name && (
                    <Icon name="checkmark" size={13} color="#ffffff" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Name Input - clean without left icon */}
        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
          required
          containerStyle={{ marginBottom: 18 }}
        />

        {/* Email Address Read-only Box */}
        <View className="w-full" style={{ marginBottom: 24 }}>
          <Text className="text-xs font-bold uppercase tracking-wider text-brand mb-2">
            Email Address
          </Text>
          <View className="w-full px-3.5 py-3 rounded-xl border border-muted/30 bg-light/70">
            <Text className="text-sm font-medium text-gray-500">
              {mockUser.email}
            </Text>
          </View>
          <Text className="text-xs text-gray-400 mt-1.5">
            Email cannot be changed here.
          </Text>
        </View>

        {/* Save Profile Button & Member Date Row */}
        <View className="pt-1">
          <Button
            variant="primary"
            isLoading={isSavingProfile}
            onPress={handleSaveProfile}
            size="md"
            className="w-full sm:w-auto py-3.5"
          >
            Save Profile Changes
          </Button>

          {profileSuccessMsg ? (
            <View className="flex-row items-center justify-center gap-1.5 mt-3">
              <Icon name="checkmark-circle" size={16} color="#059669" />
              <Text className="text-xs font-bold text-emerald-700">
                {profileSuccessMsg}
              </Text>
            </View>
          ) : (
            <Text className="text-xs text-gray-500 mt-3 text-center">
              Member since {mockUser.joinedDate}
            </Text>
          )}
        </View>
      </View>

      {/* SECTION 2: APP PREFERENCES */}
      <View
        className="bg-white rounded-2xl border border-muted/30 shadow-xs"
        style={{ padding: 24, marginBottom: 24 }}
      >
        <View
          className="flex-row items-center gap-2 border-b border-muted/20"
          style={{ paddingBottom: 16, marginBottom: 12 }}
        >
          <Icon name="options-outline" size={20} color="#242021" />
          <Text className="text-lg font-bold text-brand">
            App Preferences
          </Text>
        </View>

        <View className="divide-y divide-muted/20">
          <Toggle
            label="Email Notifications"
            description="Receive updates about shared spaces, quiz attempts, and community milestones."
            checked={preferences.emailNotifications}
            onChange={(val) =>
              setPreferences((prev) => ({ ...prev, emailNotifications: val }))
            }
          />

          <Toggle
            label="Study Streak Reminders"
            description="Get daily notifications to keep your active study streak going strong."
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

        <View style={{ paddingTop: 20 }}>
          <Button
            variant="primary"
            isLoading={isSavingPrefs}
            onPress={handleSavePreferences}
            size="md"
            className="w-full sm:w-auto py-3.5"
          >
            Save Preferences
          </Button>

          {prefsSuccessMsg ? (
            <View className="flex-row items-center justify-center gap-1.5 mt-3">
              <Icon name="checkmark-circle" size={16} color="#059669" />
              <Text className="text-xs font-bold text-emerald-700">
                {prefsSuccessMsg}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* SECTION 3: DANGER ZONE */}
      <View
        className="bg-rose-50/40 rounded-2xl border border-rose-200/80 shadow-xs"
        style={{ padding: 24, marginBottom: 24 }}
      >
        <View
          className="flex-row items-center gap-2 border-b border-rose-200/60"
          style={{ paddingBottom: 16, marginBottom: 16 }}
        >
          <Icon name="warning-outline" size={20} color="#e11d48" />
          <Text className="text-lg font-bold text-rose-900">
            Danger Zone
          </Text>
        </View>

        <View>
          <Text className="text-sm font-bold text-rose-900 mb-1">
            Delete Account
          </Text>
          <Text className="text-xs text-rose-700/80 leading-relaxed mb-4">
            Permanently remove your account, study spaces, flashcard decks, and quiz attempt records. This action cannot be undone.
          </Text>

          {!showDeleteConfirm ? (
            <TouchableOpacity
              onPress={() => setShowDeleteConfirm(true)}
              activeOpacity={0.8}
              className="bg-rose-600 active:bg-rose-700 py-2.5 px-4 rounded-xl self-start"
            >
              <Text className="text-xs font-bold text-white">
                Delete Account
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              className="rounded-xl bg-white border border-rose-200"
              style={{ padding: 16, marginTop: 8 }}
            >
              <Text className="text-xs font-bold text-rose-900 mb-3">
                Are you sure? All your study spaces, summaries, and quizzes will be erased immediately.
              </Text>
              <View className="flex-row items-center gap-2.5">
                <Button
                  variant="secondary"
                  size="sm"
                  onPress={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onPress={handleDeleteAccount}
                  className="flex-1 py-2.5"
                >
                  Confirm Delete
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
