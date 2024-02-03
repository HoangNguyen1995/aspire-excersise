This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).


# Mobile Code Challenge user stories

## Debit card screen

### View Total Balance:
- As a debit card user,
- I want to view my total balance on the debit card screen,
- So that I can quickly check the available funds in my account.

### View Debit Card Information with Toggle:
- As a debit card user
- I want to view my debit card information on the screen,
And have the option to toggle the display of sensitive information (CVV and full card number, except the last 4 digits)
- So that I can conveniently access my card details while ensuring the security of sensitive information.

### Set Up/Toggle Weekly Spending Limit:
- As a debit card user
- I want to have control over my weekly spending limit on the debit card screen
- So that I can manage my expenses effectively

#### Scenario 1: Weekly Spending Limit is On:
- Given that I am on the debit card screen,
- When I interact with the weekly spending limit toggle switch
- I want to be able to toggle it off by pressing the switch
or press on the entire spending limit section to navigate to the screen for adjusting the spending limit value 
so that I can easily turn off the limit or make adjustments as needed.

#### Scenario 2: Weekly Spending Limit is Off:

- Given that I am on the debit card screen,
- When I press on the spending limit section or the limit toggle switch
- I want to be navigated to the screen where I can set the weekly spending limit
So that I can establish a spending limit when it's currently turned off.

## Set Weekly Spending Limit:
- As a debit card user
- I want to set my weekly spending limit on a dedicated screen
- So that I can control and monitor my expenses effectively
### Details:
- Given that I am on the "Set Weekly Spending Limit" screen
- I should see a back button to navigate back to the debit card screen.
- I should see an input field to type the weekly spending limit. If I've previously set a value and returned to this screen, the input should display the last set value; otherwise, the input should be empty.
- If the input has a value that is not a valid amount of money, an error message should be displayed: "Spending limit is not valid."
- I should see three suggestions (5000, 10000, 20000) to quickly set the spending limit. Clicking on a suggestion should fill the input field with the selected value.
- I should see a save button that is initially disabled. The save button should be enabled only when the input value is a valid amount of money and not empty.
- When I press the save button:
  - The amount entered in the input field should be set as the weekly spending limit.
  - The toggle for the weekly spending limit on the debit card screen should be turned on.



>**Note**:  I use the mock api with set timeout and promise. There are 3 apis (fetchCardInfo, fetchBalance, fetchWeeklySpending). Feel free to adjust the response value or the time delay in [debitSaga.ts](./redux/sagas/debitSaga.ts)


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

