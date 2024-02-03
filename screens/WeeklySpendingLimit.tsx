import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../constants/Colors';
import MonoText, {MONO_FONT_STYLE} from '../components/StyledText';
import VerticalSpace from '../components/VerticalSpace';
import HorizontalSpace from '../components/HorizontalSpace';
import {IMAGE_PATH} from '../constants/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {CURRENCY_TEXT} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {updateWeeklySpendingLimitAction} from '../redux/actions/debitActions';
import {getWeeklySpendingLimit} from '../redux/selectors/debitSelectors';
import CurrencyComponent from '../components/Currency';
import withDismissKeyboard from '../HOC/withDismissKeyboard';
import {decodeAmount, encodeAmount} from '../utils';

const Header = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: COLORS.headerBackground,
        paddingHorizontal: 24,
        paddingTop: top + 16,
        paddingBottom: 40,
      }}>
      <View style={styles.headerIcons}>
        <TouchableOpacity hitSlop={10} onPress={() => navigation.goBack()}>
          <Image
            source={IMAGE_PATH.back}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.textWhite,
            }}
          />
        </TouchableOpacity>
        <Image
          source={IMAGE_PATH.home}
          style={{
            width: 25,
            height: 25,
            alignSelf: 'flex-end',
            tintColor: COLORS.primary,
          }}
        />
      </View>
      <VerticalSpace height={20} />

      <MonoText
        fontFamilyWeight={MONO_FONT_STYLE.BOLD}
        size={24}
        color={COLORS.textWhite}>
        Spending limit
      </MonoText>
    </View>
  );
};

const limitSuggestion = [5000, 10000, 20000];
const DismissKeyboardAvoidingView = withDismissKeyboard(KeyboardAvoidingView);
const WeeklySpendingLimitScreen = () => {
  const safeInsets = useSafeAreaInsets();
  const weeklySpending = useSelector(getWeeklySpendingLimit);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState(`${weeklySpending ?? ''}`);
  useEffect(() => {
    inputRef.current?.focus && inputRef.current?.focus();
  }, []);

  const payloadMemo = useMemo(() => {
    const limit = Number(value);
    if (isNaN(limit)) {
      return {
        isValid: false,
        limit: null,
      };
    } else {
      return {
        isValid: true,
        limit,
      };
    }
  }, [value]);

  const onSaveWeeklySpending = () => {
    dispatch(updateWeeklySpendingLimitAction(payloadMemo.limit));
    navigation.goBack();
    navigation;
  };
  return (
    <DismissKeyboardAvoidingView style={styles.container}>
      <Header />
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 32,
          paddingHorizontal: 24,
          paddingBottom: safeInsets.bottom + 24,
        }}>
        <View style={[styles.row, styles.alignCenter]}>
          <Image source={IMAGE_PATH.pickup_car} style={styles.pickupIcon} />
          <HorizontalSpace width={12} />
          <MonoText
            fontFamilyWeight={MONO_FONT_STYLE.MEDIUM}
            color={COLORS.text}
            size={14}>
            Set a weekly debit card spending limit
          </MonoText>
        </View>
        <VerticalSpace height={16} />

        <View>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={encodeAmount(value)}
            onChangeText={text => setValue(decodeAmount(text))}
            keyboardType="decimal-pad"
          />
          <View style={styles.currencyWrapper}>
            <CurrencyComponent />
          </View>
        </View>
        {!payloadMemo.isValid && (
          <MonoText
            size={12}
            fontFamilyWeight={MONO_FONT_STYLE.REGULAR}
            style={{marginTop: 8}}
            color={'red'}>
            Spending limit is not valid
          </MonoText>
        )}
        <VerticalSpace height={12} />
        <MonoText
          fontFamilyWeight={MONO_FONT_STYLE.REGULAR}
          size={13}
          color={COLORS.textSubtitle}>
          Here weekly means the last 7 days - not the calendar week
        </MonoText>
        <VerticalSpace height={12} />
        <View style={styles.rowBetween}>
          {limitSuggestion.map(limit => (
            <TouchableOpacity
              onPress={() => setValue(limit.toString())}
              key={limit.toString()}
              style={styles.suggestionWrapper}>
              <MonoText
                size={12}
                fontFamilyWeight={MONO_FONT_STYLE.DEMI}
                color={COLORS.primary}>
                {CURRENCY_TEXT} {encodeAmount(limit)}
              </MonoText>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flex: 1}} />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={onSaveWeeklySpending}
            disabled={!payloadMemo.isValid}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 12,
              backgroundColor: payloadMemo.isValid
                ? COLORS.primary
                : COLORS.disabled,
              borderRadius: 50,
              width: '100%',
              maxWidth: 300,
            }}>
            <MonoText
              style={{textAlign: 'center'}}
              size={12}
              fontFamilyWeight={MONO_FONT_STYLE.DEMI}
              color={COLORS.textWhite}>
              Save
            </MonoText>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  suggestionWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#20d16712',
    borderRadius: 5,
  },
  rowBetween: {flexDirection: 'row', justifyContent: 'space-between'},
  currencyWrapper: {
    position: 'absolute',
    top: 12,
    left: 0,
  },
  input: {
    borderBottomColor: COLORS.textSubtitle,
    borderBottomWidth: 0.5,
    paddingLeft: 44,
    paddingVertical: 8,
    fontFamily: `AvenirNextLTPro-Bold`,
    fontSize: 24,
    color: COLORS.text,
  },
  pickupIcon: {height: 16, width: 16},
  container: {flex: 1, backgroundColor: COLORS.headerBackground},

  row: {flexDirection: 'row'},
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignContent: 'center',
  },
});

export default WeeklySpendingLimitScreen;
