/* import all main dependencies */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

/* import all screens */
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

/* import helper, constant, and third-party library */
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        }
    }
);

const OrderNavigator = createStackNavigator(
    {
        Orders: OrdersScreen,
    }, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }
})

const AdminNavigator = createStackNavigator(
    {
        UsersProducts: UserProductsScreen,
        EditProduct: EditProductScreen,
    }, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrderNavigator,
    Admin: AdminNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.primary,
        itemsContainerStyle: {
            marginTop: 30
        }
    }
})

export default createAppContainer(ShopNavigator);