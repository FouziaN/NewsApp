import {Dimensions, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import BreakingNewsCard from './BreakingNewsCard';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

const BreakingNews = ({data, label}) => {
  const navigation = useNavigation();

  const handleClick = item => {
    navigation.navigate('NewsDetails', item);
  };

  if (!data || data.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <View>
      <Carousel
        data={data}
        firstItem={1}
        inactiveSlideScale={0.86}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={styles.slideStyle}
        renderItem={({item}) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
      />
    </View>
  );
};

BreakingNews.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string,
};

export default BreakingNews;

const styles = StyleSheet.create({
  slideStyle: {
    display: 'flex',
    alignItems: 'center',
  },
});
