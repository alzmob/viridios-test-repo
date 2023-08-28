import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useAppTheme} from '../theme';

export const ProductsSkeleton = () => {
  const {
    colors: {skeletonBackgroundColor, skeletonHighlightColor},
  } = useAppTheme();
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        backgroundColor={skeletonBackgroundColor}
        highlightColor={skeletonHighlightColor}>
          <SkeletonPlaceholder.Item flexDirection='row'>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={130}
              borderRadius={10}
              marginRight={20}
              marginBottom={5}
            />            
            <SkeletonPlaceholder.Item flexDirection='column' >
              <SkeletonPlaceholder.Item
                width={150}
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={80}
                height={20}
                borderRadius={4}
                marginBottom={10}
              />
            </SkeletonPlaceholder.Item>
          
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export const SkeletonMapped = () => {
  const skeletonArray = [0, 1, 2, 3, 4, 5];
  return (
    <View style={styles.containerContent}>
      <FlatList
        scrollEnabled={true}
        data={skeletonArray}
        renderItem={(_itemData: any) => <ProductsSkeleton />}
        keyExtractor={(item: {toString: () => any}) => item.toString()}
        maxToRenderPerBatch={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    width: '48%',
    marginTop: 10,
    marginRight: 10,
  },
});
