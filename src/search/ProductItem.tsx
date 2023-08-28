import React, { useState , FunctionComponent, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ImageBackground } from 'react-native';
import {StaticRatings} from '../components/ratings/StaticRatings';
import { ReviewCount } from './searchSlice';

interface ProductItemProps {
	title: string;
	pricePerLb: string;
	moq: string;
	packageunit: string;
	lbperpackage: number;
	img: string;
	rating: ReviewCount;
	offerFreeSample: string;
	aval_qty: string;
	origin: string;
	grade: string;
	onPress?: any;
}

export const ProductItem: FunctionComponent<ProductItemProps>= ({
	title, pricePerLb, moq, packageunit, lbperpackage, rating, aval_qty, origin, grade, onPress, img, offerFreeSample
}) => {

	const [price, setPrice] = useState<number>();

	const getTotalReviewCount = (reviewCounts: ReviewCount) => {
        const count1 = reviewCounts[1];
        const count2 = reviewCounts[2];
        const count3 = reviewCounts[3];
        const count4 = reviewCounts[4];
        const count5 = reviewCounts[5];
        const total = count1+count2+count3+count4+count5;
        return total;
    }

    const getAvgRating = (reviewCounts: ReviewCount) => {
        const count1 = reviewCounts[1];
        const count2 = reviewCounts[2];
        const count3 = reviewCounts[3];
        const count4 = reviewCounts[4];
        const count5 = reviewCounts[5];
        const avg = (1*count1 + 2*count2 + 3*count3 + 4*count4 + 5*count5) / (count1+count2+count3+count4+count5);
        return avg;
    }

	useEffect(() => {		
		const pri = parseFloat(pricePerLb) * lbperpackage * parseFloat(moq);
		setPrice(pri);
	});

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View>
				<Image source={{uri: img}} resizeMode="cover" style={styles.image}/>
				{offerFreeSample == '0' && <View style={{backgroundColor: '#07733c', width: 100, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', position: 'absolute'}}>
					<Text style={{fontFamily: 'Poppins-Italic', fontSize: 14, color: 'white'}}>Free Sample</Text>
				</View>}
			</View>
			
			<View style={styles.descWrapper}>
				<Text style={styles.title}>{title}</Text>
				<Text style={{fontSize: 12, fontFamily: 'Poppins-Regular', color: 'black', marginTop:4}}>Origin - {origin}</Text>
				<Text style={{fontSize: 12, fontFamily: 'Poppins-Regular', color: 'black', marginTop:4}}>Grade - {grade}</Text>
				<Text style={{fontSize: 14, fontFamily: 'Poppins-SemiBold', color: 'black', marginTop:4}}>MOQ - {moq} {packageunit.toLocaleUpperCase()}{Number(moq) == 1 ? '': 'S'}</Text>
				<Text style={{fontSize: 14, fontFamily: 'Poppins-SemiBold', color: 'black', marginTop:4}}>AVBL - {aval_qty} {packageunit.toLocaleUpperCase()}{Number(aval_qty) == 1 ? '': 'S'}</Text>
				<View style={styles.ratingWrapper}>
					<StaticRatings
			          stars={parseInt(getAvgRating(rating).toString(), 10)}
			          size={18}
			          starStyle={{marginTop:0}}
			        />
			        <Text style={styles.ratingCount}>{getTotalReviewCount(rating)}</Text>
				</View>
				
				<Text style={styles.price}>${price} (${parseFloat(pricePerLb) * lbperpackage}/{packageunit.charAt(0).toUpperCase() + packageunit.slice(1)})</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
		marginBottom: 16
	},
	image: {
		width: 150, 
		height: 180
	},
	descWrapper: {
		flexDirection: 'column', 
		width: '60%', 
		marginLeft: 8
	},
	title: {
		fontSize: 16, 
		fontFamily: 'Poppins-Regular', 
	},
	ratingWrapper: {
		flexDirection: 'row', 
		alignItems: 'center', 
		marginTop: 4
	},
	ratingCount: {
		fontSize: 14, 
		fontFamily: 'Poppins-SemiBold', 
		color: '#4c4c4c'
	},
	price: {
		fontSize: 14, 
		fontFamily: 'Poppins-Bold', 
		color: 'black'
	}
});

