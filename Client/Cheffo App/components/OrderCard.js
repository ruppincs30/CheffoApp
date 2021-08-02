import * as React from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { View, StyleSheet, Image, ScrollView, SafeAreaView, Text } from 'react-native';
import Button from '../components/Button'
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { startNavWaze } from '../helpers/waze'
import { makeCall } from '../helpers/phoneCall'



const OrderCard = (props) => (
    <Card style={styles.shadow}>
        <View styl e={styles.user}>
            <Title style={{ fontSize: 18 }}>    {props.Order.Chef} - <Text style={{ fontSize: 15, color: 'black' }}>{props.Order.OrderTime}</Text> - <Text style={{ fontSize: 15, color: 'black' }}>(#{props.Order.OrderId})</Text></Title>
            <Card.Content style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ fontSize: 16, color: 'black' }}> {props.Order.OrderDescription.split("; ").map((item, key) =>
                    <Text>{item ? key != (props.Order.OrderDescription.split("; ").length - 2) ? item + "₪ \n" : item + "₪" : null} </Text>)}</Text>
                <Text style={{
                    borderTopColor: '#c9c9c9', borderTopWidth: 1, paddingTop: 5, marginTop: 5, fontFamily: 'sans-serif-medium', fontSize: 17, color: 'green'
                }}> Order Total: {props.Order.TotalPrice}₪</Text>
                <View style={{ marginBottom: '3%', paddingTop: 15 }}>
                    {console.log(props)}
                    <View style={{ position: 'absolute', marginTop: -40, left: '80%'}}>
                        <Button style={{ position: 'absolute' }} onPress={() => { startNavWaze(props.Chef.Lat, props.Chef.Lon) }}><FontAwesome5 name="waze" size={24} color="black" /></Button>
                        <Button style={{ position: 'absolute', left: -50 }} onPress={() => { makeCall(props.Chef.PNumber) }}><Feather name="phone-call" size={24} color="black" /></Button>
                    </View>
                    <Text style={{ fontSize: 16, color: 'black', flexDirection: 'row' }}> Order status: {props.Order.Status == 'close' ? <Text style={{ color: '#808080' }}> Order completed </Text> : props.Order.Status == 'approved' ? <Text style={{ color: 'teal' }}> {props.Order.Chef} is preparing your order! </Text> : props.Order.Status == 'ready' ? <Text style={{ color: '#2f8735' }}> Order ready for pickup! </Text> : props.Order.Status == 'canceled' ? <Text style={{ color: 'red' }}> Order canceled </Text> : <Text style={{ color: 'orange' }}> Awaiting {props.Order.Chef}'s approval </Text>}
                    </Text>
                    {props.Order.Status == "close" && props.Order.ReviewId == 0 ?
                        <Button mode="outlined" style={{ alignSelf: 'flex-end', width: 150, borderRadius: 15, backgroundColor: 'rgb(255,138,87)' }} onPress={() => { props.reviewOrder(props.Order) }}>
                            <Text style={{ fontSize: 10, color: 'rgb(255 ,255, 255)', fontWeight: 'bold' }}>Review Order</Text>
                        </Button> : null}

                </View>
            </Card.Content>
        </View>
    </Card >

);

const styles = StyleSheet.create({

    shadow: {
        flex: 1,
        width: 370,
        marginTop: 8,
        marginBottom: 5,
        elevation: 10,
        borderRadius: 15,
    },
})

export default OrderCard;