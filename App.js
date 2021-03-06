import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';

global.APIroot = 'http://my-json-server.typicode.com/bmeeder22/FakeJSONServer3';

class LoginScreen extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    username: '',
    password: '',
    };
  }
  static navigationOptions = {
    title: 'Login',
  };
  _onLogin = () => {
    if (this.state.username == '' || this.state.password == '') {
      Alert.alert('Enter both a username and password');
    }
    else {

      var request = new XMLHttpRequest();
      request.onreadystatechange = e => {
        if (request.readyState !== 4) {
          // if (request.readyState == 1) {
          //   Alert.alert("1");
          // }
          // if (request.readyState == 2) {
          //   Alert.alert("2");
          // }
          // if (request.readyState == 3) {
          //   Alert.alert("3");
          // }
          return;
        }
        if (request.status === 200) {
          Alert.alert("Welcome!");
        }
        else {
          Alert.alert("error", request.response);
          this.props.navigation.dispatch(resetAction); // ??
        }
      };
      request.open("GET", "http://se329server-pi.local:8080/login?email=emily&password=emily", true);
      request.send();

      //

      var request2 = new XMLHttpRequest();
      request2.onreadystatechange = e => {
        if (request2.readyState !== 4) {
          return;
        }
        if (request2.status === 200) {
          Alert.alert("Number of Residents Inside:", request2.response);
        }
        else {
          Alert.alert("error", request2.response);
        }
      };
      request2.open("GET", "http://se329server-pi.local:8080/num_inside_users?user_id=1", true);
      request2.send();



      // get info from server
      //global.userID = 1; // get from server
      //global.lockID = 1; // get from server
      //global.lockLog = [{uid: 2, time: '1:00 PM'},{uid: 4, time: '11:15 AM'},{uid: 2, time: '9:30 AM'},{uid: 3, time: '7:00 AM'}]; // get from server
      //global.numInside = 2; // get from server
      this.props.navigation.navigate('Home');
    }
  }
  _username = (text) => {
    this.setState({text});
    this.setState({ username: {text} });
  }
  _password = (text) => {
    this.setState({text});
    this.setState({ password: {text} });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
        style={{height: 50}}
        placeholder='Username'
        onChangeText={(text) => this._username() }
        />
        <TextInput
        style={{height: 50}}
        placeholder='Password'
        onChangeText={(text) => this._password() }
        secureTextEntry={true}
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
    relockMessage: '',
    timePassed: false,
    };
  }
  static navigationOptions = {
    title: 'Home',
  };
  _onLogout = () => {
    this.props.navigation.dispatch(resetAction);
  }
  _onButtonPress = () => {
    if (this.state.currentState == 'Locked') { // unlocking the door
      var response = '';
      var request = new XMLHttpRequest();
      request.onreadystatechange = e => {
        if (request.readyState !== 4) {
          //Alert.alert("not 4")
          return;
        }
        if (request.status === 200) {
          //Alert.alert("success", request.response);
        }
        else {
          Alert.alert("error", request.response);
        }
      };
      request.open("GET", "http://se329server-pi.local:8080/open_lock?user_id=1&lock_id=1", true);
      request.send();

      this.setState({ buttonTitle: 'Lock'});
      this.setState({ currentState: 'Unlocked' });
      //this.setState({ relockMessage: 'The door will automatically relock in 30 seconds.' });
      //setTimeout(() => this._relock(), 5000); // 5 seconds currently
    }
    else { // locking the door
      this.setState({ buttonTitle: 'Unlock'});
      this.setState({ currentState: 'Locked' });
      this.setState({ relockMessage: '' });

      var response = '';
      var request = new XMLHttpRequest();
      request.onreadystatechange = e => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          //Alert.alert("success", request.response);
        }
        else {
          Alert.alert("error", request.response);
        }
      };
      request.open("GET", "http://se329server-pi.local:8080/close_lock?user_id=1&lock_id=1", true);
      request.send();

    }
  }
  _relock = () => {
    if (this.state.currentState == 'Unlocked') {
      this._onButtonPress();
    }
  }

  // <Button color='#32CD32' title='View Logs' onPress={() => navigate('Log')} />
  // <Text> {this.state.relockMessage} {'\n'}</Text>
  // <Text> There are currently {global.numInside} residents inside. {'\n'} {'\n'} </Text>
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text> Lock is: {this.state.currentState}. {'\n'} </Text>
        <Text> Press to {this.state.buttonTitle}. {'\n'}{'\n'} </Text>
        <Button color='#32CD32' title={this.state.buttonTitle} onPress={() => this._onButtonPress()}/>
        <Text> {'\n'} </Text>
        <Button color='#D3D3D3' title='Logout' onPress={() => this._onLogout()} />
      </View>
    );
  }
}

const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });

class LogScreen extends React.Component {
  constructor(props) {
  super(props);
  }
  static navigationOptions = {
    title: 'Log',
  };
  _onLogout = () => {
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text> Logs for lock #{global.lockID}: {'\n'}{'\n'}</Text>
        {this.listLockLogs()}
        <Button color='#D3D3D3' title='Logout' onPress={() => this._onLogout()}/>
      </View>
    );
  }
  listLockLogs() {
    return global.lockLog.map((data) => {
      return (
        <View key={Math.random()}><Text> User #{data.uid} at {data.time} {'\n'} </Text></View>
      )
    })
  }
}

const App = StackNavigator ({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Log: { screen: LogScreen },
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
