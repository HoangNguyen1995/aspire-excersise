import {
  Text as DefaultText,
  TextProps as DefaultProps,
  ColorValue,
  Platform,
  StyleProp,
} from 'react-native';

export enum MONO_FONT_STYLE {
  ULTRA_LIGHT = 'UltLt',
  REGULAR = 'Regular',
  MEDIUM = 'Medium',
  CN = 'Cn',
  DEMI = 'Demi',
  BOLD = 'BOLD',
  HEAVY = 'Heavy',
}
type TextProps = {
  fontFamilyWeight: MONO_FONT_STYLE | undefined;
  color: ColorValue;
  size: number;
} & DefaultProps;
const MonoText = (props: TextProps) => {
  const {
    fontFamilyWeight = MONO_FONT_STYLE.MEDIUM,
    color,
    size,
    style,
    ...otherProps
  } = props;
  const isBoldAndroid =
    fontFamilyWeight === MONO_FONT_STYLE.BOLD && Platform.OS === 'android'; 
 
  return (
    <DefaultText
      style={[
        {
          fontFamily: `AvenirNextLTPro-${fontFamilyWeight}`,
          fontSize: size,
          color,
        },
        isBoldAndroid ? {fontWeight: '700'} : {},
        style,
      ]}
      {...otherProps}
    />
  );
};

export default MonoText;
