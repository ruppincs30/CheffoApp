import React, { useEffect } from 'react'
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { View, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useUserContext } from "../src/UserContext"


const FriendCard = (props) => {
    const { friendsArrDetails, followUser, unfollowUser } = useUserContext();
    return (
        <Card style={styles.shadow}>
            <View style={styles.user}>
                {/*  <Card.Cover source={{ uri: props.img }} style={{ borderRadius: 15, borderTopRightRadius: 15, borderTopLeftRadius: 15, height: 150, width: 330, }} /> */}
                <Avatar.Image size={48} source={{ uri: props.friendData.img }} />
                <Card.Title title={props.friendData.firstName + ' ' + props.friendData.lastName} subtitle={'Approximately ' + props.friendData.distance + 'km from you'} />

                <View style={{ position: 'absolute', top: '19%', left: '78%' }}>
                    {friendsArrDetails ? friendsArrDetails.filter(e => e.email === props.friendData.email).length === 0 ? <TouchableOpacity style={[styles.btn, styles.followButton]} onPress={() => followUser(props.friendData.userUid)} id="btn"><Text style={styles.btnText}>Follow</Text></TouchableOpacity> :
                        <TouchableOpacity style={[styles.btn, styles.unfollowButton]} onPress={() => unfollowUser(props.friendData.uid)} id="btn"><Text style={styles.btnText}>Unfollow</Text></TouchableOpacity> : <TouchableOpacity style={[styles.btn, styles.followButton]} onPress={() => followUser(props.friendData.userUid)} id="btn"><Text style={styles.btnText}>Follow</Text></TouchableOpacity>}
                </View>
            </View>
            {props.friendData.depth == 1 ? friendsArrDetails?.filter(e => e.uid === props.friendData.fatherUid)[0] ? <Card.Content><View><Text>{friendsArrDetails?.filter(e => e.uid === props.friendData.fatherUid)[0]?.firstName} is a mutual friend</Text></View></Card.Content> : null : null}
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
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 8,
        marginLeft: 8,
    },
    btn: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        color: '#ffffff',
        elevation: 8,
        borderRadius: 10,
        padding: 10,
    },
    followButton: {
        backgroundColor: '#1f9c3a'
    },
    unfollowButton: {
        backgroundColor: '#ba0b1d'
    },
    btnText: {
        color: 'white'
    }

})

export default FriendCard;