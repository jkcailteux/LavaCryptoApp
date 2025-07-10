import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <>
            <StatusBar style="light" backgroundColor="#1a1a1a" translucent={false} />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#1a1a1a' },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        contentStyle: { backgroundColor: '#1a1a1a' },
                    }}
                />
            </Stack>
        </>
    );
} 