import {
  View,
  Text,
  Image,
  StatusBar,
  Touchable,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
  Event,
} from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper';
import ModalSong from '../Components/ModalSongs';
import ListSong_Item from '../Components/ListSong_Item';
const ListSong = ({route, navigation}) => {
  const [currentTrack, setCurrentTrack] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isVisible, setIsVisible] = useState(false);

  const existingSongs = [];
  const songsList = [];
  route.params.data.forEach((item, index) => {
    const track = item?.track || item
    const previewUrl = track.preview_url;
    const name = track.name;
    const artists = track.artists.map(artist => artist.name).join(', ');

    if (previewUrl !== null && !existingSongs.includes(name + artists)) {
      existingSongs.push(name + artists);
      songsList.push({
        id: index + 1,
        title: name,
        artwork: track.album?.images[0]?.url,
        artist: artists,
        url: track.preview_url,
      });
    }
  });

  useEffect(() => {
    async function initializeTrackPlayer() {
      await TrackPlayer.reset();
      await TrackPlayer.add(songsList);
    }
    initializeTrackPlayer();
  }, [route.params]);

  useEffect(() => {
    // Kiểm tra khi nào progress gần đến hết bài hát và chuyển sang bài hát tiếp theo
    if (
      playbackState === State.Playing &&
      progress.position >= progress.duration - 1 // Khoảng 1 giây trước khi hết bài
    ) {
      // Kiểm tra nếu bài hiện tại là bài cuối cùng trong danh sách
      if (currentIndex < songsList.length - 1) {
        setCurrentIndex(currentIndex + 1);
        // Đổi bài hát và phát
        TrackPlayer.skipToNext();
        TrackPlayer.play();
      }
    }
  }, [progress.position]);


  return (
    <LinearGradient 
      colors={['#a34c0d', '#592804', '#241001', '#000000']}
      style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons name="less-than" color={'#fff'} size={35} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            flex: 1,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {route.params.title}
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '85%',
            height: 37,
            backgroundColor: '#b06a41',
            borderRadius: 5,
            flexDirection: 'row',
            paddingLeft: 15,
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name="magnify" color={'#fff'} size={35} />
          <Text style={{color: 'white', marginLeft: 10}}>TÌm kiếm</Text>
        </View>
        <View
          style={{
            width: '15%',
            height: 37,
            backgroundColor: '#b06a41',
            borderRadius: 5,

            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5,
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Lọc</Text>
        </View>
      </View>
      <Image
        source={{uri: songsList[currentIndex].artwork}}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 5,
        }}
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 30,
          color: 'white',
          fontWeight: '600',
          marginLeft: 20,
          marginTop: 20,
        }}>
        {songsList[currentIndex].title}
      </Text>
      <View style={{flexDirection: 'row', marginHorizontal: 10}}>
        <Text style={{color: 'white', fontSize: 14, marginLeft: 10}}>
          Bài hát {songsList.length}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 15,
        }}>
        <Avatar.Icon
          icon="arrow-down"
          color="#fff"
          size={30}
          style={{backgroundColor: 'red'}}
        />
        <Pressable
          onPress={async () => {
            setCurrentIndex(0);
            await TrackPlayer.play(0);
          }}>
          <Avatar.Icon
            icon="play"
            color="#fff"
            size={50}
            style={{backgroundColor: 'red'}}
          />
        </Pressable>
      </View>

      <FlatList
        data={songsList}
        renderItem={({item, index}) => (
          <ListSong_Item
            item={item}
            index={index}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
          />
        )}
      />
      {currentTrack && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              setIsVisible(true);
            }}
            style={{
              backgroundColor: '#1B1A1C',
              width: '90%',
              height: 60,
              marginBottom: 5,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                source={{uri: songsList[currentIndex].artwork}}
                style={{
                  height: 44,
                  width: 44,
                  borderRadius: 10,
                  marginHorizontal: 5,
                }}
                resizeMode="cover"
              />
              <View style={{flex: 1}}>
                <Text numberOfLines={1}>{songsList[currentIndex].title}</Text>
                <Text>{songsList[currentIndex].artist}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '30%',
              }}>
              <Pressable>
                <MaterialCommunityIcons name={'heart'} size={30} />
              </Pressable>
              <Pressable
                onPress={async () => {
                  if (State.Playing == playbackState) {
                    await TrackPlayer.pause();
                  } else {
                    await TrackPlayer.skip(currentIndex);
                    await TrackPlayer.play();
                  }
                }}>
                <MaterialCommunityIcons
                  name={State.Playing == playbackState ? 'pause' : 'play'}
                  size={32}
                />
              </Pressable>
            </View>
          </Pressable>
        </View>
      )}

      <ModalSong
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        songsList={songsList}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        playbackState={playbackState}
        progress={progress}
        onChange={x => {
          setCurrentIndex(x);
        }}
        onClose={() => {
          setIsVisible(false);
        }}
      />
    </LinearGradient>

  );
};

export default ListSong;

//'#a34c0d', '#592804', '#241001', '#000000'
