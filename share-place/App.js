import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import UsersMap from './components/UsersMap';
import FetchLocation from './components/FetchLocation';

export default class App extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: []
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 2.9922,
          longitudeDelta: 2.9421,
        }
      });
      fetch('https://share-place-2471a.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    },
    err => console.log(err));
  }

  getUserPlacesHandler = () => {
    fetch('https://share-place-2471a.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray =[];
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });
        }
        this.setState({
          usersPlaces: placesArray
        });
      })
      .catch(err => console.log(err));
};

render() {
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
      <Button title="Get User Places" onPress=
      {this.getUserPlacesHandler} />
      </View>
      <FetchLocation onGetLocation={this.getUserLocationHandler} />
      <UsersMap
      userLocation={this.state.userLocation}
      usersPlaces={this.state.usersPlaces}/>
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
