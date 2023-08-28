import React, {useState, useEffect, FunctionComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface FilterTypeItemProps {
	onPress?: any,
	text?: string,
	tab_id?: Number,
	selectedtab?: Number
}

export const FilterTypeItem: FunctionComponent<FilterTypeItemProps> = ({
	onPress, text, tab_id, selectedtab
}) => {

	const [selected, setSelected] = useState(false);

	useEffect(() => {
		if(tab_id === selectedtab) {
			setSelected(true);
		} else {
			setSelected(false);
		}

	}, [tab_id, selectedtab])

	return(
		<TouchableOpacity style={[styles.container,  selected && styles.selected]} onPress={onPress}>
			<Text style={[selected ? styles.selectedText : styles.text]}>{text}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	selected: {
		backgroundColor: '#e3f0d0'
	},
	text: {
		fontSize: 14,
		fontFamily: 'Poppins-Regular',
		color: '#4c4c4c',
		paddingVertical: 10,
		width: 120,
		paddingLeft: 8,		
	},
	selectedText: {
		fontSize: 14,
		fontFamily: 'Poppins-Regular',
		color: '#07733c',
		paddingVertical: 10,
		paddingLeft: 8,
		width: 120,
	}
});