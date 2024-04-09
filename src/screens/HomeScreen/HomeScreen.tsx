import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import useHomeStyle from './HomeScreenStyle';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {style: homeStyles} = useHomeStyle();

  console.log(homeStyles);

  return (
    <SafeAreaView
      edges={['right', 'bottom', 'left', 'top']}
      style={styles.container}>
      <Text style={[homeStyles.title, styles.title]}>Welcome to My App!</Text>
      <Image
        source={require('../../../assets/logo.png')}
        style={[homeStyles.logo]}
      />
      <TouchableOpacity style={[homeStyles.button, styles.button]}>
        <Text style={[homeStyles.buttonText, styles.buttonText]}>
          Get Started
        </Text>
      </TouchableOpacity>
      <View style={[homeStyles.infoContainer, styles.infoContainer]}>
        <Text style={[homeStyles.infoText, styles.infoText]}>
          Learn More About Us
        </Text>
        <Text style={[homeStyles.infoText, styles.infoText]}>Contact Us</Text>
      </View>
      <View style={[homeStyles.footer, styles.footer]}>
        <Text style={[homeStyles.footerText, styles.footerText]}>
          Footer Content
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    color: '#333333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  footerText: {
    color: '#333333',
  },
});

export default HomeScreen;
