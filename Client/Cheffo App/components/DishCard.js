import React, { useState } from 'react'
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { View, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input';
import { useUserContext } from "../src/UserContext";
import useStateWithCallback from 'use-state-with-callback';




const DishCard = (props) => {
    const { cart, setCart, cartTotal } = useUserContext();
    const [inputValue, setInputValue] = useStateWithCallback(cart?.filter(e => e.Name === props.name)[0]?.Quantity, inputValue => {
        let tempCart;
        let tempDish = {
            Name: props.name,
            Price: props.price,
            Quantity: inputValue,
            Img: props.img
        }
        let flag = false;
        if (cart) {
            cart.map((item, key) => {
                if (item.Name == props.name) {
                    item.Quantity = inputValue;
                    flag = true;
                    tempCart = cart;
                }
            }
            )
        }
        else {
            setCart([tempDish]);
            return;
        }
        if (!flag) {
            tempCart = cart;
            tempCart.push(tempDish);
        }
        setCart(tempCart);
        props.reRenderDishesScreen()
    });
    return (
        <Card style={styles.shadow} onPress={props.onPress}>
            <Card.Cover source={{ uri: props.img }} style={{ borderRadius: 15, borderTopRightRadius: 15, borderTopLeftRadius: 15, height: 150, width: 330, }} />
            <Card.Title title={props.name} subtitle={props.description} subtitleNumberOfLines={3} style={{ marginTop: 10, flex: 1, flexWrap: 'wrap', width: '80%' }} />
            <Card.Content>
                <View style={{ marginTop: 15, flexDirection: "row" }}>
                    <Text style={{ fontSize: 15, color: '#8c8c8c' }}> {props.dishType}</Text>
                    <Text style={{ color: '#dedede' }}> |</Text>
                    <Text style={{ fontSize: 15, color: '#8c8c8c' }}> {props.price}₪</Text>
                    <Text style={{ color: '#dedede' }}> |</Text>
                    <View style={{ position: 'absolute', right: 25 }}>
                        <NumericInput
                            rounded value={inputValue} minValue={0} totalHeight={30} onChange={value => setInputValue(value)} onLimitReached={(isMax, msg) => console.log(isMax, msg)} />
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
};

const styles = StyleSheet.create({

    shadow: {
        flex: 1,
        paddingLeft: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: 370,
        marginTop: 8,
        marginBottom: 8,
        elevation: 5,
        paddingTop: 15,
        alignItems: 'center',
        borderRadius: 15,
    },
    numeric: {
        height: 32,
        width: 100,
        paddingBottom: 50,
        marginBottom: 50,
    }
})

export default DishCard;

