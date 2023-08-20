import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TrackPlayer,{usePlaybackState, State} from 'react-native-track-player';

export default function ListSong_Item({
  item,
  index,
  setCurrentIndex,
  currentIndex,
}) {

  return (
    <Pressable
      key={index}
      onPress={async () => {
        await TrackPlayer.skip(index);
        setCurrentIndex(index);
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10,
      }}>
      <Image
        style={{width: 50, height: 50, marginRight: 10}}
        source={{uri: item.artwork}}
      />

      <View style={{flex: 1}}>
        <Text
          numberOfLines={1}
          style={
            index == currentIndex 
              ? {
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#3FFF00',
                }
              : {fontWeight: 'bold', fontSize: 14, color: 'white'}
          }>
          {item.title}
        </Text>
        <Text style={{marginTop: 4, color: '#989898'}}>{item.artist}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7,
          marginHorizontal: 10,
        }}>
        <Pressable>
          <MaterialCommunityIcons
            name="cards-heart"
            size={23}
            color={'#1db954'}
          />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color={'#c0c0c0'}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
