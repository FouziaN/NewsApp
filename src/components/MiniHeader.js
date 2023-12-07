import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {normalize} from '../constants/Dimension';

const MiniHeader = ({label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

export default MiniHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: normalize(16),
  },
  labelText: {
    fontSize: normalize(20),
    fontWeight: '500',
  },
  viewAllBtn: {
    backgroundColor: 'grey',
    padding: normalize(5),
    borderRadius: normalize(20),
  },
});
