import React, { FunctionComponent } from 'react';
import { FlatList, View, Platform, Dimensions } from 'react-native';
import { ECText } from '../components/ECText';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { addCertToFilter, addGradeToFilter, addOriginToFilter, addProcessingToFilter, addTypeToFilter, addWarehouseToFilter } from './filterSlice';

interface FilterCheckBoxProps {
    data: any;  
    tabIndex: number;  
}

export const FilterCheckBox: FunctionComponent<FilterCheckBoxProps> = ({
    data, tabIndex
}) => {

    const dispatch = useDispatch();

    return (
        <>
            <FlatList 
                data={data}
                bounces={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginHorizontal: 8}}>					
                        {
                            Platform.OS === 'ios' 
                            ?
                            <CheckBox
                                style={{width: 20, height: 20, marginRight: 4}}
                                disabled={false}
                                value={item.isChecked}
                                boxType="square"
                                onCheckColor="#07733c"
                                onTintColor="#07733c"
                                onValueChange={(value) => {	
                                    const newItem = {...item, isChecked: value};	
                                    switch (tabIndex) {
                                        case 0:
                                            dispatch(addOriginToFilter(newItem));
                                            break;
                                        case 1:
                                            dispatch(addTypeToFilter(newItem));
                                            break;
                                        case 2:
                                            dispatch(addGradeToFilter(newItem));
                                            break;
                                        case 3:
                                            dispatch(addProcessingToFilter(newItem));
                                            break;
                                        case 4:
                                            dispatch(addCertToFilter(newItem));
                                            break;
                                        case 5:
                                            // dispatch(addProcessingToFilter(newItem));
                                            break;
                                        case 6:
                                            // dispatch(addOriginToFilter(newItem));
                                            break;
                                        case 7:
                                            dispatch(addWarehouseToFilter(newItem));
                                            break;
                                        case 8:
                                            // dispatch(addOriginToFilter(newItem));
                                            break;
                                        case 9:
                                            // dispatch(addOriginToFilter(newItem));
                                        break;
                                    
                                        default:
                                            break;
                                    }
                                    
                                }}
                            />
                            :
                            <CheckBox	
                                // style={{width: 15, height: 15, marginRight: 14, marginLeft: -6}}							
                                disabled={false}
                                value={item.isChecked}
                                tintColors={{true: '#07733c', false: '#c7c7c7'}}
                                onValueChange={(value) => {											
                                    const newItem = {...item, isChecked: value};	
                                    switch (tabIndex) {
                                        case 0:
                                            dispatch(addOriginToFilter(newItem));
                                            break;
                                        case 1:
                                            dispatch(addTypeToFilter(newItem));
                                            break;
                                        case 2:
                                            dispatch(addGradeToFilter(newItem));
                                            break;
                                        case 3:
                                            dispatch(addProcessingToFilter(newItem));
                                            break;
                                        case 4:
                                            dispatch(addCertToFilter(newItem));
                                            break;
                                        case 5:
                                            // dispatch(addProcessingToFilter(newItem));
                                            break;
                                        case 6:
                                            // dispatch(addOriginToFilter(newItem));
                                            break;
                                        case 7:
                                            dispatch(addWarehouseToFilter(newItem));
                                            break;
                                        case 8:
                                            // dispatch(addOriginToFilter(newItem));
                                            break;
                                        case 9:
                                            // dispatch(addOriginToFilter(newItem));
                                        break;
                                    
                                        default:
                                            break;
                                    }
                                }}
                            />
                        }
                        <ECText textColor='black' fontSize={10} style={{alignSelf: 'center', width: Dimensions.get('window').width*0.6 - 8*2 - 4 - 20}}>{item.text}</ECText>
                    </View>
                )}
            />
        </>
    );
}
