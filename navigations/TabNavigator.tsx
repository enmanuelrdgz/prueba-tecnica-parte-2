import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Dashboard from "../screens/DashboardScreen"
import CreateProduct from "../screens/CreateProductScreen"
import Profile from "../screens/ProfileScreen"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const DashboardStack = createNativeStackNavigator()

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    </DashboardStack.Navigator>
  )
}

const CreateProductStack = createNativeStackNavigator()

const CreateProductStackScreen = () => {
  return (
    <CreateProductStack.Navigator screenOptions={{ headerShown: false }}>
      <CreateProductStack.Screen name="CreateProduct" component={CreateProduct} />
    </CreateProductStack.Navigator>
  )
}

const ProfileStack = createNativeStackNavigator()

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const insets = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Esta función se ejecuta para cada tab y determina qué icono mostrar
        tabBarIcon: ({ focused, color, size }) => {
          // Definimos un tipo específico para los nombres de iconos que vamos a usar
          // Esto le dice a TypeScript exactamente qué valores son válidos
          let iconName:
            | "stats-chart"
            | "stats-chart-outline"
            | "add-circle"
            | "add-circle-outline"
            | "person"
            | "person-outline"

          // Ahora TypeScript sabe que iconName solo puede ser uno de estos valores específicos
          if (route.name === "DashboardStack") {
            iconName = focused ? "stats-chart" : "stats-chart-outline"
          } else if (route.name === "CreateProductStack") {
            iconName = focused ? "add-circle" : "add-circle-outline"
          } else {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },

        // Configuración adicional de estilos para las tabs
        tabBarActiveTintColor: "#28a745", // Verde para admin
        tabBarInactiveTintColor: "#8E8E93", // Color cuando la tab está inactiva
        tabBarStyle: {
          backgroundColor: "#FFFFFF", // Fondo de la barra de tabs
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60 + insets.bottom, // Altura base + espacio seguro
        },

        // Ocultar el header por defecto ya que cada stack maneja el suyo
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStackScreen}
        options={{
          tabBarLabel: "Dashboard", // Etiqueta que aparece debajo del icono
        }}
      />
      <Tab.Screen
        name="CreateProductStack"
        component={CreateProductStackScreen}
        options={{
          tabBarLabel: "Add Product",
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
