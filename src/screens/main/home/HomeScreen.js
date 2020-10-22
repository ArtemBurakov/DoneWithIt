import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	FlatList,
	ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import SQLite from 'react-native-sqlite-storage'

const Item = ({ item }) => (
	<View style={styles.item}>
		<Text style={styles.title}>{item.name}</Text>
		<Text style={styles.title}>{item.text}</Text>
	</View>
);

const HomeScreen = ({ navigation }) => {
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState([]);

	const db = SQLite.openDatabase(
		{
			name: 'sqlite.db',
			createFromLocation : 1,
		}
	);

	const renderItem = ({ item }) => (
		<Item item = {item} />
	);

	useFocusEffect(
		React.useCallback(() => {
			db.transaction( tx => {
				tx.executeSql(
					'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, server_id INTEGER, sync_status	INTEGER, name TEXT, text TEXT, status INTEGER, created_at int, updated_at int)',
					[]
				);
				tx.executeSql('SELECT * FROM tasks', [], ( tx, results ) => {
					const tasks = [];

					for (let i = 0; i < results.rows.length; i++) {
						let row = results.rows.item(i);

						tasks.push({
							id: row.id,
							name: row.name,
							text: row.text
						});
					}

					setTasks(tasks);
					setLoading(false);
				});
			});
		}, [])
	);

	if (loading) {
		return <ActivityIndicator style={styles.container} size="large" color="#0000ff" />;
	}

	return (
		<View>
			<Button
				title="Add new task"
				onPress={() => navigation.navigate('Add Task')}
			/>
			<FlatList
				data={tasks}
				renderItem={renderItem}
				keyExtractor={item => item.id.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center"
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

export default HomeScreen;
