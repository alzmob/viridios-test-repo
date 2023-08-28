import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ImageBackground, ScrollView, FlatList, Dimensions} from 'react-native';
import {useAppTheme} from '../theme';
import {Header} from '../components/header/Header';
import { MyStatusBar } from '../components/ECStatusBar';

export const ChartScreen = () => {
  return (
		<>
            <MyStatusBar></MyStatusBar>
            
            <View style={styles.container}>
                <Header isCountryFilter={true} isSideMenu={true} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Notifications!</Text>
                </View>				
            </View>
        </>
  );
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3b3b3b'
	},
});