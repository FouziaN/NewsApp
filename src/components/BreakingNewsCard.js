import {
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  View,
  Dimensions,
  Text,
} from 'react-native';
import React from 'react';
import {normalize} from '../constants/Dimension';

const {width, height} = Dimensions.get('window');

const BreakingNewsCard = ({item, handleClick}) => {
  return (
    <TouchableNativeFeedback onPress={() => handleClick(item)}>
      <View style={styles.container}>
        <Image
          source={{
            uri: item.urlToImage,
          }}
          style={{
            width: width * 0.8,
            height: height * 0.22,
            borderRadius: normalize(20),
          }}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {item.title.length > 60
                ? item.title.slice(0, 58) + '...'
                : item.title.split('-')[0] || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    padding: normalize(10),
    borderBottomRightRadius: normalize(20),
    borderBottomLeftRadius: normalize(20),
  },
  title: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
});

export default BreakingNewsCard;
