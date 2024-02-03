import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCENE_NAMES} from '../constants/SceneName';
import {COLORS} from '../constants/Colors';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {IMAGE_PATH} from '../constants/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DebitCardScreen from '../screens/DebitCard';
import MonoText, {MONO_FONT_STYLE} from '../components/StyledText';
import WeeklySpendingLimitScreen from '../screens/WeeklySpendingLimit';
const Stack = createNativeStackNavigator();

const ScreenTemp = ({text}: {text: string}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MonoText
        color={COLORS.textTitle}
        size={24}
        fontFamilyWeight={MONO_FONT_STYLE.DEMI}>
        {text}
      </MonoText>
    </View>
  );
};

const Tab = createBottomTabNavigator();
interface BottomOptionsType extends BottomTabNavigationOptions {
  imageSrc?: ImageSourcePropType;
}
function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const safe = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: safe.bottom ? safe.bottom : 8,
        backgroundColor: COLORS.background,
        paddingTop: 8,
      }}>
      {state.routes.map((route, index) => {
        const options: BottomOptionsType = descriptors[route.key].options;
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            {options?.imageSrc && (
              <Image
                source={options.imageSrc}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: isFocused ? COLORS.tint : COLORS.inactive,
                  resizeMode: 'contain',
                  marginBottom: 4,
                }}
              />
            )}
            <MonoText
              color={isFocused ? COLORS.tint : COLORS.inactive}
              size={9}
              fontFamilyWeight={MONO_FONT_STYLE.DEMI}>
              {label}
            </MonoText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const HomeScreen = () => {
  return <ScreenTemp text="Home" />;
};
const PaymentsScreen = () => {
  return <ScreenTemp text="Payments" />;
};
const CreditScreen = () => {
  return <ScreenTemp text="Credit" />;
};
const ProfileScreen = () => {
  return <ScreenTemp text="Profile" />;
};
// const WeeklySpendingLimitScreen = () => {
//   return <ScreenTemp text="Weekly spending limit" />;
// };

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCENE_NAMES.BOTTOM_TAB_STACK.DEBIT_CARD}
      screenOptions={{header: renderHeader}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name={SCENE_NAMES.BOTTOM_TAB_STACK.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          imageSrc: IMAGE_PATH.home,
        }}
      />
      <Tab.Screen
        name={SCENE_NAMES.BOTTOM_TAB_STACK.DEBIT_CARD}
        component={DebitCardScreen}
        options={{
          tabBarLabel: 'Debit card',
          imageSrc: IMAGE_PATH.debit,
        }}
      />
      <Tab.Screen
        name={SCENE_NAMES.BOTTOM_TAB_STACK.PAYMENTS}
        component={PaymentsScreen}
        options={{
          tabBarLabel: 'Payments',
          imageSrc: IMAGE_PATH.payments,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={SCENE_NAMES.BOTTOM_TAB_STACK.CREDIT}
        component={CreditScreen}
        options={{
          tabBarLabel: 'Credit',
          imageSrc: IMAGE_PATH.credit,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          imageSrc: IMAGE_PATH.profile,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          header: renderHeader,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animation: 'slide_from_right',
        }}>
        <Stack.Group>
          <Stack.Screen
            name={SCENE_NAMES.BOTTOM_TAB}
            component={BottomTabs}
            // options={{header: renderHeader}}
          />
        </Stack.Group>
        <Stack.Screen
          name={SCENE_NAMES.WEEKLY_SPENDING_LIMIT}
          component={WeeklySpendingLimitScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const renderHeader = () => null;

export default RootNavigator;
