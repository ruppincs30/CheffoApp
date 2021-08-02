import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import Paragraph from '../components/Paragraph'
import { script }  from '../src/script'


const StartScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Welcome to Cheffo</Header>

{/* // added for scripts */}
   {/*  <Button mode="contained" onPress={script}>
    <Text style={{ color: 'rgb(255 ,255, 255)' , fontWeight: 'bold'}}>scr</Text>
    </Button> */}
{/* // untill here */}

    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
    <Text style={{ color: 'rgb(255 ,255, 255)' , fontWeight: 'bold'}}>Login</Text>
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
  </Background>
)

export default StartScreen
