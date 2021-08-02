import { Image, StyleSheet, Text, TouchableOpacity, View, Vibration } from 'react-native'
import { Avatar, Card, Title, Paragraph, IconButton, Menu, Divider, Provider, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { useUserContext } from "../src/UserContext"
/* 
let apiURLputUser = "http://192.168.1.35:50247/api/User/putUser/"; */ // Asaf

/* let apiURLputUser = "http://192.168.31.156:50247/api/User/putUser/"; // Shachar */

 let apiURLputUser = "http://192.168.31.124:50247/api/User/putUser/"; // Sasson 


export default function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [openCamera, setopenCamera] = React.useState(null);
    const { updateImage, currentUser, fireStoreImg, getFireStoreImg } = useUserContext();




    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: false, allowsEditing: true, aspect: [4, 3], quality: 0 });

        if (pickerResult.cancelled === true) {
            return;
        }
        updateImage(pickerResult.uri);
        setSelectedImage({ localUri: pickerResult.uri });
        /* fetch(apiURLputUser + pickerResult.uri + '/' + currentUser.uid + '/', {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(response => {
                console.log('response=', response);
                console.log('response.status', response.status);
                console.log('response.ok', response.ok);
                return response.json();
            }) */
    }


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    let startCamera = () => {
        setopenCamera({ uri: "1" });
    }

    const takePicture = async () => {
        Vibration.vibrate();
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ quality: 0.3 });
            updateImage(photo.uri);
            setSelectedImage({ localUri: photo.uri });
        }
        else { alert("Camera isn't ready") }

    }

    if (selectedImage !== null) {
        fireStoreImg();
        getFireStoreImg();
    }

    if (openCamera !== null) {
        return (
            <View style={styles.container}>
                <Camera ref={ref => { this.camera = ref; }} style={styles.cameraImage} type={type}>
                    <View >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { takePicture() }}
                            style={{
                                width: 70,
                                height: 70,
                                top: 330,
                                left: 144,
                                borderRadius: 50,
                                backgroundColor: '#1086f9a1'
                            }}
                        />
                    </View>
                </Camera>
            </View>
        );
    }


    return (
        <View>
            <View >
                <AntDesign
                    style={styles.camera}
                    name="camerao"
                    size={40}
                    color="black"
                    title="Take picture"
                    onPress={() => { startCamera() }}
                />
            </View>
            <View >
                <MaterialCommunityIcons
                    style={styles.gallery}
                    name="image-plus"
                    size={40}
                    color="black"
                    title="Add Picture"
                    onPress={() => { openImagePickerAsync() }}
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    camera: {
        position: 'absolute',
        left: 66,
        bottom: 34
    },
    gallery: {
        position: 'absolute',
        right: 66,
        bottom: 34
    },
    smallImage: {
        width: 350,
        height: 450,
        left: "5%",
        resizeMode: "contain"
    },

    cameraImage: {
        width: 350,
        height: 450,
        left: "5%",
        resizeMode: "contain"
    },
})