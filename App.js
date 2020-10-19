import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';

import SQLite from 'react-native-sqlite-storage'

class App extends Component {
	constructor(props) {
		super(props);

		this.state={
			taskList:[],
		}

		db = SQLite.openDatabase(
			{
				name: 'sqlite.db',
				createFromLocation : 1,
			},
			this.success.bind(this),
			this.fail
		);
	}

	success = () => {
		db.transaction(tx => {
			tx.executeSql('SELECT * FROM tasks', [], (tx, results) => {
				let data = results.rows.length;
				let tasks = [];

				for (let i = 0; i < results.rows.length; i++) {
					tasks.push(results.rows.item(i));
				}

				this.setState({ taskList:tasks });
			});
		});
	}

	fail = (error) => {
		console.error(error) // logging out error if there is one
	}

	render() {
		return (
			<View>
				<ScrollView>
					{
						this.state.taskList.map(function(item, i){
							return (
								<Text key={i} style={styles.card}>
									<Text>{item.name}</Text>
									<Text>{item.description}</Text>
								</Text>
							)
						})
					}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: "#eaeaea"
	},
});

export default App;
