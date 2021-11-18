import React from "react";
import { FlatList, StyleSheet, Platform } from "react-native";
import ProductItem from '../../components/shop/ProductItem';
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from '../../components/UI/HeaderButton';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                image={itemData.item.image}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={() => { }}
                onAddCart={() => { }}
            />}
        />
    )
}

const styles = StyleSheet.create({

})

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'My Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    }
}

export default UserProductsScreen;