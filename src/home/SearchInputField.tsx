import {Keyboard, StyleSheet, View, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {ECEmailInputField} from '../components/ECEmailInputField';
// import {useTranslation} from 'react-i18next';
import {useDebouncedCallback} from 'use-debounce';
import { getProductsThunk } from '../search/searchSlice';
import config from '../../config';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';

interface FormData {
  search: string;
}

const SearchInputField: FunctionComponent<{}> = () => {
  const {
    control,
    formState: {errors},
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      search: '',
    },
  });
  // const {t} = useTranslation('products');
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const filters = useSelector((state: RootState) => state.filter.filters);
  const [searchText, setSearchText] = useState<string>();

  const debounced = useDebouncedCallback(param => {
    let url: string = '';
    setSearchText(param);
    if (filters) {     
      url = config.GETALLPRODUCTS + '?' + filters + '&search=' + param;      
    } else {
      url = config.GETALLPRODUCTS + '?search=' + param;
    }    
    dispatch(getProductsThunk(url));
  }, 700);

  
  return (
    <View style={styles.searchBar}>
			<View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: '',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Coffee"
              placeholderTextColor="#cccccc"
              style={styles.searchInput}            
              returnKeyLabel="done"
              returnKeyType="done"
              blurOnSubmit={false}
              autoCapitalize="none"
              onChangeText={e => onChange(() => debounced(e))}
              onSubmitEditing={Keyboard.dismiss}
              value={value}            
            />
          )}
          name="search"
        />
      </View>
      <TouchableOpacity onPress={() => {
        console.log('search text', searchText);
        if (searchText) {
          navigate('Search');
        } else {          
          navigate('Search', {isAllProducts: true, allFilter: true});
        }
        
      }}>
        <Image source={require('../../assets/images/search.png')} resizeMode="contain" style={{width: 30, height: 30}}/>
      </TouchableOpacity>
    </View>
    
  );
};

export default SearchInputField;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
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
  searchInput: {
    height: 50,
    width: 200,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#4c4c4c',
    padding: 10,
    backgroundColor: 'white'
  },
});
