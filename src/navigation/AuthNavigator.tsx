import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import PrivacyScreen from '../screens/account/PrivacyScreen';
import LegalDocScreen from '../screens/account/LegalDocScreen';
import { colors } from '../theme';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * Auth stack, presented as a modal by the root navigator so it can be
 * opened from anywhere and dismissed on success without losing the
 * caller's navigation state. Headers are hidden — each screen owns its chrome.
 */
export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="LegalDoc" component={LegalDocScreen} />
    </Stack.Navigator>
  );
}
