import {
  Text as DefaultText,
  TextProps as DefaultProps,
  ColorValue,
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
  return (
    <DefaultText
      style={[
        {
          fontFamily: `AvenirNextLTPro-${fontFamilyWeight}`,
          fontSize: size,
          color,
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

export default MonoText;
