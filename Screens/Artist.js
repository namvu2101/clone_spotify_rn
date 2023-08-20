import {StyleSheet, Text, View, Pressable, FlatList, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import UISearch from '../Components/UISearch';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Artist({route, navigation}) {
  console.log(route.params.data);
  const data = route.params.data;
  const renderItem = ({item}) => {
    return (
      <Pressable
        style={{
          alignItems: 'center',
          width: 100,
          justifyContent: 'center',
          marginBottom: 5,
        }}
        onPress={() => {
          console.log('aaa');
        }}>
        <Image
          source={{
            uri:
              item?.images[0]?.url ||
              'https://th.bing.com/th/id/OIP.8eENQN0bpgUWPkHOm3W_XwAAAA?pid=ImgDet&rs=1',
          }}
          style={{
            height: 80,
            width: 80,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: 'white',
          }}>
          {item.name}
        </Text>
      </Pressable>
    );
  };
  return (
    <LinearGradient colors={['#1B1A1C', '#000']} style={styles.container}>
      <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons name="less-than" color={'#fff'} size={35} />
        </Pressable>
      <UISearch />
      <View style={{marginHorizontal: 15, alignItems: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={data}
          renderItem={renderItem}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    height: 55,
    textAlignVertical: 'bottom',
  },
});
