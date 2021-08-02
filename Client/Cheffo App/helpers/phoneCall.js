import { Linking, Platform } from 'react-native';

export function makeCall(pNumber) {
    let phoneNumber;
    if (Platform.OS === 'android') {
        phoneNumber = 'tel:${' + pNumber + '}';
    } else {
        phoneNumber = 'telprompt:${' + pNumber + '}';
    }
    Linking.openURL(phoneNumber);
};
