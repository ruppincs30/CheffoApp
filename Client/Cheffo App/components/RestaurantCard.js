import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { View, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { startNavWaze } from '../helpers/waze'
import { makeCall } from '../helpers/phoneCall'

const RestaurantCard = (props) =>
(
    <Card style={styles.shadow} onPress={props.onPress}>
        <Card.Cover source={{ uri: props.img }} style={{ borderRadius: 15, borderTopRightRadius: 15, borderTopLeftRadius: 15, height: 150, width: 330, }} />
        <Card.Title title={props.name} subtitle={props.city} />
        <Card.Content>
            <AntDesign name="star" size={20} color="#ffcc00" >
                <Text style={{ fontSize: 20, color: '#34c0eb', textDecorationLine: 'underline' }} onPress={() => props.showModal(props.name, props.email)}> {props.originalRating.toFixed(1)} ({props.numOfReviews})</Text>
                <Text style={{ color: '#dedede' }}> |</Text>
                <Text style={{ fontSize: 15, color: '#8c8c8c' }}> {props.foodType}</Text>
                <Text style={{ color: '#dedede' }}> |</Text>
                <Text style={{ fontSize: 15, color: '#8c8c8c' }}> {Math.round((props.disFromUser) * 10) / 10} Km from you</Text>
            </AntDesign>
        </Card.Content>
        <Card.Actions style={{ position: 'absolute', bottom: '25%', left: '75%' }}>
            <Button style={{ position: 'absolute' }} onPress={() => { startNavWaze(props.lat, props.lon) }}><FontAwesome5 name="waze" size={36} color="black" /></Button>
            <Button style={{ position: 'absolute', left: -50 }} onPress={() => { makeCall(props.pNumber) }}><Feather name="phone-call" size={32} color="black" /></Button>
        </Card.Actions>
    </Card>
);

const styles = StyleSheet.create({

    shadow: {
        height: 280,
        width: 370,
        marginTop: 8,
        marginBottom: 8,
        elevation: 5,
        paddingTop: 15,
        alignItems: 'center',
        borderRadius: 15,
    },
})

export default RestaurantCard;

