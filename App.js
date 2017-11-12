import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput style={{height: 50}}
        placeholder='Username'
        onChangeText={(text) => this.setState({text})}
        />
        <TextInput style={{height: 50}}
        placeholder='Password'
        onChangeText={(text) => this.setState({text})}
        />
        <Button color='#32CD32' title="Login" onPress={() => navigate('Home')}/>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    buttonTitle: 'Unlock', // default button color goes here
    };
  }
  static navigationOptions = {
    title: 'Home',
  };
  _onButtonPress = () => {
    if (this.state.buttonTitle == 'Unlock') {
      this.setState({ buttonTitle: 'Lock'});
    }
    else {
      this.setState({ buttonTitle: 'Unlock'});
    }
  }
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text> Welcome </Text>
        <Text> Press to lock/unlock. </Text>
        <Button color='#32CD32' title={this.state.buttonTitle} onPress={() => this._onButtonPress()}/>
        <Button color='#D3D3D3' title='Logout' onPress={() => goBack()}/>
      </View>
    );
  }
}

const App = StackNavigator ({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
