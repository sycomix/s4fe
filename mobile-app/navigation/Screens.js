import React from 'react';
import { Easing, Animated } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';

import { Block, Text, theme } from "galio-framework";

import OnboardingScreen from '../screens/Onboarding';
import HomeScreen from '../screens/Home';
import WomanScreen from '../screens/Woman';
import ManScreen from '../screens/Man';
import KidsScreen from '../screens/Kids';
import NewCollectionScreen from '../screens/NewCollection';
import DealsScreen from '../screens/Deals';

import CategoriesScreen from '../screens/Categories';
import CategoryScreen from '../screens/Category';
import ProductScreen from '../screens/Product';
import GalleryScreen from '../screens/Gallery';
import ChatScreen from '../screens/Chat';

import CartScreen from '../screens/Cart';
// import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';

import SearchScreen from '../screens/Search';
import ComponentsScreen from '../screens/Components';

import ProfileScreen from '../screens/Profile';
import SettingsScreen from '../screens/Settings';
import NotificationsScreen from '../screens/Notifications';
import PrivacyScreen from '../screens/Privacy';
import AboutScreen from '../screens/About';
import AgreementScreen from '../screens/Agreement';

// Signup
import PhoneNumberScreen from "../screens/SignUp/PhoneNumber";
import PhoneVerificationCodeScreen from "../screens/SignUp/PhoneVerificationCode";
import SignupEmailScreen from "../screens/SignUp/SignupEmail";
import SignupPasswordScreen from "../screens/SignUp/SignupPassword";
import SignupPrivacyScreen from "../screens/SignUp/SignupPrivacy";
import SignupUserInfoScreen from "../screens/SignUp/SignupUserInfo";
import PrivacyPolicyScreen from "../screens/PrivacyPolicy";
import TermsAndConditionsScreen from "../screens/TermsAndContitions";
import UserProfileScreen from "../screens/User/UserProfile";

// Signin
import SignInScreen from '../screens/SignIn/SignIn'

import Menu from './Menu';
import { Header, Drawer } from '../components/';
import { tabs } from '../constants/';
import ForgotPassword from "../screens/SignIn/ForgotPassword";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Profile" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Rachel Brown" navigation={navigation} />,
    })
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Shopping Cart" navigation={navigation} />,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
})

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Settings" navigation={navigation} />,
    })
  },
  Agreement: {
    screen: AgreementScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="User Agreement" navigation={navigation} />,
    })
  },
  Privacy: {
    screen: PrivacyScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Privacy Policy" navigation={navigation} />,
    })
  },
  About: {
    screen: AboutScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="About us" navigation={navigation} />,
    })
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Notifications" navigation={navigation} />,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
})

const ComponentsStack = createStackNavigator({
  Components: {
    screen: ComponentsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Components" navigation={navigation} />,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
})

const WomanStack = createStackNavigator({
  Woman: {
    screen: WomanScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search options title="Woman" navigation={navigation} />,
    })
  },
  Deals: {
    screen: DealsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back tabs={tabs.deals} title="Best Deals" navigation={navigation} />,
    })
  },
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back tabs={tabs.categories} tabIndex={tabs.categories[1].id} title="Categories" navigation={navigation} />,
    })
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: ({navigation}) => {
      const { params } = navigation.state;
      const title = params && params.title || "Category";
      return {
        header: <Header back title={title} navigation={navigation} />,
      }
    }
  },
  Product: {
    screen: ProductScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Rachel Brown" navigation={navigation} />,
    })
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Shopping Cart" navigation={navigation} />,
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Search" navigation={navigation} />,
    })
  },
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
})

const ManStack = createStackNavigator({
  Man: {
    screen: ManScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search options title="Man" navigation={navigation} />,
    })
  },
  Deals: {
    screen: DealsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back tabs={tabs.deals} title="Best Deals" navigation={navigation} />,
    })
  },
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back tabs={tabs.categories} tabIndex={tabs.categories[1].id} title="Categories" navigation={navigation} />,
    })
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: ({navigation}) => {
      const { params } = navigation.state;
      const title = params && params.title || "Category";
      return {
        header: <Header back title={title} navigation={navigation} />,
      }
    }
  },
  Product: {
    screen: ProductScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Rachel Brown" navigation={navigation} />,
    })
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Shopping Cart" navigation={navigation} />,
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Search" navigation={navigation} />,
    })
  },
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
})

const KidsStack = createStackNavigator({
  Kids: {
    screen: KidsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search options title="Kids" navigation={navigation} />,
    })
  },
  Deals: {
    screen: DealsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back tabs={tabs.deals} title="Best Deals" navigation={navigation} />,
    })
  },
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back tabs={tabs.categories} tabIndex={tabs.categories[1].id} title="Categories" navigation={navigation} />,
    })
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: ({navigation}) => {
      const { params } = navigation.state;
      const title = params && params.title || "Category";
      return {
        header: <Header back title={title} navigation={navigation} />,
      }
    }
  },
  Product: {
    screen: ProductScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Rachel Brown" navigation={navigation} />,
    })
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Shopping Cart" navigation={navigation} />,
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Search" navigation={navigation} />,
    })
  },
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
})

const NewCollectionStack = createStackNavigator({
  NewCollection: {
    screen: NewCollectionScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search options title="New Collection" navigation={navigation} />,
    })
  },
  Deals: {
    screen: DealsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back tabs={tabs.deals} title="Best Deals" navigation={navigation} />,
    })
  },
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back tabs={tabs.categories} tabIndex={tabs.categories[1].id} title="Categories" navigation={navigation} />,
    })
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: ({navigation}) => {
      const { params } = navigation.state;
      const title = params && params.title || "Category";
      return {
        header: <Header back title={title} navigation={navigation} />,
      }
    }
  },
  Product: {
    screen: ProductScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Rachel Brown" navigation={navigation} />,
    })
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Shopping Cart" navigation={navigation} />,
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Search" navigation={navigation} />,
    })
  },
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
})

const AuthStack = createStackNavigator({
  PhoneNumber: {
    screen: PhoneNumberScreen,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
  PhoneVerification: {
    screen: PhoneVerificationCodeScreen,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
  SignupEmail: {
    screen: SignupEmailScreen,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
  SignupPassword: {
    screen: SignupPasswordScreen,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
  SignupPrivacy: {
    screen: SignupPrivacyScreen,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
  SignupUserInfo: {
    screen: SignupUserInfoScreen,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
  PrivacyPolicy: {
    screen: PrivacyPolicyScreen,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
  TermsAndConditions: {
    screen: TermsAndConditionsScreen,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
    })
  },
})

const HomeStack = createStackNavigator({

    UserProfile: {
      screen: UserProfileScreen,
      navigationOptions: ({navigation}) => ({
        headerTransparent: true,
      })
    },

  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search options title="Home" navigation={navigation} />,
    })
  },
  Deals: {
    screen: DealsScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back tabs={tabs.deals} title="Best Deals" navigation={navigation} />,
    })
  },
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back tabs={tabs.categories} tabIndex={tabs.categories[1].id} title="Categories" navigation={navigation} />,
    })
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: ({navigation}) => {
      const { params } = navigation.state;
      const title = params && params.title || "Category";
      return {
        header: <Header back title={title} navigation={navigation} />,
      }
    }
  },
  Product: {
    screen: ProductScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Rachel Brown" navigation={navigation} />,
    })
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Shopping Cart" navigation={navigation} />,
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back title="Search" navigation={navigation} />,
    })
  },
},
{
  cardStyle: {
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const AppStack = createDrawerNavigator({
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    Dashboard: {
      screen: HomeStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        ),
      }),
    },
    Woman: {
      screen: WomanStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Woman" title="Woman" />
        ),
      }),
    },
    Man: {
      screen: ManStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Man" title="Man" />
        ),
      }),
    },
    Kids: {
      screen: KidsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Kids" title="Kids" />
        ),
      }),
    },
    NewCollection: {
      screen: NewCollectionStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="NewCollection" title="New Collection" />
        ),
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Profile" title="Profile" />
        ),
      }),
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Settings" title="Settings" />
        ),
      }),
    },
    Components: {
      screen: ComponentsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Components" title="Components" />
        ),
      }),
    },
    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
      },
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="SignIn" title="Sign In" />
        ),
      }),
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="SignUp" title="Sign Up" />
        ),
      }),
    },
  },
  Menu
);

const Switch =  createSwitchNavigator(
  {
    App: AuthStack,
    Home: HomeStack,
  },
  {
    initialRouteName: 'App',
  }
);

const AppContainer = createAppContainer(Switch);
export default AppContainer;
