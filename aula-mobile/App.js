import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ClientesScreen from './src/screens/ClientesScreen';
import ClienteFormScreen from './src/screens/ClienteFormScreen';
import ClienteDetalheScreen from './src/screens/ClienteDetalheScreen';
import { cores } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: cores.fundo },
            headerTintColor: cores.primaria,
            headerTitleStyle: { color: cores.texto },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="Clientes" component={ClientesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Detalhe" component={ClienteDetalheScreen} options={{ title: 'Cliente' }} />
          <Stack.Screen name="Formulario" component={ClienteFormScreen} options={{ title: 'Cliente' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
