import React, { useEffect, useState, useRef } from 'react'
import Button from '../components/Button'
import { Text, Card } from 'react-native-paper'
import { Badge } from 'react-native-elements'
import { SimpleLineIcons, AntDesign, Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import BackButton from '../components/BackButton'
import DishCard from '../components/DishCard'
import CartCard from '../components/CartCard'
import { useUserContext } from "../src/UserContext"
import { View, StyleSheet, Image, ScrollView, SafeAreaView, Modal, Pressable, Alert, Linking, Platform } from 'react-native';
import { startNavWaze } from '../helpers/waze'
import { makeCall } from '../helpers/phoneCall'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const DishesScreen = ({ navigation }) => {
    const { currentChefDishes, currentChef, cart, setOrder, setCart, currentOrder, setCurrentChef } = useUserContext();
    const Tab = createMaterialBottomTabNavigator();
    const [modalVisible, setModalVisible] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const badgeValue = useRef(null)

    useEffect(() => {
        console.log('')

    }, [cart])

    const reRenderDishesScreen = () => {
        let tempBadge = badgeValue.current
        badgeValue.current = cart.reduce((a,b) => b.Quantity ? a + b.Quantity : a, 0)
        console.log(badgeValue.current)
        if (tempBadge != badgeValue.current) {
            setForceUpdate(!forceUpdate)
        }
    }

    function ShowDishes() {
        return (
            <View style={{ height: "100%", width: '100%' }}>
                {!currentChef ? navigation.goBack() : null}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <BackButton goBack={() => { navigation.goBack(); setCurrentChef(''); console.log('NOW') }} />
                </View>
                <Text style={{ marginTop: "15%", textAlign: 'center', fontFamily: 'sans-serif-light', color: "#3ec92d", fontSize: 22 }}>{currentChef.DisplayName}'s Menu</Text>
                <ScrollView style={{ width: '100%' }}>
                    <View style={{ marginTop: "5%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {currentChefDishes.map((item, key) =>
                            <DishCard name={item.DisplayName} img={item.Img} reRenderDishesScreen={reRenderDishesScreen}
                                dishType={item.DishType} description={item.Description} price={item.Price} key={key}>
                            </DishCard>
                        )}
                    </View>
                </ScrollView >
            </View>
        );
    }

    const modalPop = () => {
        setOrder();
        setModalVisible(true);
        /*  console.log(currentOrder) */
    }

    function ShowCart() {
        return (
            <View style={{ height: "100%", alignItems: 'center' }}>
                <Text style={{ marginTop: '10%', fontSize: 35, textAlign: 'center', color: 'green' }}>My Cart</Text>
                {console.log(cart)}
                {(cart.length > 0) && cart.reduce((a, b) => b.Quantity ? a + b.Quantity : a, 0) > 0 ?
                    cart.map((item, i) =>
                        (item.Quantity == 0 || !item.Quantity) ? null : <CartCard currentChef={currentChef} key={i} cartDish={item}></CartCard>)
                    :
                    <Text style={{ textAlign: 'center' }}>Your cart is empty</Text>
                }
                {(cart.length > 0) && cart.reduce((a, b) => b.Quantity ? a + b.Quantity : a, 0) > 0 ?
                    <View style={{ marginRight: "2%", marginTop: 'auto', marginLeft: 'auto' }}>
                        <View >
                            <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 17, color: 'green' }}> Cart Total: {cart.reduce((a, b) => b.Quantity ? a + (b.Price * b.Quantity) : a, 0)}₪</Text>
                        </View>
                        <View>
                            <Button mode="outlined" style={{ borderRadius: 15, backgroundColor: 'rgb(255,138,87)' }} onPress={modalPop}>
                                <Text style={{ color: 'rgb(255 ,255, 255)', fontWeight: 'bold' }}>Order Now</Text>
                            </Button>
                        </View>
                    </View>
                    : null

                }

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
                            <AntDesign name="checkcircleo" size={35} color="rgb(62, 197, 0)" style={{ paddingBottom: 15 }} />
                            <Text style={styles.modalText}>{currentChef.DisplayName} received your order ! </Text>
                            <Text style={styles.modalText}>{currentOrder.OrderId ? "Order no #" + currentOrder.OrderId : null}</Text>
                            <Text style={styles.modalText}>{currentOrder.OrderId ? "Order time: " + currentOrder.OrderTime : null}</Text>
                            {currentOrder.OrderDescription?.split("; ").map((item, key) =>
                                <Text style={styles.modalText}> {item ? item + "₪" : null} </Text>)}
                            <Text style={styles.modalText}> Pick up: {currentChef.Address} <FontAwesome5 name="waze" size={28} color="black" onPress={() => { startNavWaze(currentChef) }} /> </Text>
                            <Text style={styles.modalText}> Call chef: <Feather name="phone-call" size={28} color="black" onPress={() => { makeCall(currentChef.PNumber) }} /></Text>
                            <Text style={styles.modalTextTotal}>Order Total: {cart.reduce((a, b) => b.Quantity ? a + (b.Price * b.Quantity) : a, 0)}₪</Text>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    setCart([]);
                                }
                                }
                            >
                                <Text style={styles.textStyle}>Ok</Text>
                            </Pressable>

                            <Text style={styles.textStyle}>Ok</Text>

                        </View>
                    </View>
                </Modal>


            </View>
        );
    }



    return (
        <Tab.Navigator
            initialRouteName="ShowDishes"
            activeColor="#fff"
            barStyle={{ backgroundColor: 'rgb(62,197,0)' }}
        >
            <Tab.Screen name="ShowDishes" component={ShowDishes}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color }) => (
                        <SimpleLineIcons name="book-open" size={20} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="ShowCart" component={ShowCart}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ color }) => (
                        <View>
                            <View style={{ position: 'absolute', bottom: 10, right: 20 }}>
                                {cart?.reduce((a, b) => b.Quantity ? a + b.Quantity : a, 0) > 0 ? <Badge textStyle={{fontSize:12, fontWeight:'bold'}} badgeStyle={{width:'auto',height:'auto'}} ref={badgeValue} value={cart?.reduce((a, b) => b.Quantity ? a + b.Quantity : a, 0)} status="warning" /> : null}
                            </View>
                            <AntDesign
                                style={styles.tabIcon}
                                name="shoppingcart"
                                size={20}
                                color={color}
                            />
                        </View>

                    ),
                }}
            />
        </Tab.Navigator>
    )
}


export default DishesScreen

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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        position: "absolute",
        bottom: 8,
        width: 80
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 14
    },

    modalTextTotal: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        borderTopColor: 'black',
        borderTopWidth: 1,
        width: "100%",
        paddingTop: "5%"
    }






})
