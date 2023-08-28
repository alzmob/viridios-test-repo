import {StyleProp, ViewStyle} from 'react-native';
import React, {FunctionComponent} from 'react';
import AirbnbRating from './AirbnbRatings';

interface ECRatingStarsProps {
  starStyle: StyleProp<ViewStyle>;
  onRatingChange?: (rating: number) => void;
  showRating: boolean;
  count: number;
  initialRating?: number;
  selectedColor: string;
  unselectedColor: string;
  size: number;
  isDisabled: boolean;
}

export const ECRatingStars: FunctionComponent<ECRatingStarsProps> = ({
  starStyle,
  onRatingChange,
  showRating,
  count,
  initialRating,
  selectedColor,
  unselectedColor,
  size,
  isDisabled,
}) => {
  return (
    <AirbnbRating
      starStyle={starStyle}
      onFinishRating={onRatingChange}
      showRating={showRating}
      count={count}
      defaultRating={initialRating}
      size={size}
      isDisabled={isDisabled}
      selectedColor={selectedColor}
      unselectedColor={unselectedColor}
    />
  );
};
