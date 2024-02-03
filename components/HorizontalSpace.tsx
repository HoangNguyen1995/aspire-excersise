import React from 'react';
import {View} from 'react-native';

const HorizontalSpace = ({width = 0}: {width: number}) => {
  return (
    <View
      style={{
        width,
        height: '100%',
      }}
    />
  );
};

export default HorizontalSpace;
