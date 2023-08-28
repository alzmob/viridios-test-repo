import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ImageBackground, ScrollView, FlatList, Dimensions} from 'react-native';
import {useAppTheme} from '../theme';
import { TopSellingCountry } from './TopSellingCountry';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addOneOriginToFilter, setFilters } from '../filters/filterSlice';
import { RootState } from '../store';
import AntDesign from 'react-native-vector-icons/AntDesign';

const COUNTRIES = [
	{
		name: "Argus",
		desc: "Australlian privately-owned agricultural enterprise Sundoen Pastoral and New Zealand hydrogen",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-1.jpg",
		categories: [ "hydrogen fuels", "renewable energy", "+1"],
		posted_date: "4 days ago"
	},
	{
		name: "Gulf Business",
		desc: "UAE's ADNOC partners with Occidental to explore CCU investments",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-2.jpg",
		categories: ["removal", "technology-based"],
		posted_date: "9 days ago"
	},
	{
		name: "Argus",
		desc: "Australlian privately-owned agricultural enterprise Sundoen Pastoral and New Zealand hydrogen",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-1.jpg",
		categories: [ "hydrogen fuels", "renewable energy", "+1"],
		posted_date: "4 days ago"
	},
	{
		name: "Gulf Business",
		desc: "UAE's ADNOC partners with Occidental to explore CCU investments",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-2.jpg",
		categories: ["removal", "technology-based"],
		posted_date: "9 days ago"
	},
	{
		name: "Argus",
		desc: "Australlian privately-owned agricultural enterprise Sundoen Pastoral and New Zealand hydrogen",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-1.jpg",
		categories: [ "hydrogen fuels", "renewable energy", "+1"],
		posted_date: "4 days ago"
	},
	{
		name: "Gulf Business",
		desc: "UAE's ADNOC partners with Occidental to explore CCU investments",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-2.jpg",
		categories: ["removal", "technology-based"],
		posted_date: "9 days ago"
	},
];

export const MainHomeScreen = () => {

	const {
		colors: {headerBackgroundColor}
	} = useAppTheme();

	const {navigate} = useNavigation();
	const dispatch = useDispatch();

	const applyCountryFilters = (slug: string) => {
		
	}

	return (
		<View style={styles.maincontent}>
            <FlatList				
                data={COUNTRIES}
                renderItem={({ item }) => (
                    <TopSellingCountry 
                        title={item.name}
                        desc={item.desc}
                        img={item.img}
						categories={item.categories}
						posted_date={item.posted_date}
                        onPress={()=> {
                            dispatch(addOneOriginToFilter(item.name));	
                            const slug: string = item.name
                            applyCountryFilters(slug.toLowerCase());	
                        }}
                    />
                )}  
                keyExtractor={(item, index) => 'Home' + index.toString()}
                ListHeaderComponent={
                    <View style={styles.disclaimerarea}>
                        <Text style={styles.topSellingCountriestext}>Disclaimer</Text>
                        <AntDesign
                            name="infocirlceo"
                            color={'#88ad1f'}
                            size={14}
                        />
                    </View>					
                }
            />
				
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3b3b3b'
	},
	maincontent: {
		backgroundColor: '#3b3b3b'
	},
	scrollView: {
	},
	listHeaderImage: {
		height: Dimensions.get('window').height - 140
	},
	listFooterImage: {
		height: Dimensions.get('window').height - 300,
		alignItems: 'center',
		justifyContent: 'center'
	},
	listHeadertext: {
		fontSize: 36,
		color: 'white',
		fontFamily: 'Poppins-Bold',
		alignSelf: 'center',
		marginTop: '15%'
	},
	searchBar: {
		width: '75%',
		height: 56,
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		borderRadius: 4,
		paddingHorizontal: 16,
		marginTop: 40
	},	
	sellerSUBoldtext: {
		fontSize: 16,
		color: 'white',
		fontFamily: 'Poppins-SemiBold',
		alignSelf: 'center',
		width: 110
	},
	sellerSUtext: {
		fontSize: 14,
		color: 'white',
		fontFamily: 'Poppins-Regular',
		width: 186,
		textAlign: 'center',
		marginTop: 16,
	},
	sellerBtntext: {
		fontSize: 14,
		color: '#07733c',
		fontFamily: 'Poppins-Medium',
		alignSelf: 'center',
	},
	sellerSUButton: {
		width: 186,
		height: 45,
		backgroundColor: 'white',
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 32
	},
	testimonial: {
		margin: 20
	},
	tmText: {
		fontSize: 14,
		color: '#07733c',
		fontFamily: 'Poppins-Medium',
	},
	tmBoldText: {
		fontSize: 16,
		color: '#07733c',
		fontFamily: 'Poppins-SemiBold',
		width: 140
	},
	topSellingCountriestext: {
		fontSize: 14,
		color: '#88ad1f',
	},
	viewMoreText: {
		fontSize: 14,
		color: 'white',
		fontFamily: 'Poppins-Medium',
		alignSelf: 'center',
	},
	viewMoreButton: {
		height: 45,
		backgroundColor: '#07733c',
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 32,
		marginTop: 16,
		marginHorizontal: 50
	},
	disclaimerarea: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
		marginTop: 20,
		marginBottom: 20,
		marginRight: 20,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	// swiper for testimonial
	wrapper: {
	},
	slide: {
		flexDirection: 'row',
		backgroundColor: 'white',
	},	
	tsText: {
		fontSize: 14,
		color: 'grey',
		fontFamily: 'Poppins-Medium',
		paddingHorizontal: 10,
		width: Dimensions.get('window').width - 160 - 40
	},
});