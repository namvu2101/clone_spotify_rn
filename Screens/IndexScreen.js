import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import Home from './Main';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListSong from './ListSongs';
import Artist from './Artist';
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tabs.Navigator screenOptions={{headerShown: false,tabBarStyle: {backgroundColor:'black'},tabBarActiveTintColor:'white'}}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Artists"
        component={Artist}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Account"
        component={LikeSongsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cards-heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Spotify"
        component={CreateAccount}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="spotify" color={color} size={size} />
          ),
        }}
      /> */}
    </Tabs.Navigator>
  );
}
export default function IndexScreen() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ListSong" component={ListSong} />
          <Stack.Screen name="Artists" component={Artist} />
          <Stack.Screen name="Tabs" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
