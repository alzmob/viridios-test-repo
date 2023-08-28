import React, {FunctionComponent, useMemo} from 'react';
import {ImageStyle} from 'react-native';
import {useAppTheme} from '../../theme';
import {ECRatingStars} from './ECRatings';

interface StaticRatingsProps {
  stars: number | undefined;
  size?: number;
  starStyle?: ImageStyle;
}

export const StaticRatings: FunctionComponent<StaticRatingsProps> = ({
  stars = 0,
  size = 9,
  starStyle,
}) => {
  const {
    colors: {starSelectedColor, starUnseletedColor},
  } = useAppTheme();
  const ratings = useMemo(
    () => (
      <ECRatingStars
        starStyle={starStyle}
        showRating={false}
        initialRating={stars}
        count={5}
        isDisabled
        selectedColor={starSelectedColor}
        unselectedColor={starUnseletedColor}
        size={size}
      />
    ),
    [starStyle, stars, starSelectedColor, starUnseletedColor, size],
  );
  return <>{ratings}</>;
};
