import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { View, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useUserContext } from "../src/UserContext"


const FriendsReviewsCard = (props) => {
    return (
        <Card style={styles.shadow} onPress={props.onPress}>
            <View style={styles.user}>
                <Avatar.Image size={48} source={{ uri: props.reviewData.UserImg }} />
                <Card.Title title={props.reviewData.UserFirstName + ' ' + props.reviewData.UserLastName} subtitle={'Wrote a review on ' + props.reviewData.DisplayName + ' by ' + props.reviewData.ChefFirstName + ' ' + props.reviewData.ChefLastName} />
            </View>
            <Card.Content style={{ marginLeft: "3.5%", width:"90%" }}>
                <AntDesign name="star" size={20} color="#ffcc00" >
                    <Text style={{ fontSize: 15, color: '#8c8c8c'}}> {props.reviewData.ReviewRating} - </Text>
                    <Text style={{ fontSize: 15, color: '#8c8c8c'}}> {props.reviewData.ReviewText}</Text>
                </AntDesign>
                <Card.Cover source={{ uri: props.reviewData.ChefImg }} style={{ marginTop: 20, height: 150, width: 330, }} />
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({

    shadow: {
        overflow: 'hidden',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 8,
        alignItems: 'baseline'
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 8,
        marginLeft: 8,
    },
})

export default FriendsReviewsCard;