import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ImageBackground, ScrollView, FlatList, Dimensions} from 'react-native';
import { TopSellingCountry } from './TopSellingCountry';

const COUNTRIES = [
	{
	  name: "Ethiopia",
	  desc: "The birthplace of coffee, and the beverage is immensely popular there, with Ethiopians among the top coffee consumers in Africa.",
	  img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-1.jpg"
	},
	{
	  name: "Brazil",
	  desc: "For the past 150 years, Brazil has been the world's largest coffee producer, producing roughly a third of all coffee",
	  img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-2.jpg"
	},
	{
	  name: "Vietnam",
	  desc: "Vietnam is the world's second-largest producer of Robusta coffee and the second-largest producer of coffee overall.",
	  img:"https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-3.jpg"
	},
	{
	  name: "Columbia",
	  desc: "Colombian coffee is one of the major participants in the worldwide coffee market, accounting for around 12% of global coffee supply.",
	  img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-4.jpg"
	},
	{
		name: "Indonesia",
		desc: "Indonesia was one of the first countries in the world to start growing coffee commercially—before much of Africa, before most of Asia, and before the Americas.",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-5.jpg"
	  },
	  {
		name: "Honduras",
		desc: "Honduras is a coffee-producing country, ranking fifth globally in terms of coffee production, in addition to being the largest producer in Central America and third-largest in Latin America.",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-6.jpg"
	  },
	  {
		name: "Gautemala",
		desc: "Guatemala was Central America's top producer of coffee for most of the 20th and the beginning of the 21st century, until being overtaken by Honduras in 2011.",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-7.jpg"
	  },
	  {
		name: "Kenya",
		desc: "Known for its consistently rich flavor along with a deep, wine-like acidity and pleasant aroma, Kenyan coffee beans have distinctly bright taste with complex tones of fruit and berry.",
		img: "https://adulis-web.s3.us-west-1.amazonaws.com/images/landing_page/product-8.jpg"
	  },
	
];



export const TopstoryScreen = () => {
    return (
        <FlatList				
            data={COUNTRIES}
            renderItem={({ item }) => (
                <TopSellingCountry 
                    title={item.name}
                    desc={item.desc}
                    img={item.img}
                    onPress={()=> {
                        
                    }}
                />
            )}  
            keyExtractor={(item, index) => 'Home' + index.toString()}
        />
    )
}