import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/main/home/HomeScreen'
import SettingsScreen from './src/screens/main/settings/SettingsScreen'
import AddTaskScreen from './src/screens/main/task/AddTaskScreen'

const HomeStack = createStackNavigator();

function HomeStackScreen() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="Home" component={HomeScreen} />
			<HomeStack.Screen name="Add Task" component={AddTaskScreen} />
		</HomeStack.Navigator>
	);
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Home') {
							iconName = focused
								? 'ios-home'
								: 'ios-home-outline';
						} else if (route.name === 'Settings') {
							iconName = focused
								? 'ios-settings'
								: 'ios-settings-outline';
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
				})}
				tabBarOptions={{
					activeTintColor: 'tomato',
					inactiveTintColor: 'black',
				}}
			>
				<Tab.Screen name="Home" component={HomeStackScreen} />
				<Tab.Screen name="Settings" component={SettingsStackScreen} />
			</Tab.Navigator>
    	</NavigationContainer>
	);
}

export default App;
