import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productAction from '../../store/actions/products';

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(val => val.id === prodId));
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImagerUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    const dispatch = useDispatch()

    // avoiding submit handler being hit every re-render (use empty array as second argument)
    const submitHandler = useCallback(() => {
        if (editedProduct) {
            console.log('updateproduct - 1');
            dispatch(productAction.updateProduct(prodId, title, description, imageUrl))
        } else {
            console.log('addproduct - 1');
            dispatch(productAction.createProduct(title, description, imageUrl, +price))
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price]);

    // being hit every-time submitHandler change.
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImagerUrl(text)}
                    />
                </View>
                {editedProduct ? null :
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={text => setPrice(text)}
                        />
                    </View>
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit'); //function
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Save"
                iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
                onPress={submitFn}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});

export default EditProductScreen;