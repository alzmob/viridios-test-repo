import {Keyboard, StyleSheet, View, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {ECEmailInputField} from '../components/ECEmailInputField';
// import {useTranslation} from 'react-i18next';
import {useDebouncedCallback} from 'use-debounce';
import { getProductsThunk } from './searchSlice';
import config from '../../config';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppTheme } from '../theme';

interface FormData {
  search: string;
}

const SearchHeader: FunctionComponent<{}> = () => {
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
  const {
    colors: {statusBarBackgroundColor},
  } = useAppTheme();
  const dispatch = useDispatch();
  const {navigate, goBack} = useNavigation();
  const filters = useSelector((state: RootState) => state.filter.filters);
  const [searchText, setSearchText] = useState<string>();

  const debounced = useDebouncedCallback(param => {
    let url: string = '';
    setSearchText(param);
    if (filters) {     
      url = config.GETALLPRODUCTS + '?' + filters + '&search=' + param;      
    } else {
      console.log('Filter Undefined');
      url = config.GETALLPRODUCTS + '?search=' + param;
    }    
    dispatch(getProductsThunk(url));
  }, 700);

  
  return (
    <View style={[styles.container, {backgroundColor: statusBarBackgroundColor}]}>
      <View style={styles.iconContainer}>        
          <AntDesign
            name="arrowleft"
            color={'black'}
            onPress={() => goBack()}
            size={24}
          />
      </View>
			<View style={styles.searchBar}>
        <Image source={require('../../assets/images/search.png')} resizeMode="contain" style={{width: 12, height: 12}}/>
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
              placeholder="Yirgacheffe  Coffee"
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
      <View style={{width: '16%'}}></View>
    </View>
    
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {    
		height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: '16%',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  searchBar: {
		width: '68%',
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 4,
    height: 40,
    paddingHorizontal: 8
	},
  searchInput: {
    width: '88%',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#4c4c4c',
    padding: 10,
  },
});
