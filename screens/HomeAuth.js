import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import Button from '../components/common/Button';

class HomeAuth extends Component {
  state = {
    facebookLoginFail: false,
    facebookLoginSuccess: false,
    fbToken: null
  };

  onButtonPress() {
    this.facebookLogin();
  }

  onAuthComplete = props => {
    //after user successfully logs in navigate to notifications page
    if (this.state.fbToken) {
      this.props.navigation.navigate('notifications')
    }
  }

  facebookLogin = async () => {
    let token = await AsyncStorage.getItem('fb_token');
    this.doFacebookLogin();
  };

  doFacebookLogin = async () => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('1650628351692070', {
      permissions: ['public_profile']
    });

    if (type === 'cancel') {
      this.setState({ facebookLoginFail: true });
    }

    await AsyncStorage.setItem('fb_token', token);
    this.setState({ facebookLoginSuccess: true });
    this.setState({ fbToken: token });
    this.onAuthComplete(this.props);
  };

  render() {
    return (
      <View>
        <Text>Auth Screen!</Text>
        <Text>Auth Screen!</Text>
        <Button onPress={this.onButtonPress.bind(this)}>Login
        </Button>
      </View>
    );
  }
}

export default HomeAuth;
