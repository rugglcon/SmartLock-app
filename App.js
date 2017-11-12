import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';

class LoginScreen extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    username: false,
    password: false,
    };
  }
  static navigationOptions = {
    title: 'Login',
  };
  _onLogin = () => {
    if (this.state.username == false || this.state.password == false) {
      Alert.alert('Enter both a username and password');
    }
    else {
      this.props.navigation.navigate('Home');
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
        style={{height: 50}}
        placeholder='Username'
        onChangeText={(text) => this.setState({text})}
        onSubmitEditing={() => this.setState({ username: true })}
        />
        <TextInput
        style={{height: 50}}
        placeholder='Password'
        onChangeText={(text) => this.setState({text})}
        secureTextEntry={true}
        onSubmitEditing={() => this.setState({ password: true })}
        />
        <Button color='#32CD32' title="Login" onPress={() => this._onLogin()}/>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    buttonTitle: 'Unlock',
    currentState: 'Locked',
    };
  }
  static navigationOptions = {
    title: 'Home',
  };
  _onButtonPress = () => {
    if (this.state.buttonTitle == 'Unlock') {
      this.setState({ buttonTitle: 'Lock'});
      this.setState({ currentState: 'Unlocked' });
    }
    else {
      this.setState({ buttonTitle: 'Unlock'});
      this.setState({ currentState: 'Locked' });
    }
  }
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text> Welcome! </Text>
        <Text> Your Apartment is {this.state.currentState}. </Text>
        <Text> Press to {this.state.buttonTitle}. </Text>
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
