import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Alert, Image, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from './constant';

const Home: React.FC = () => {
  type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate('GamePlay');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../assets/home-background.png')}
      />
      <View style={styles.overlay}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <TouchableOpacity style={styles.play} onPress={handlePress}>
          <Image
            style={styles.logo}
            source={require('../assets/tap-to-play.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  logo: {
    resizeMode: 'contain',
  },
  play: {
    marginTop: 20,
  },
});

export default Home;
