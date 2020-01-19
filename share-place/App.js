import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UsersMap from './components/UsersMap';
import FetchLocation from './components/FetchLocation';

export default class App extends React.Component {
  state = {
    userLocation: null
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      });

    }, err => console.log(err));
  }
render(){
  return (
    <View style={styles.container}>
      <FetchLocation onGetLocation={this.getUserLocationHandler} />
      <UsersMap userLocation={this.state.userLocation}/>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
