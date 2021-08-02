import React from 'react'
import { Avatar, Button, Card, Title, Text } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';



const CartCard = (props) => {
    return (
        <Card style={styles.shadow}>
            <View style={styles.user}>
                <Avatar.Image style={{ marginTop: "2%", backgroundColor: 'transparent' }} size={100} source={{ uri: props.cartDish.Img }} />
                {/* <Image source={require('' + props.cartDish.Img)} /> */}
                <Card.Content style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={{ fontSize: 16, color: 'black' }}> {props.cartDish.Name}</Text>
                    <Text style={{ fontSize: 16, color: 'black' }}> {props.cartDish.Price}₪ x {props.cartDish.Quantity} {"\n"}</Text>
                    <Text style={{ marginTop: "auto", marginLeft: "auto", textAlign: "right", fontFamily: 'sans-serif-medium', fontSize: 17, color: 'green' }}>
                        {props.cartDish.Price * props.cartDish.Quantity}₪
                    </Text>
                </Card.Content>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({

    shadow: {
        overflow: 'hidden',
        marginBottom: 8,
        height: 130,
        width: 350,
        borderRadius: 15
    },
    user: {
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 8,
    },
})

export default CartCard;