import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { black } from 'ansi-colors';

const usersMap = props => {
  let userLocationMarker = null;

  if (props.userLocation){
    userLocationMarker = <MapView.Marker coordinate={props.userLocation}/>;
  }
  const usersMarkers = props.usersPlaces.map(userPlace => (
  <MapView.Marker coordinate={userPlace} key={userPlace.id} />
  ));
  return(
    <View style={styles.mapContainer}>
      <MapView
       initialRegion={{
        latitude: 40.0583,
        longitude: -74.4057,
        latitudeDelta: 2.9922,
        longitudeDelta: 2.9421,
        }}
        region={props.userLocation}
        style={styles.map}>
          {userLocationMarker}
          {usersMarkers}
          </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer:{
    width: '100%',
    height: 350,
    marginTop: 20,
    borderWidth: 2,
    borderColor:'black'
  },
  map: {
    width: '100%',
    height: '100%'
  },
})

export default usersMap;
