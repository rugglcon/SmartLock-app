import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class LockUnlockButton extends React.Component {
    render() {
        return (
            <Button style={buttonStyles.main}>Unlock</Button>
        );
    }
}

const buttonStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});