import {StyleSheet, Text, View} from 'react-native';
import React ,{useEffect} from 'react';
import IndexScreen from './Screens/IndexScreen';
import { setupTrackPlayer } from './TrackPlayerSetup';

export default function App() {
  useEffect(() => {
   setupTrackPlayer()
  }, [])
  
  return (
    <>
      <IndexScreen />
    </>
  );
}
