import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {normalize} from '../constants/Dimension';
import {Images} from '../assets/Images/Images';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nameLogoContainer}>
        <Image source={Images.newLogo} />
        <Text style={styles.newsText}>News 24</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: normalize(16),
  },
  nameLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginLeft: normalize(5),
  },
});
