import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';

const GamePlay: React.FC = () => {
  const [ballPosition, setBallPosition] = useState<number>(
    Math.floor(Math.random() * 3),
  );
  const [selectedCup, setSelectedCup] = useState<number | null>(null);

  const handleCupSelect = (cupIndex: number) => {
    setSelectedCup(cupIndex);

    if (cupIndex === ballPosition) {
      Alert.alert('Congratulations!', 'You found the ball!');
    } else {
      Alert.alert('Try Again!', 'The ball is under cup ' + ballPosition);
    }
  };

  const restartGame = () => {
    setBallPosition(Math.floor(Math.random() * 3));
    setSelectedCup(null);
  };

  useEffect(() => {
    restartGame();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../assets/background.png')}
      />
      <View style={styles.cupsContainer}>
        {[1, 2, 3].map(cupIndex => (
          <TouchableOpacity
            key={cupIndex}
            style={styles.cup}
            onPress={() => handleCupSelect(cupIndex)}>
            <Image
              source={require('../assets/plastic-cup.png')}
              style={styles.cupImage}
            />
            {selectedCup === cupIndex && (
              <Image
                source={require('../assets/ball.png')}
                style={styles.ball}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  cupsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
  },
  cup: {
    alignItems: 'center',
    marginTop: 70,
  },
  cupImage: {
    width: 100,
    height: 100,
  },
  ball: {
    position: 'absolute',
    width: 30,
    height: 30,
    bottom: 0,
    left: 35,
  },
  restartButton: {
    marginTop: 20,
  },
  restartImage: {
    width: 150,
    height: 50,
  },
});

export default GamePlay;
