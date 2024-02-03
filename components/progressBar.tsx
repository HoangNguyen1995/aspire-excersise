import React, {useEffect, useState, useCallback} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/Colors';
interface Props {
  progress: number;
  animated: boolean;
}
const trackColor = COLORS.primary;
const backgroundColor = COLORS.progressBackground;
const progressDuration = 1200;
const indeterminateDuration = 1100;
const ProgressBar = (props: Props) => {
  const {progress, animated} = props;

  const [timer] = useState(new Animated.Value(0));
  const [width] = useState(new Animated.Value(0));

  const indeterminateAnimation = Animated.timing(timer, {
    duration: indeterminateDuration,
    toValue: 1,
    useNativeDriver: true,
    isInteraction: false,
  });
  const startAnimation = useCallback(() => {
    Animated.timing(width, {
      duration: animated ? progressDuration : 0,
      toValue: progress,
      useNativeDriver: false,
    }).start(() => {});
  }, [
    animated,
    indeterminateAnimation,
    progress,
    progressDuration,
    timer,
    width,
  ]);

  const stopAnimation = useCallback(() => {
    if (indeterminateAnimation) {
      indeterminateAnimation.stop();
    }

    Animated.timing(width, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }, [indeterminateAnimation, width]);
  useEffect(() => {
    if (typeof progress === 'number') {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [progress, startAnimation, stopAnimation]);

  const styleAnimation = () => {
    return {
      width: width.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      }),
    };
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 16,
      overflow: 'hidden',
      borderRadius: 8,
    },

    progressBar: {
      flex: 1,
      borderStyle: 'solid',
      borderRightWidth: 6,
      borderTopWidth: 16,
      borderRightColor: 'transparent',
      borderTopColor: trackColor,
    },
    progressBar1: {
      flex: 1,
      backgroundColor: trackColor,
    },
  });

  return (
    <View>
      <Animated.View style={[styles.container, {backgroundColor}]}>
        <Animated.View
          style={[
            progress <= 0 || progress >= 100
              ? styles.progressBar1
              : styles.progressBar,
            {
              ...styleAnimation(),
            },
          ]}></Animated.View>
      </Animated.View>
    </View>
  );
};

export default ProgressBar;
