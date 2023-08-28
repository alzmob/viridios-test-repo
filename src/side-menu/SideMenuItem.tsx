import React, {FunctionComponent} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ECText} from '../components/ECText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface SideMenuItemProps {
	text?: string,
	onPress?: any,
	isTitle?: boolean
}

export const SideMenuItem: FunctionComponent<SideMenuItemProps> = (
	{text, isTitle, onPress}
	) => {
	return (
		<>
			{isTitle ? (
				<TouchableOpacity onPress={onPress} style={styles.title} >
					<ECText textColor='white' fontSize={18}>
						{text} 
						{/* <FontAwesome name="chevron-down" fontSize="12"></FontAwesome> */}
					</ECText>
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={onPress} style={styles.subtitle} >
					<ECText textColor='white' fontSize={12}>
						{text}
					</ECText>
				</TouchableOpacity>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	subtitle: {
		marginLeft: 10,
		marginBottom: 24,
	},
	title: {
		marginBottom: 24,
	}
});