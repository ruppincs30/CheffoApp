import React, { useState, useEffect, Component } from 'react'
import { Platform, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { phoneValidator } from '../helpers/phoneValidator'
import { useUserContext } from "../src/UserContext"
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { ScrollView } from 'react-native-gesture-handler'

const RegisterScreen = ({ navigation }) => {

  useEffect(() => {
    /*  const apiUrl = 'https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json';
     fetch(apiUrl)
       .then((response) => response.json())
       .then((data) => {
         setCityData(data);
       }) */
    getLocation();
  }, [location]);

  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [location, setLocation] = useState('');
  const [city, setCity] = useState({ value: '' })

  const userContext = useUserContext()
  const { signup } = useUserContext()

  const onSignUpPressed = () => {
    const firstNameError = nameValidator(firstName.value)
    const lastNameError = nameValidator(lastName.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const phoneError = phoneValidator(phone.value)


    if (firstNameError || lastNameError || phoneError || emailError || passwordError) {
      setFirstName({ ...firstName, error: firstNameError })
      setLastName({ ...lastName, error: lastNameError })
      setPhone({ ...phone, error: phoneError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    handleSignup();
  }

  const handleSignup = async () => {
    try {
      const ok = await signup(firstName.value, lastName.value, city, phone.value, email.value, password.value, location.lon, location.lat);
      console.log('hi')
      console.log(ok);
      if (ok) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      }

    } catch {
      alert("Failed to create an account")
    }
  };


  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('You must enable location sharing to signup');
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
      return;
    }

    let currLocation = await Location.getCurrentPositionAsync({});
    console.log(currLocation);
    await reverseGeocode(currLocation);
  }


  const locationStr = (json) => {
    let locStr = "";
    console.log(json);
    if (json.address.county) {
      locStr = json.address.county;
    }
    if (json.address.city) {
      locStr = json.address.city;
    }
    if (json.address.town) {
      locStr = json.address.town;
    }
    if (json.address.village) {
      locStr = json.address.village;
    }
    if (json.address.road) {
      locStr += ", " + json.address.road;
    }
    setCity(locStr);
    console.log(locStr);

  }

  function reverseGeocode(currLocation) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + currLocation.coords.longitude + '&lat=' + currLocation.coords.latitude + '&accept-language=en')
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        setLocation(json);
        locationStr(json);
      });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Create Account</Header>
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView>
          {<TextInput
            label="First Name"
            returnKeyType="next"
            value={firstName.value}
            onChangeText={(text) => setFirstName({ value: text, error: '' })}
            error={!!firstName.error}
            errorText={firstName.error}
          />}
          {<TextInput
            label="Last Name"
            returnKeyType="next"
            value={lastName.value}
            onChangeText={(text) => setLastName({ value: text, error: '' })}
            error={!!lastName.error}
            errorText={lastName.error}
          />}
          {<TextInput
            label="Location"
            returnKeyType="next"
            value={((location && city) ? city : '')}
            editable={false}
          />}
          {<TextInput
            label="Phone"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
          />}
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}
          >
            Sign Up
      </Button>
          <View style={styles.row}>
            <Text> Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Background>
  )
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default RegisterScreen
