import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {useState} from 'react';

function UISearch() {
  const [searchInput, setSearchInput] = useState('');
  return (
    <TextInput
      placeholder="Search"
      textColor="black"
      style={styles.container}
      value={searchInput}
      onChangeText={setSearchInput}
      mode="outlined"
      left={
        <TextInput.Icon
          icon="magnify"
          iconColor="black"
          onPress={() => console.log('aaaa')}
        />
      }
    />
  );
}

export default UISearch;

const styles = StyleSheet.create({
  container: {
    height: 42,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginVertical:15,
    marginHorizontal:15
  },
});
