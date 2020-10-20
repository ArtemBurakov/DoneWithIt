import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator
} from 'react-native';

import SQLite from 'react-native-sqlite-storage'

const Item = ({ item }) => (
	<View style={styles.item}>
		<Text style={styles.title}>{item.name}</Text>
		<Text style={styles.title}>{item.description}</Text>
	</View>
);

const App = () => {
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

	useEffect(() => {
		db.transaction( tx => {
			tx.executeSql('SELECT * FROM tasks', [], ( tx, results ) => {
				console.log('Tasks = ' + results.rows.length);

				const tasks = [];

				for (let i = 0; i < results.rows.length; i++) {
					let row = results.rows.item(i);

					tasks.push({
						id: row.id,
						name: row.name,
						description: row.description
					});
				}

				setTasks(tasks);
				setLoading(false);

				if (res.rows.length == 0) {
					console.log('Creating `tasks` table....');

					tx.executeSql('DROP TABLE IF EXISTS tasks', []);
					tx.executeSql(
						'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, server_id INTEGER, sync_status	INTEGER, name TEXT, description	TEXT, status INTEGER, created_at int, updated_at int)',
						[]
					);
				}
			});
		});
	}, []);

	if (loading) {
		return <ActivityIndicator style={styles.container} size="large" color="#0000ff" />;
	}

	return (
		<View>
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

export default App;
