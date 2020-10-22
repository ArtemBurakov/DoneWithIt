import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Button,
	TextInput
} from 'react-native';

import SQLite from 'react-native-sqlite-storage'

const AddTaskScreen = ({ navigation }) => {
	const [taskName, setTaskName] = useState('');
	const [taskText, setTaskText] = useState('');

	const db = SQLite.openDatabase(
		{
			name: 'sqlite.db',
			createFromLocation : 1,
		}
	);

	const addTask = () => {
		if (!taskName) {
			alert('Please fill Task Name');
			return;
		}

		if (!taskText) {
			alert('Please fill Task Description');
			return;
		}

		db.transaction( tx => {
			tx.executeSql(
				'INSERT INTO tasks (name, text, status, sync_status) VALUES (?,?,?,?)',
				[taskName, taskText, 10, 1],
				(tx, results) => {
					if (results.rowsAffected > 0) {
						console.log('Task added successful....');

						navigation.navigate('Home');
					} else console.log('Adding task failed!');
				}
			);
		});
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Enter Name"
				onChangeText={(taskName) => setTaskName(taskName)}
				style={styles.container}
			/>
			<TextInput
				placeholder="Enter Description"
				onChangeText={(taskText) => setTaskText(taskText)}
				style={styles.container}
			/>
			<Button
				title="Add"
				onPress={addTask}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center"
	}
});

export default AddTaskScreen;
