import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize } from 'react-native-app-auth';
import { useNavigation } from "@react-navigation/native";
const authConfig = {
  clientId: '1febe6e650864f359b3a5483c27d503a',
  // optional clien secret
  // clientSecret: 'client secret',
  redirectUrl: 'myspotify://oauth/',
  scopes: ["user-read-email",
  "user-library-read",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public"],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};
const LoginScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkTokenValidily = async () => {
      const accessToken = await AsyncStorage.getItem('token');
      const expirationDate = await AsyncStorage.getItem('expirationDate');
      if (accessToken && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parseInt(expirationDate)) {
          navigation.replace('Tabs');
        } else {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('expirationDate');
        }
      }
    };
    checkTokenValidily();
  }, []);
  const handleLogin = async () => {
    const result = await authorize(authConfig);
    console.log(result);
    if(result.accessToken){
      const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
      AsyncStorage.setItem("token",result.accessToken);
      AsyncStorage.setItem("expirationDate",expirationDate.toString());
      navigation.navigate("Tabs")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground
          source={require('../assets/IMG_1.png')}
          resizeMode="stretch"
          style={styles.imagebackground}
        />
      </View>

      <View style={styles.bottom}>
        <View style={{height: 84, width: 246, justifyContent: 'center'}}>
          <Text style={styles.textContainer}>
            Millions of Songs. Free on Spotify.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnSignup}
          onPress={() => handleLogin()}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
           Tiếp tục với Spotify
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSocial} onPress={() => handleLogin()}>
          <Image
            source={require('../assets/Logo/Gg.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <Text style={styles.txtSocial}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSocial} onPress={() => handleLogin()}>
          <Image
            source={require('../assets/Logo/facebook.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <Text style={styles.txtSocial}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSocial} onPress={() => handleLogin()}>
          <Image
            source={require('../assets/Logo/apple.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <Text style={styles.txtSocial}>Tiếp tục với Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogin()}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              marginVertical: 10,
              fontSize: 16,
            }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
  },
  imagebackground: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
  },
  btnSignup: {
    backgroundColor: '#1ED760',
    width: 337,
    height: 49,
    borderRadius: 45,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSocial: {
    width: 337,
    height: 49,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 45,
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  logo: {width: 18, height: 18},
  txtSocial: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});
