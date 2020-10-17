import React, {useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';

import mapMarker from '../assets/images/map-marker.png';

import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap = () => {
  const {navigate} = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('/orphanages').then((response) => {
      setOrphanages(response.data);
    });
  });

  function handleNavigateToOrphanageDetails(id: number) {
    navigate('OrphanageDetails', {id});
  }

  function handleNavigateToCreateOrphanage() {
    navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -27.5919405,
          longitude: -48.5602925,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}>
        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}>
              <Callout
                tooltip
                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanato(s) encontrado(s)
        </Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089A5',
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    elevation: 3,
  },

  footerText: {
    color: '#8FA7B3',
    fontFamily: 'Nunito-Bold',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrphanagesMap;
