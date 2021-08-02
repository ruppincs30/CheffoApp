import { Linking } from 'react-native';

export function startNavWaze(lat, lon) {
    let navURL = 'https://waze.com/ul?ll=' + lat + ',' + lon + '';
    Linking.openURL(navURL)
}