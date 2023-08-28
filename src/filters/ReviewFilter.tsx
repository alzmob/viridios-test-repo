import React,{ FunctionComponent } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ECText } from '../components/ECText';
import { StaticRatings } from '../components/ratings/StaticRatings';

interface ReviewFilterProps {
    onFilter: any;
    avgRating: string;    
    selected: boolean;
}

export const ReviewFilter: FunctionComponent<ReviewFilterProps> = ({
    onFilter, avgRating, selected
}) => {
    return (
        <Pressable
            style={[styles.chip, {backgroundColor: selected? '#c7c7c7' : 'white'}]}
            onPress={onFilter}>
            <StaticRatings
                stars={parseInt(avgRating, 10)}
                size={14}
                starStyle={{marginTop:0}}
            />
            <ECText
                textColor={'#4c4c4c'}
                fontSize={14}
                textAlign="center">
                & Up
            </ECText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row', 
        width: 160, 
        paddingVertical: 12, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 4, 
        marginLeft: 16, 
        marginTop: 16
    }
});