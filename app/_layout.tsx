import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';



export default function RootLayout() {
  

  return (
    <>
      <StatusBar style='light'/>
      <Stack
        screenOptions={{
          headerShown:false,
          contentStyle:{
            backgroundColor:'white',
          },
          animation:"slide_from_right",
          header:()=>null,
          navigationBarHidden:true
        }}
      >
        <Stack.Screen name="index" options={{ headerShown:false}}/>
        {/* <Stack.Screen name='auth'/> */}
      </Stack>
    </>
  );
}
