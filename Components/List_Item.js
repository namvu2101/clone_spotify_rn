import {StyleSheet, Text, View, Image, FlatList, Pressable} from 'react-native';
import React,{useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

export default function List_Item({data, onPress}) {
  const navigation = useNavigation()
  const filter = data.slice(0, 10).map(i => i);
  const getTopArtistTrack = async id => {
    const asscessToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=VN`,
        {
          headers: {
            Authorization: `Bearer ${asscessToken}`,
          },
        },
      );
      const data = await response.data.tracks
      navigation.navigate('ListSong',{data:data,title:'Thư viện nhạc'})
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          getTopArtistTrack(item.id)
          
        }}>
        <Image
          source={{uri: item.images[0].url}}
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
          {item.name}
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
