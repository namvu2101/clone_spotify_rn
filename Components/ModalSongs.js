import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, {State} from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from 'react-native-paper';
function ModalSong({
  songsList,
  currentIndex,
  progress,
  playbackState,
  isVisible,
  onClose,
  onChange,
  setCurrentIndex,
}) {
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  return (
    <Modal
      isVisible={isVisible}
      style={{margin: 0}}
      onBackButtonPress={() => onClose()}>
      <LinearGradient
        colors={['#067a02', '#064f03', '#032901', '#000000']}
        style={{flex: 1}}>
        <TouchableOpacity
          style={{marginTop: 20, marginLeft: 20}}
          onPress={() => {
            onClose();
          }}>
          <MaterialCommunityIcons
            name="chevron-down"
            color={'#fff'}
            size={35}
          />
        </TouchableOpacity>

        <Image
          source={{uri: songsList[currentIndex].artwork}}
          style={{
            width: '80%',
            height: '35%',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontWeight: '600',
            marginLeft: 20,
            marginTop: 20,
          }}>
          {songsList[currentIndex].title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: '600',
            marginLeft: 20,
          }}>
          {songsList[currentIndex].artist}
        </Text>
        <Slider
          style={{width: '90%', height: 40, alignSelf: 'center'}}
          minimumValue={progress.position}
          maximumValue={progress.duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#fff"
        />
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white'}}>{format(progress.position)}</Text>
          <Text style={{color: 'white'}}>{format(progress.duration)}</Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={async () => {
              if (currentIndex > 0) {
                await TrackPlayer.skip(currentIndex - 1);
                await TrackPlayer.play();
                setCurrentIndex(currentIndex - 1);
                onChange(currentIndex - 1);
              }
            }}>
            {currentIndex > 0 ? (
              <MaterialCommunityIcons name="skip-previous" size={40} />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={async () => {
              if (State.Playing == playbackState) {
                await TrackPlayer.pause();
              } else {
                await TrackPlayer.skip(currentIndex);
                await TrackPlayer.play();
              }
            }}>
            <Avatar.Icon
              icon={State.Playing == playbackState ? 'pause' : 'play'}
              color="#000"
              size={55}
              style={{backgroundColor: '#fff'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await TrackPlayer.skip(currentIndex + 1);
              await TrackPlayer.play();
              setCurrentIndex(currentIndex + 1);
              onChange(currentIndex + 1);
            }}>
            <MaterialCommunityIcons name="skip-next" size={40} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Modal>
  );
}

export default ModalSong;
