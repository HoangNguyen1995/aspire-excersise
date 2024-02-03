import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../constants/Colors';
import MonoText, {MONO_FONT_STYLE} from '../components/StyledText';
import {CURRENCY_TEXT} from '../constants';

const CurrencyComponent = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
      }}>
      <MonoText
        fontFamilyWeight={MONO_FONT_STYLE.BOLD}
        size={12}
        color={COLORS.textWhite}>
        {CURRENCY_TEXT}
      </MonoText>
    </View>
  );
};

export default CurrencyComponent;
