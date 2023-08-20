import {StyleSheet, Text, View, Image, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
  Event,
} from 'react-native-track-player';
export default function RecentlySongs({data}) {
  const filter = data.slice(0, 10).map(i => i);

  const setup = async (item) => {
    const songsList = []
    songsList.push({
    title: item.name,
    artwork: item.album?.images[0]?.url,
    artist: item.album?.artists[0]?.name,
    url: item.preview_url,
  });
  await TrackPlayer.reset()
  await TrackPlayer.add(songsList)
  await TrackPlayer.play()
  };
  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          setup(item.track)
        }}>
        <Image
          source={{uri: item.track?.album?.images[0]?.url}}
          style={{
            height: 130,
            width: 130,
            borderRadius: 10,
            marginRight: 7,
          }}
          resizeMode="cover"
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: 'white',
            marginTop: 10,
            width: 130,
            paddingHorizontal: 10,
          }}>
          {item.track.name}
        </Text>
      </Pressable>
    );
  };
  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={filter}
        renderItem={renderItem}
        key={index => index.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({});
