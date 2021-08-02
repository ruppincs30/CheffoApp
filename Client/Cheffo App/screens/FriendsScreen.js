import React, { useEffect, useState } from 'react'
import PaperButton from '../components/Button'
import { Text, Card } from 'react-native-paper'
import { SimpleLineIcons, AntDesign, Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import BackButton from '../components/BackButton'
import { useUserContext } from "../src/UserContext"
import { View, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FriendCard from '../components/FriendCard'
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { toString } from 'ol/transform';

const FriendsScreen = ({ navigation }) => {
    const { currentChefDishes, currentChef, cart, setOrder, friendsSuggestion, friendsArrDetails, allUsers, loading, friendsLoading } = useUserContext();
    const Tab = createMaterialBottomTabNavigator();
    const [localFriendsArr, setLocalFriendsArr] = useState([]);


    useEffect(() => {
        if (friendsArrDetails) {
            setLocalFriendsArr(friendsArrDetails)
        }
    }, [friendsArrDetails])

    function ShowFriends() {
        return (
            friendsLoading ?
                <View style={{ marginTop: "15%", flex: 1 }}>
                    <View style={{ marginLeft: "3%", position: 'absolute', flex: 1 }}>
                        <AntDesign onPress={() => { navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }], }) }} name="arrowleft" size={25} color="black" />
                    </View>
                    <Text style={{ marginTop: "3%", marginBottom: "5%", textAlign: 'center', fontFamily: 'sans-serif-light', color: "#3ec92d", fontSize: 22 }}>My Friends</Text>
                    <ScrollView style={{ width: "100%" }}>

                        {localFriendsArr ? localFriendsArr.map((item, key) =>
                            <FriendCard key={key}
                                friendData={item}>
                            </FriendCard>
                        ) : <Text>You have no friends yet</Text>}
                    </ScrollView>
                </View> :
                <Image
                    source={require('../assets/eatstreet-loading.gif')}
                    style={{ width: '100%', height: '100%' }} />
        );
    }

    const myData = [].concat(friendsSuggestion)
        .sort((a, b) => a.score < b.score ? 1 : -1);
    var resArr = [];
    console.log(friendsArrDetails)
    myData.filter(function (item) {
        var i = resArr.findIndex(x => (x.userUid == item.userUid));
        if (i <= -1) {
            let flag = true;
            for(let i = 0; i < friendsArrDetails.length; i++) {
                if (item.userUid == friendsArrDetails[i].uid)
                {
                    flag = false;
                }
            }
            if(flag){
                resArr.push(item);
            }
        }
    });

    function ShowSuggestions() {
        const [search, setSearch] = useState('')
        const [searchResult, setSearchResult] = useState([])
        function updateSearch(searchVal) {
            setSearch(searchVal);
            setSearchResult([])

            let results = [];
            if (searchVal) {
                allUsers.forEach(currUser => {
                    let fullName = currUser.firstName + ' ' + currUser.lastName;
                    (fullName.toLowerCase().includes(searchVal.toLowerCase())) ? results.push(currUser) : null
                });
            }
            setSearchResult(results)
        };
        return (
            friendsLoading ?
                <View style={{ marginTop: "5%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <SearchBar
                        containerStyle={{ width: "100%", padding: "1.5%", marginTop: "6%", backgroundColor: "rgb(248,248,248 / 0%)" }}
                        lightTheme
                        round='true'
                        placeholder="Search friends..."
                        onChangeText={updateSearch}
                        value={search}
                    />
                    {console.log(resArr)}

                    <ScrollView style={{ width: "100%" }}>

                        {searchResult ? searchResult.map((item, key) =>
                            <FriendCard key={key}
                                friendData={item}>
                            </FriendCard>
                        ) : <Text>No match for your search</Text>}
                        <Text style={{ marginBottom: "3%", marginTop: "3%", textAlign: 'center', fontFamily: 'sans-serif-light', color: "rgb(45 74 39)", fontSize: 20 }}>People You May Know</Text>

                        {resArr ? resArr.filter(e => e.depth > 0).map((item, key) =>
                            <FriendCard key={key}
                                friendData={item}>
                            </FriendCard>
                        ) : <Text>No suggestion yet</Text>}
                    </ScrollView>
                </View> :
                <Image
                    source={require('../assets/eatstreet-loading.gif')}
                    style={{ width: '100%', height: '100%' }} />
        );
    }



    return (

        <Tab.Navigator
            initialRouteName="ShowFriends"
            activeColor="#fff"
            barStyle={{ backgroundColor: 'rgb(62,197,0)' }}
        >
            <Tab.Screen name="ShowFriends" component={ShowFriends}
                options={{
                    tabBarLabel: 'Friends',
                    tabBarIcon: ({ color }) => (
                        <SimpleLineIcons name="people" size={20} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="ShowSuggestions" component={ShowSuggestions}
                options={{
                    tabBarLabel: 'Suggestions',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="people-arrows" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default FriendsScreen

const styles = StyleSheet.create({

    cartBar: {
        height: 100,
        marginTop: '10%',
        width: '100%',
        backgroundColor: 'green',
    },
    shadow: {
        height: 60,
        width: 370,
        marginTop: 8,
        marginBottom: 5,
        elevation: 10,
        borderRadius: 15,
    },
})
