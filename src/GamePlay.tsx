import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

const GamePlay: React.FC = () => {
  const [ballPosition, setBallPosition] = useState<number>(
    Math.floor(Math.random() * 3) + 1,
  );
  const [selectedCup, setSelectedCup] = useState<number | null>(null);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const handleCupSelect = (cupIndex: number) => {
    setSelectedCup(cupIndex);

    if (cupIndex === ballPosition) {
      setGameResult('win');
    } else {
      setGameResult('lose');
    }
  };

  const restartGame = () => {
    setBallPosition(Math.floor(Math.random() * 3) + 1);
    setSelectedCup(null);
    setGameResult(null);
    startAnimation();
  };

  const startAnimation = () => {
    const cups = [0, 1, 2];
    const animationSequence = cups.map((_, index) => {
      return Animated.timing(animation, {
        toValue: index + 1,
        duration: 500,
        useNativeDriver: false,
      });
    });
    Animated.sequence(animationSequence).start();
  };

  useEffect(() => {
    restartGame();
    startAnimation();
  }, []);

  const cupStyle = (index: number) => {
    let outputRangeY;
    let outputRangeX;

    if (index === 1) {
      outputRangeY = [0, 0, 0, 0];
      outputRangeX = [0, 150, 250, 0];
    } else if (index === 2) {
      outputRangeY = [0, 0, 0, 0];
      outputRangeX = [0, -125, 125, 0];
    } else if (index === 3) {
      outputRangeY = [0, 0, 0, 0];
      outputRangeX = [0, -250, -150, 0];
    }

    return {
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: outputRangeY as any,
          }),
        },
        {
          translateX: animation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: outputRangeX as any,
          }),
        },
      ],
    };
  };
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
            <Animated.Image
              source={require('../assets/plastic-cup.png')}
              style={[
                styles.cupImage,
                cupStyle(cupIndex),
                {marginBottom: gameResult ? 50 : 0},
              ]}
            />
            {ballPosition === cupIndex && gameResult && (
              <Image
                source={require('../assets/ball.png')}
                style={styles.ball}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      {gameResult === 'win' && (
        <View style={styles.restart}>
          <Image
            source={require('../assets/you-win.png')}
            style={styles.resultImage}
          />
          <TouchableOpacity onPress={restartGame}>
            <Image
              source={require('../assets/tap-to-restart.png')}
              style={styles.restartImage}
            />
          </TouchableOpacity>
        </View>
      )}
      {gameResult === 'lose' && (
        <View style={styles.restart}>
          <Image
            source={require('../assets/you-lose.png')}
            style={styles.resultImage}
          />
          <TouchableOpacity onPress={restartGame}>
            <Image
              source={require('../assets/tap-to-restart.png')}
              style={styles.restartImage}
            />
          </TouchableOpacity>
        </View>
      )}
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
  restart: {
    position: 'absolute',
  },
  resultImage: {resizeMode: 'contain', marginBottom: 200},
  restartImage: {
    resizeMode: 'contain',
  },
});

export default GamePlay;
