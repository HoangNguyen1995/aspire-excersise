import React from 'react';
import {View} from 'react-native';

const VerticalSpace = ({height = 0}: {height: number}) => {
  return (
    <View
      style={{
        height,
        width: '100%',
      }}
    />
  );
};

export default VerticalSpace;
