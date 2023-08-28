import React, {FunctionComponent, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import {ECText} from '../components/ECText'

interface ShippingruleFilterProps {
	onPress?: any;
	text: string;
	tab_id?: number;
	selectedtab?: number;
	count: number;
}

export const ShippingruleFilter: FunctionComponent<ShippingruleFilterProps> = ({
	onPress, text, tab_id, selectedtab, count
}) => {
	const [selected, setSelected] = useState(false);
	const textCap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

	useEffect(() => {
		if(tab_id === selectedtab) {
			setSelected(true);
		} else {
			setSelected(false);
		}

	}, [tab_id, selectedtab])

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			{selected ? 
				<ECText textColor="black" fontSize={12} bold style={{alignSelf: 'center'}}>{textCap(text)}({count})</ECText> 
				: 
				<ECText textColor="black" fontSize={12} style={{alignSelf: 'center'}}>{textCap(text)}({count})</ECText>
			}
			{selected && <View style={{width: '100%', height: 1, backgroundColor: 'green'}}/>}			
		</TouchableOpacity>
	);

}

const styles = StyleSheet.create({
	container: {		
		height: '100%', 
		justifyContent: 'center',
		marginRight: 12
	},
});