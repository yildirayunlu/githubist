import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Avatar = ({ small, source }) => {
  const defaultStyle = [styles.default];

  if (small) {
    defaultStyle.push([styles.small]);
  }

  return <Image style={[defaultStyle]} source={source} />;
};

const styles = StyleSheet.create({
  default: {
    borderRadius: 150 / 2,
    width: 150,
    height: 150,
  },
  small: {
    borderRadius: 75 / 2,
    width: 75,
    height: 75,
  },
});

export default Avatar;
