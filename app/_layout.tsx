import { Stack } from 'expo-router';
import { VolumesProvider } from '../context/VolumesContext';

export default function RootLayout() {
  return (
    <VolumesProvider>
      <Stack screenOptions={{ headerShown: true }} />
    </VolumesProvider>
  );
}
