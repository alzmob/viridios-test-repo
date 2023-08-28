import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
  Text,
} from 'react-native';
import React from 'react';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/preparingApp.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Preparing your app</Text>
          <ActivityIndicator color={'white'} size="large" />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textWrapper: {
    height: 170,
    paddingBottom: 25,
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
});
