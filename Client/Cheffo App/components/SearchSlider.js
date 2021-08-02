import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { useUserContext } from "../src/UserContext";

const SearchSlider = () => {
    const { sliderValue, setSliderValue } = useUserContext();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={{ color: 'black' }}>Distance from cheffo: {sliderValue} Km</Text>
                <Slider
                    maximumValue={40}
                    minimumValue={2}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    step={2}
                    value={sliderValue}
                    onValueChange={(sliderValue) => setSliderValue(sliderValue)}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
        backgroundColor: 'rgb(240,240,240)',
        transform: [{ scaleX: 1 }, { scaleY: 1.3 }]
    },
});

export default SearchSlider;