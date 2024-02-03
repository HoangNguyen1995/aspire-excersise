import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
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
import {SCENE_NAMES} from '../constants/SceneName';
import {CURRENCY_TEXT} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBalanceAction,
  fetchCardInfoAction,
  fetchWeeklySpendingAction,
  toggleFreezeCardAction,
  toggleShowCredentialAction,
  updateWeeklySpendingLimitAction,
} from '../redux/actions/debitActions';
import {
  getBalance,
  getCardInfo,
  getCurrentSpending,
  getIsEnableFreeze,
  getShowCredential,
  getSpendingProgress,
  getWeeklySpendingLimit,
} from '../redux/selectors/debitSelectors';
import {encodeAmount} from '../utils';
import ProgressBar from '../components/progressBar';

const CardItem = () => {
  const dispatch = useDispatch();

  const showCredential = useSelector(getShowCredential);
  const toggleShowCredential = () => {
    dispatch(toggleShowCredentialAction(!showCredential));
  };
  const cardInfo = useSelector(getCardInfo);
  const cardNumberMemo = useMemo(() => {
    const blocks = cardInfo.number.match(/(\d{4})/g) ?? [];
    return (
      <View style={{flexDirection: 'row', marginTop: 24, alignItems: 'center'}}>
        {blocks.map((block, index) => {
          const shouldHide = index < blocks.length - 1 && !showCredential;
          return (
            <MonoText
              key={`block_${index}`}
              fontFamilyWeight={MONO_FONT_STYLE.DEMI}
              size={14}
              color={COLORS.textWhite}
              style={{marginLeft: index === 0 ? 0 : 24}}>
              {shouldHide ? '••••' : block}
            </MonoText>
          );
        })}
      </View>
    );
  }, [cardInfo.number, showCredential]);

  return (
    <View style={{paddingHorizontal: 24, marginTop: -50}}>
      <View style={styles.credentialToggle}>
        <TouchableOpacity
          onPress={toggleShowCredential}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={IMAGE_PATH.eye} style={styles.eyeIcon} />
          <MonoText
            fontFamilyWeight={MONO_FONT_STYLE.DEMI}
            color={COLORS.primary}
            size={12}>
            {showCredential ? 'Hide' : 'Show'} card number
          </MonoText>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <Image
          source={IMAGE_PATH.aspire_logo}
          style={{
            width: 74,
            height: 21,
            alignSelf: 'flex-end',
          }}
        />
        <MonoText
          fontFamilyWeight={MONO_FONT_STYLE.BOLD}
          size={22}
          color={COLORS.textWhite}
          style={{marginTop: 24}}>
          {cardInfo.name}
        </MonoText>
        {cardNumberMemo}
        <View style={{marginTop: 24, flexDirection: 'row'}}>
          <MonoText
            fontFamilyWeight={MONO_FONT_STYLE.DEMI}
            size={13}
            color={COLORS.textWhite}
            style={{marginRight: 32}}>
            Thru: {cardInfo.validThrough}
          </MonoText>
          <MonoText
            fontFamilyWeight={MONO_FONT_STYLE.DEMI}
            size={13}
            color={COLORS.textWhite}>
            CVV: {showCredential ? cardInfo.cvv : '***'}
          </MonoText>
        </View>
        <Image
          source={IMAGE_PATH.visa_logo}
          style={{
            width: 59,
            height: 20,
            alignSelf: 'flex-end',
          }}
        />
      </View>
    </View>
  );
};

const Header = () => {
  const {top} = useSafeAreaInsets();
  const balance = useSelector(getBalance);
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: COLORS.headerBackground,
        position: 'absolute',
        top: 0,
        // height: '100%',
        paddingHorizontal: 24,
        paddingTop: top + 32,
        paddingBottom: '70%',
      }}>
      <Image
        source={IMAGE_PATH.home}
        style={{
          width: 25,
          height: 25,
          alignSelf: 'flex-end',
          tintColor: COLORS.primary,
          position: 'absolute',
          top: top + 24,
          right: 24,
        }}
      />
      <MonoText
        fontFamilyWeight={MONO_FONT_STYLE.BOLD}
        size={24}
        color={COLORS.textWhite}>
        Debit Card
      </MonoText>
      <VerticalSpace height={24} />
      <MonoText
        fontFamilyWeight={MONO_FONT_STYLE.MEDIUM}
        size={14}
        color={COLORS.textWhite}>
        Available balance
      </MonoText>
      <VerticalSpace height={10} />
      <View style={styles.row}>
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
        <HorizontalSpace width={10} />
        <MonoText
          fontFamilyWeight={MONO_FONT_STYLE.BOLD}
          size={24}
          color={COLORS.textWhite}>
          {encodeAmount(balance)}
        </MonoText>
      </View>
    </View>
  );
};

const MENU_KEY = {
  TOP_UP: 'TOP_UP',
  WEEKLY_LIMIT: 'WEEKLY_LIMIT',
  FREEZE: 'FREEZE',
  NEW_DEBIT_CARD: 'NEW_DEBIT_CARD',
  DEACTIVATED_CARD: 'DEACTIVATED_CARD',
};

const DebitMenu = () => {
  const dispatch = useDispatch();
  const isEnableFreeze = useSelector(getIsEnableFreeze);
  const spendingLimit = useSelector(getWeeklySpendingLimit);
  const isEnableWeeklySpendingLimit = !!spendingLimit;
  const navigation = useNavigation();
  const onToggleMenu = (key: string) => {
    switch (key) {
      case MENU_KEY.FREEZE:
        dispatch(toggleFreezeCardAction(!isEnableFreeze));
        break;
      case MENU_KEY.WEEKLY_LIMIT:
        if (isEnableWeeklySpendingLimit) {
          LayoutAnimation.configureNext({
            duration: 500,
            create: {type: 'linear', property: 'opacity'},
            update: {type: 'spring', springDamping: 0.4},
            delete: {type: 'linear', property: 'opacity'},
          });
          dispatch(updateWeeklySpendingLimitAction(null));
        } else {
          navigation.navigate(SCENE_NAMES.WEEKLY_SPENDING_LIMIT, {});
        }
        break;

      default:
        break;
    }
  };
  const menuMemo = useMemo(() => {
    return [
      {
        key: MENU_KEY.TOP_UP,
        image: IMAGE_PATH.top_up,
        title: 'Top-up account',
        subTitle: 'Deposit money to your account to use with card',
        showSwitch: false,
        isEnabled: false,
      },
      {
        key: MENU_KEY.WEEKLY_LIMIT,
        image: IMAGE_PATH.weekly_limit,
        title: 'Weekly spending limit',
        subTitle: isEnableWeeklySpendingLimit
          ? `Your weekly spending limit is ${CURRENCY_TEXT} ${encodeAmount(
              spendingLimit,
            )}`
          : "You haven't set any spending limit on card",
        showSwitch: true,
        isEnabled: isEnableWeeklySpendingLimit,
      },
      {
        key: MENU_KEY.FREEZE,
        image: IMAGE_PATH.freeze,
        title: 'Freeze card',
        subTitle: 'Your debit card is currently active',
        showSwitch: true,
        isEnabled: isEnableFreeze,
      },
      {
        key: MENU_KEY.NEW_DEBIT_CARD,
        image: IMAGE_PATH.new_debit_card,
        title: 'Get a new card',
        subTitle: 'This deactivates your current debit card',
        showSwitch: false,
        isEnabled: false,
      },
      {
        key: MENU_KEY.DEACTIVATED_CARD,
        image: IMAGE_PATH.deactivated_card,
        title: 'Deactivated cards',
        subTitle: 'Your previously deactivated cards',
        showSwitch: false,
        isEnabled: false,
      },
    ];
  }, [isEnableFreeze, isEnableWeeklySpendingLimit, spendingLimit]);
  return (
    <View style={styles.menuContainer}>
      {menuMemo.map(
        ({key, image, title, subTitle, showSwitch, isEnabled}, index) => {
          const isFirst = index === 0;

          return (
            <Fragment key={key}>
              {!isFirst && <VerticalSpace height={32} />}
              <TouchableOpacity
                style={styles.row}
                disabled={key !== MENU_KEY.WEEKLY_LIMIT}
                onPress={() => {
                  navigation.navigate(SCENE_NAMES.WEEKLY_SPENDING_LIMIT, {});
                }}>
                <Image source={image} style={styles.menuImage} />
                <HorizontalSpace width={12} />
                <View style={{flex: 1}}>
                  <MonoText
                    fontFamilyWeight={MONO_FONT_STYLE.DEMI}
                    size={14}
                    color={COLORS.textTitle}>
                    {title}
                  </MonoText>
                  <VerticalSpace height={2} />
                  <MonoText
                    fontFamilyWeight={MONO_FONT_STYLE.REGULAR}
                    size={13}
                    color={COLORS.textSubtitle}>
                    {subTitle}
                  </MonoText>
                </View>
                {showSwitch && (
                  <Switch
                    trackColor={{false: COLORS.disabled, true: COLORS.primary}}
                    thumbColor={COLORS.textWhite}
                    ios_backgroundColor={COLORS.disabled}
                    onValueChange={() => onToggleMenu(key)}
                    value={isEnabled}
                  />
                )}
              </TouchableOpacity>
            </Fragment>
          );
        },
      )}
    </View>
  );
};

const DebitCardScreen = () => {
  const spendingLimit = useSelector(getWeeklySpendingLimit);
  const spendingProgress = useSelector(getSpendingProgress);
  const weeklySpending = useSelector(getCurrentSpending);
  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch(fetchCardInfoAction());
    dispatch(fetchBalanceAction());
    dispatch(fetchWeeklySpendingAction());
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 32}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchData} />
        }>
        <View style={{height: 250}} />
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <CardItem />
          {spendingLimit && (
            <View style={{paddingHorizontal: 24}}>
              <VerticalSpace height={24} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <MonoText
                  color={COLORS.text}
                  fontFamilyWeight={MONO_FONT_STYLE.MEDIUM}
                  size={13}>
                  Debit card spending limit
                </MonoText>
                <View style={{flexDirection: 'row'}}>
                  <MonoText
                    color={COLORS.primary}
                    fontFamilyWeight={MONO_FONT_STYLE.DEMI}
                    size={13}>
                    ${encodeAmount(weeklySpending)}
                  </MonoText>
                  <MonoText
                    style={{marginHorizontal: 4}}
                    fontFamilyWeight={MONO_FONT_STYLE.MEDIUM}
                    size={13}
                    color={COLORS.textDisable}>
                    |
                  </MonoText>
                  <MonoText
                    fontFamilyWeight={MONO_FONT_STYLE.MEDIUM}
                    size={13}
                    color={COLORS.textDisable}>
                    ${encodeAmount(spendingLimit)}
                  </MonoText>
                </View>
              </View>
              <VerticalSpace height={8} />
              <ProgressBar animated progress={spendingProgress} />
            </View>
          )}
          <VerticalSpace height={32} />
          <DebitMenu />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  eyeIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary,
    marginRight: 6,
  },
  credentialToggle: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 16,
    position: 'absolute',
    right: 24,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    top: -32,
  },
  row: {flexDirection: 'row'},
  cardContainer: {
    padding: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  menuImage: {
    width: 32,
    height: 32,
  },
  menuContainer: {
    paddingHorizontal: 24,
  },
});

export default DebitCardScreen;
