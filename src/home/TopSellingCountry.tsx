import React, {FunctionComponent} from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface TopSellingCountryProps {
	onPress?: any;
	title: string;
    desc: string;
    img: string;
    posted_date: string;
    categories: string[];
}

export const TopSellingCountry: FunctionComponent<TopSellingCountryProps> = ({
	onPress, title, desc, img, categories, posted_date
}) => {	

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.categoryheader}>
                <View style={styles.companylogo}>
                    <Image source={require('../../assets/images/viridios_logo.png')} resizeMode="contain" style={styles.image}></Image>
                </View>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <Text style={styles.titleDesc} numberOfLines={2}>{desc}</Text>
            <View style={styles.categoryarea}>
                {categories.map((item) => {
                    return (
                        <>
                            <View style={styles.categoryitem}>
                                <Text style={styles.categorytext}>{item}</Text>
                            </View>
                        </>
                    )
                })}
            </View>
            <View style={styles.categoryfooter}>
                <Text style={styles.posteddate}>{posted_date}</Text>
                <Text style={styles.divider}>|</Text>
                <AntDesign
                    name="like2"
                    color={'white'}
                    size={14}
                />
            </View>
		</TouchableOpacity>
	);

}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
        borderLeftColor: '#88ad1f',
        borderLeftWidth: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.54,
        shadowRadius: 6.27,
        backgroundColor: '#1b1b1b',
        marginBottom: 20,
        padding: 20
	},
    categoryheader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    companylogo: {
        width: 30,
        height: 30
    },
    image: {
        height: '100%',
        width: '100%'
    },
    titleText: {
        fontSize: 14,
		color: 'white',
    },
    titleDesc: {
        fontSize: 16,
		color: 'white',
		// fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
		marginBottom: 15,
        marginTop: 15,
    },
    categoryarea: {
        display: 'flex',
        flexWrap: 'nowrap',
        gap: 10,
        flexDirection: 'row'
    },
    categoryitem: {
        color: 'white',
        backgroundColor: '#3b3b3b',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
    },
    categorytext: {
        color: 'white',
        fontSize: 12
    },
    categoryfooter: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    posteddate: {
        color: 'white',
        fontSize: 12
    },
    divider: {
        color: 'white',
        fontSize: 16
    }
});