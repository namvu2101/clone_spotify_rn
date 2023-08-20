import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import List_Item from '../Components/List_Item';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import RecentlySongs from '../Components/Recently_Songs';

export default function Home() {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = React.useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [top_artist, setTop_artist] = useState([]);
  const [recentlySongs, setRecentlySongs] = useState([]);

  async function getSavedTracks() {
    try {
      const accessToken = await AsyncStorage.getItem('token');
      const queryParams = new URLSearchParams({limit: 50});
      const response = await fetch(
        `https://api.spotify.com/v1/me/tracks?offset=0&${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch the tracks');
      }

      const data = await response.json();
      setSavedTracks(data.items);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getArtist();
    getProfile();
    getSavedTracks();
    getRecentlySongs();
  }, []);
  const getProfile = async () => {
    const asscessToken = await AsyncStorage.getItem('token');
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${asscessToken}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getArtist = async () => {
    const asscessToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        'https://api.spotify.com/v1/search?q=hot+2023+country+in+Vietnam&type=artist&market=VN&limit=50',
        {
          headers: {
            Authorization: `Bearer ${asscessToken}`,
          },
        },
      );
      const data = response.data.artists.items;
      setTop_artist(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRecentlySongs = async () => {
    const asscessToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios(
        'https://api.spotify.com/v1/me/player/recently-played?limit=50',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${asscessToken}`,
          },
        },
      );
      const tracks = response.data.items;
      const uniqueTracks = tracks.filter(
        (track, index, self) =>
          index ===
          self.findIndex(
            t => JSON.stringify(t.track) === JSON.stringify(track.track),
          ),
      );
      setRecentlySongs(uniqueTracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTopItem = async () => {
      try {
        const asscessToken = await AsyncStorage.getItem('token');
        if (!asscessToken) {
          console.log('Asscess Token not found');
          return;
        }
        const type = 'artists';

        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/${type}`,
          {
            headers: {
              Authorization: `Bearer ${asscessToken}`,
            },
          },
        );
        // setTop_artist(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getTopItem();
  }, []);
  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return 'Chào buổi sáng';
    } else if (currentTime < 16) {
      return 'Chào buổi chiều';
    } else {
      return 'Chào buổi tối';
    }
  };
  const message = greetingMessage();

  return (
    <LinearGradient colors={['#1B1A1C', '#000']} style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.icon_header}>
            <MaterialCommunityIcons
              name="bell-outline"
              color={'#fff'}
              size={30}
            />
            <Pressable
              onPress={() => {
                navigation.navigate('ListSong', {
                  data: recentlySongs,
                  title: 'Mới phát gần đây',
                });
              }}>
              <MaterialCommunityIcons
                name="progress-clock"
                color={'#fff'}
                size={30}
              />
            </Pressable>

            <MaterialCommunityIcons
              name="cog-outline"
              color={'#fff'}
              size={30}
            />
          </View>
        </View>
        <View style={styles.btn_top}>
          <Button
            mode="outlined"
            textColor="#fff"
            onPress={() => {
              navigation.navigate('ListSong', {
                data: savedTracks,
                title: 'Thư viện Ưa Thích',
              });
            }}>
            Ưu thích
          </Button>
          <Button
            mode="outlined"
            textColor="#fff"
            onPress={() => {
              navigation.navigate('Artists', {
                data: top_artist,
                title: 'Top 50 ',
              });
            }}>
            Top Nghệ Sĩ
          </Button>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          {recentlySongs.slice(0, 2).map((item, index) => (
            <Pressable style={styles._press} key={index}>
              <Image
                source={{uri: item.track.album.images[0].url}}
                resizeMode="cover"
                style={styles._box_icon}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.text_item} numberOfLines={1}>
                  {item.track.name}
                </Text>
                <Text numberOfLines={1}>{item.track.artists[0].name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Text style={[styles.message, {marginTop: 20}]}>Nghệ sĩ gợi ý</Text>
        <List_Item data={top_artist} />
        <Text style={[styles.message, {marginTop: 20}]}>Mới phát gần đây</Text>
        <RecentlySongs data={recentlySongs} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1A1C',
  },
  message: {
    color: '#fff',
    fontSize: 23,
    marginRight: 50,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    height: 66,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  icon_header: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  btn_top: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginLeft: 15,
  },
  box_items: {flexDirection: 'row', justifyContent: 'space-between'},
  item: {flex: 1, paddingHorizontal: 10},
  _press: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#47464B',
    marginTop: 10,
    flex: 1,
    marginHorizontal: 7,
  },
  _box_icon: {
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_item: {
    fontWeight: 'bold',
    color: '#fff',
  },
  top_artist: {
    marginLeft: 10,
  },
});
