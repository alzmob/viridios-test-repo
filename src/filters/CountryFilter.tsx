import React, {FunctionComponent, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import {ECText} from '../components/ECText'

interface CountryFilterProps {
	onPress?: any,
	text?: string,
	tab_id?: number,
	selectedtab?: number
}

export const CountryFilter: FunctionComponent<CountryFilterProps> = ({
	onPress, text, tab_id, selectedtab
}) => {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		// if(tab_id === selectedtab) {
		// 	setSelected(true);
		// } else {
		// 	setSelected(false);
		// }

	}, [tab_id, selectedtab]);


	
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			{selected ? 
				<ECText textColor="black" fontSize={14} bold style={{alignSelf: 'center'}}>{text}</ECText> : <ECText textColor="black" fontSize={11} style={{alignSelf: 'center'}}>{text}</ECText>
			}
			{selected && <View style={{width: '100%', height: 1, backgroundColor: 'green'}}/>}			
		</TouchableOpacity>
	);

}

const styles = StyleSheet.create({
	container: {
		marginRight: 12, 
		height: '100%', 
		justifyContent: 'center',
	},
});