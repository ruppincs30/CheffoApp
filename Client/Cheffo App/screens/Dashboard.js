
import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Modal, Pressable, SafeAreaView, Animated, Alert, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Background from '../components/Background'
import PaperButton from '../components/Button'
import { useUserContext } from "../src/UserContext"
import { SimpleLineIcons, AntDesign, Ionicons, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Divider, Slider } from 'react-native-elements';
import RestaurantCard from '../components/RestaurantCard'
import FriendsReviewsCard from '../components/FriendsReviewsCard'
import FriendCard from '../components/FriendCard'
import OrderCard from '../components/OrderCard'
import SearchSlider from '../components/SearchSlider'
import ImagePicker from '../helpers/ImagePicker'
import { SearchBar } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { set } from 'ol/transform';
import { Rating } from 'react-native-ratings';


const Dashboard = ({ navigation }) => {
  const userContext = useUserContext()
  const Tab = createMaterialBottomTabNavigator();
  const { orderLoading, loading, currentUser, Logout, chefsArr, selectedChef, currentChefDishes, setCurrentChefDishes,
    selectedImage, sliderValue, orders, getOrders, setCart, getFireStoreImg, connectionsArr, getConnections,
    setFriendsArr, friendsSuggestion, friendsArr, friendsReviews, getFeed, friendsArrDetails, postReview, currentReview, ratingsUpdated, setRatingsUpdated } = useUserContext();
  const [value, setValue] = useState('Rating');
  const [dChefs, setDChefs] = useState([]);
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState("")
  const [reviewModalShow, setReviewModalShow] = useState(false)
  const [currentOrder, setCurrentOrder] = useState('')
  const [ratingChef, setRatingChef] = useState('')
  const [ratingChefEmail, setRatingChefEmail] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const myData = [].concat(chefsArr).sort((a, b) => a.Rating < b.Rating ? 1 : -1);

  const sortedOrders = [].concat(orders)
    .sort((a, b) => a.OrderId < b.OrderId ? 1 : -1);

  useEffect(() => {
    if (currentChefDishes) {
      navigation.navigate('DishesScreen');
    }
  }, [currentChefDishes])

  useEffect(() => {
    if (friendsSuggestion == '') {
      getConnections()
      setDChefs(myData)
    }
  }, [])

  useEffect(() => {
    sortChefs(value)
  }, [value])

  useEffect(() => {
  }, [dChefs])


  const sortChefs = (value) => {
    value == "Rating" ? sortByRating() : value == "Distance" ? sortByDistance() : sortByReviews()
    console.log(chefsArr)
    console.log(value)
  };

  const sortByRating = () => {
    if (searchResult?.length > 0) {
      let chefsByRating = [].concat(chefsArr)
        .sort((a, b) => a.Rating < b.Rating ? 1 : -1);
      setSearchResult(chefsByRating)
    }
    else {
      let chefsByRating = [].concat(myData)
        .sort((a, b) => a.Rating < b.Rating ? 1 : -1);
      setDChefs(chefsByRating)
    }
  }


  const sortByDistance = () => {
    if (searchResult?.length > 0) {
      let chefsByDistance = [].concat(searchResult)
        .sort((a, b) => a.DisFromUser > b.DisFromUser ? 1 : -1);
      setSearchResult(chefsByDistance)
    }
    else {
      let chefsByDistance = [].concat(myData)
        .sort((a, b) => a.DisFromUser > b.DisFromUser ? 1 : -1);
      setDChefs(chefsByDistance)
    }
  }

  const sortByReviews = () => {
    if (searchResult?.length > 0) {
      let chefsByReviews = [].concat(chefsArr)
        .sort((a, b) => a.NumOfReviews < b.NumOfReviews ? 1 : -1);
      setSearchResult(chefsByReviews)
    }
    else {
      let chefsByReviews = [].concat(myData)
        .sort((a, b) => a.NumOfReviews < b.NumOfReviews ? 1 : -1);
      setDChefs(chefsByReviews)
    }
  }

  function showRatingsModal(displayName, chefEmail) {
    setRatingChef(displayName);
    setRatingChefEmail(chefEmail)
    setModalVisible(true);
  }
  function calcComputedRating(chef) {
    if (chef) {
      let ratingsAdded = chef.NumOfReviews;
      let chefsNewRating = chef.Rating * ratingsAdded;
      if (friendsReviews) {
        friendsReviews.forEach(review => {
          if (chef.Email == review.ChefEmail) {
            ratingsAdded += Math.round(chef.NumOfReviews / 2);
            chefsNewRating += review.ReviewRating * (Math.round(chef.NumOfReviews / 2))
          }
        });
      }
      console.log(chefsNewRating / ratingsAdded)
      return (chefsNewRating / ratingsAdded);
    }
  }

  function Search() {
    function updateSearch(searchVal) {
      setSearch(searchVal);
      setSearchResult([])

      let results = [];
      if (searchVal) {
        console.log(searchVal)
        console.log(chefsArr)
        myData.forEach(chef => {
          let fullName = chef.DisplayName + ' ' + chef.Address + ' ' + chef.foodType;
          ((fullName.toLowerCase().includes(searchVal.toLowerCase())) ? results.push(chef) : null)
        });
      }
      setSearchResult(results)
      console.log(results)
    };

    var count = 0;
    return (

      <ScrollView style={{ marginTop: '5%', width: '100%' }}>
        <View style={{ backgroundColor: 'rgb(240, 240, 240)', alignItems: 'center', width: '100%' }}>
          <SearchBar
            containerStyle={{ width: "100%", padding: "1.5%", marginTop: "3%", backgroundColor: "rgb(248,248,248 / 0%)" }}
            lightTheme
            round="true"
            placeholder="Search ..."
            onChangeText={updateSearch}
            value={search}
          />

          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text style={styles.enhanceText}>Sort By: </Text>
              </View>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text>Rating</Text>
                <RadioButton value="Rating" />
              </View>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text>Distance</Text>
                <RadioButton value="Distance" />
              </View>
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Text># of Reviews</Text>
                <RadioButton value="Reviews" />
              </View>
            </View>
          </RadioButton.Group>

        </View>
        <View style={{ marginLeft: '2.5%', marginTop: "-4%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {search != "" ?
            searchResult != "" ? searchResult.map((item, key) =>
              <RestaurantCard
                name={item.DisplayName} img={item.Img} city={item.Address} originalRating={item.OriginalRating} foodType={item.FoodType} email={item.Email} 
                showModal={showRatingsModal} numOfReviews={item.NumOfReviews} disFromUser={item.DisFromUser} lat={item.Lat} lon={item.Lon} key={key} pNumber={item.PNumber}
                onPress={async () => {
                  /* handleCardClick(item.Email); */
                  selectedChef(item.Email)
                  setCart([])
                }}>
              </RestaurantCard>)
              : <Text> No search results </Text>
            :
            myData ?
              <View style={{ marginTop: '5%', width: '100%' }}>
                <SearchSlider></SearchSlider>
                {dChefs.reduce((a, b) => b.DisFromUser ? a : a + 1, 0) == 0 ? dChefs.map((item, key) =>
                  (sliderValue > item.DisFromUser) ?
                    <RestaurantCard
                      name={item.DisplayName} img={item.Img} city={item.Address} originalRating={item.OriginalRating} numOfReviews={item.NumOfReviews} pNumber={item.PNumber}
                      foodType={item.FoodType} disFromUser={item.DisFromUser} key={key} showModal={showRatingsModal} email={item.Email} lat={item.Lat} lon={item.Lon}
                      onPress={async () => {
                        selectedChef(item.Email)
                        setCart([])
                      }}>
                    </RestaurantCard>
                    : null) : myData.map((item, key) =>
                      (sliderValue > item.DisFromUser) ?
                        <RestaurantCard
                          name={item.DisplayName} img={item.Img} city={item.Address} originalRating={item.OriginalRating} rating={item.Rating} email={item.Email} pNumber={item.PNumber}
                          showModal={showRatingsModal} numOfReviews={item.NumOfReviews} foodType={item.FoodType} disFromUser={item.DisFromUser} lat={item.Lat} lon={item.Lon} key={key}
                          onPress={async () => {
                            selectedChef(item.Email)
                            setCart([])
                          }}>
                        </RestaurantCard>
                        : null)}
              </View>
              : <Text> No restaurant near you </Text>
          }
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}

        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {friendsReviews ? friendsReviews.reduce((a, b) => b.ChefEmail == ratingChefEmail ? a + 1 : a, 0) == 0 ? <Text style={[styles.enhanceText], { textAlign: "center" }}> None of your friends have rated {ratingChef ? ratingChef : null}{"\n"} Consider using our suggesting system to follow more friends!</Text> : <View><Text style={styles.modalTextHeader}>Your friends computed rating: {(calcComputedRating(myData.filter(e => e.Email === ratingChefEmail)[0])?.toFixed(1))} </Text><Text style={styles.modalSubHeader}>Here is what they thought about {ratingChef ? ratingChef : null}:</Text></View> : <Text style={[styles.enhanceText], { textAlign: "center" }}> None of your friends have rated {ratingChef ? ratingChef : null}{"\n"} Consider using our suggesting system to follow more friends!</Text>}
              {friendsReviews ? friendsReviews.map((item, key) => item.ChefEmail == ratingChefEmail ?
                <Text><Text style={styles.enhanceText}>{item.UserFirstName} {item.UserLastName}</Text> rated: <Text style={styles.enhanceText}>{item.ReviewRating}</Text></Text>
                : null)
                : null}
              <View style={[styles.modalTextTotal, { marginBottom: '15%' }]}></View>
              <Pressable
                style={[styles.textStyle, styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }
                }
              >
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>


    )
  }
  function reviewOrder(order) {
    setCurrentOrder(order);
    console.log(order)
    setReviewModalShow(true);
  }

  async function saveReview(foodStars, serviceHearts, reviewDescription, currentOrderCopy) {
    await postReview(foodStars, serviceHearts, reviewDescription, currentOrderCopy)
    /* currentOrder.ReviewId = currentReview.ReviewId */
  }


  function MyOrders() {
    var foodStars = 2.5;
    var serviceHearts = 2.5;
    var reviewDescription;
    return (
      orderLoading ?
        <View style={{ marginTop: "10%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'sans-serif-light', color: "#3ec92d", fontSize: 22 }}>My Orders</Text>
          <ScrollView style={{ width: "100%" }}>
            <View style={{ marginTop: "5%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {sortedOrders != [] ? sortedOrders.map((item, key) =>
                <OrderCard key={key} Order={item} Chef={chefsArr.filter(e => e.Email === item.ChefEmail)[0]} reviewOrder={() => reviewOrder(item)}> Review={currentReview}</OrderCard>
              ) : <Text>No orders found</Text>}
            </View>
          </ScrollView>
          {<Modal
            animationType="fade"
            transparent={true}
            visible={reviewModalShow}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setReviewModalShow(!reviewModalShow);
            }}

          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.modalText, styles.modalTextTotal]}> Review {currentOrder?.Chef ? currentOrder.Chef : null} ! </Text>
                <View>
                  <Text style={styles.modalText}> How was the food?
                    <Rating
                      type='star'
                      ratingCount={5}
                      imageSize={40}
                      showRating
                      fractions={1}
                      onFinishRating={function (value) { foodStars = value }}
                    />
                  </Text>
                </View>
                <View>
                  <Text style={styles.modalText}> How was the service?
                    <Rating
                      type='heart'
                      ratingCount={5}
                      imageSize={40}
                      showRating
                      fractions={1}
                      onFinishRating={function (value) { serviceHearts = value }}
                    />
                  </Text>
                </View>
                <View>
                  <Text style={styles.modalText}> Describe your experience
                  </Text>
                  <SafeAreaView style={{ marginBottom: '25%' }}>
                    <TextInput
                      style={styles.input}
                      value={reviewDescription}
                      onChangeText={function (text) { reviewDescription = text }}
                      multiline={true}
                      underlineColorAndroid='transparent'
                    />
                  </SafeAreaView>
                </View>

                <Pressable
                  style={[styles.textStyle, styles.button, styles.buttonClose]}
                  onPress={() => {
                    saveReview(foodStars, serviceHearts, reviewDescription, currentOrder);
                    setReviewModalShow(!reviewModalShow);
                    setCurrentOrder('');
                  }
                  }
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>


              </View>
            </View>
          </Modal>}
        </View> : <Image
          source={require('../assets/loadingif.gif')}
          style={{ width: '100%', height: '100%' }} />
    );
  }
  function Feed() {
    return (
      <View style={{ marginTop: "10%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'sans-serif-light', color: "#3ec92d", fontSize: 22 }}>Feed</Text>
        <ScrollView style={{ width: "100%" }}>
          {friendsReviews ? friendsReviews.map((item, key) =>
            <FriendsReviewsCard key={key}
              reviewData={item}
            >
            </FriendsReviewsCard>
          ) : <Text>Feed is empty</Text>}

        </ScrollView>

      </View>
    );
  }


  function Friends() {
    navigation.navigate('FriendsScreen')
    return (
      null
    )

  }

  function Profile() {
    return (
      <Background>
        <PaperButton style={{ marginLeft: 280 }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
        >
        </PaperButton>
        <Image
          source={{ uri: currentUser.img }}
          style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
        />
        <ImagePicker ></ImagePicker>
        <View style={{ width: '100%', paddingTop: 60, paddingBottom: 60 }}>
          <Text style={styles.profileText} >
            <AntDesign name="user" size={24} color="black" style={{ paddingRight: 20 }} />
            <Text> </Text>{currentUser.firstName + " " + currentUser.lastName}</Text>
          <Divider style={StyleSheet.flatten(styles.profileDivider)} />
          <Text style={styles.profileText}>
            <AntDesign name="mail" size={24} color="black" style={{ paddingRight: 20 }} />
            <Text> </Text>{currentUser.email}</Text>
          <Divider style={StyleSheet.flatten(styles.profileDivider)} />
          <Text style={styles.profileText}>
            <AntDesign name="home" size={24} color="black" style={{ paddingRight: 20 }} />
            <Text> </Text>{currentUser.city}</Text>
          <Divider style={StyleSheet.flatten(styles.profileDivider)} />
          <Text style={styles.profileText}>
            <AntDesign name="phone" size={24} color="black" style={{ paddingRight: 20 }} />
            <Text> </Text>{currentUser.pNumber}</Text>
        </View>

        <PaperButton
          mode="outlined"
          onPress={() => {
            Logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
          }
        >
          Logout
        </PaperButton>
      </Background>
    );

  }

  function showMyFriends() {
    return (
      <View style={{ marginTop: "10%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView style={{ height: "60%", width: "100%" }}>
          <Text style={{ textAlign: 'center', fontFamily: 'sans-serif-light', color: "#3ec92d", fontSize: 22 }}>My Friends</Text>
          {friendsArrDetails ? friendsArrDetails.map((item, key) =>
            <FriendCard key={key}
              friendData={item}>
            </FriendCard>
          ) : <Text>You have no friends yet</Text>}
        </ScrollView>
      </View>
    )
  }

  return (
    loading ?
      (<Tab.Navigator
        initialRouteName="Search"
        activeColor="#fff"
        barStyle={{ backgroundColor: 'rgb(243,119,0)' }}
      >

        <Tab.Screen name="Search" component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" size={20} color={color} />

            ),
          }}
        />
        <Tab.Screen name="My Orders" component={MyOrders}
          options={{
            tabBarLabel: 'My Orders',
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons style={styles.tabIcon} name="book-open" size={20} color={color} />
            ),
          }}
          listeners={() => ({ tabPress: e => { getOrders() } })}
        />
        <Tab.Screen name="Feed" component={Feed}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons style={styles.tabIcon} name="feed" size={20} color={color} />
            ),

          }}
        /* listeners={() => ({ tabPress: e => { getConnections() } })} */

        />
        <Tab.Screen name="Friends" component={Friends}
          options={{
            tabBarLabel: 'Friends',
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="people" size={20} color={color} />
            ),

          }}

        />

        <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="user" size={20} color={color} />
            ),
          }}
        /* listeners={() => ({ tabPress: e => { console.log(currentUser); getFireStoreImg() } })} */
        />
      </Tab.Navigator>) : <Image
        source={require('../assets/loadingif.gif')}
        style={{ width: '100%', height: '100%' }}
      />
  )
}

const styles = StyleSheet.create({
  enhanceText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tabIcon: {
    flex: 0,
    paddingBottom: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  camera: {
    position: 'absolute',
    left: 66,
    top: 200
  },
  gallery: {
    position: 'absolute',
    right: 66,
    top: 200
  },
  profileText: {
    fontSize: 20,
  },

  profileDivider: {
    backgroundColor: 'rgb(189 ,189 ,189)',
    alignSelf: "center",
    width: 350,
    marginTop: 30,
    marginBottom: 30
  },

  btn_container: {
    flex: 1,
    backgroundColor: "#59a6eb",
    justifyContent: "center",
    width: "100%",
    elevation: 8,
    borderRadius: 5,
    margin: 1,
  },
  circleButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14
  },
  modalTextHeader: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  modalSubHeader: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  },

  modalTextTotal: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
    width: "100%",
    paddingBottom: "5%"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '75%',

  },
  button: {
    borderRadius: 10,
    position: "absolute",
    bottom: 8,
    width: 80,
  },
  buttonOpen: {
    backgroundColor: 'rgb(62,197,0)',
  },
  buttonClose: {
    backgroundColor: 'rgb(62,197,0)',
    padding: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    width: 200,
    borderColor: '#c9c9c9',
    borderWidth: 1,
  },
})

export default Dashboard