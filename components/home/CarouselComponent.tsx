import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const CarouselComponent = () => {
  const slides = [
    "https://imgs.search.brave.com/FSty3BUDJTWRbNJbe5Zh082mmLoYFTZ6vyzGrrOchys/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzEwLzExLzc0/LzM2MF9GXzIxMDEx/NzQ1OV9EZ2tNODVr/VW9ZRUl3bk5jMUNl/Nm01a2JTalhyNWtS/OC5qcGc",
    "https://imgs.search.brave.com/B5vcZYxntpd-AT27pFXE6M1KDGJc9tCeBk8XASXJupU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMz/NjY2NTM1Ny9waG90/by9mdXJuaXR1cmUt/Zm9yLXNhbGUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXhY/bFptNWNXbjc5aHFi/T3RHWVdJbW96UXV5/R2JSN1Fjak83V1Ru/NU44M3c9",
    "https://imgs.search.brave.com/dWOouPT-pQ3w8_1gPo67RLYUkjLh4UutQKyCm8u8t3A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnVybml0dXJlc3Rv/cmVsb3NhbmdlbGVz/LmNvbS9tZWRpYS93/eXNpd3lnL2JlZHJv/b20tYmFuZXIuanBn"
  ];

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay={true}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        mode='horizontal-stack'
        modeConfig={{
          moveSize: 200,
          stackInterval: 30,
          scaleInterval: 0.9,
          rotateZDeg: 135,
          snapDirection: 'left',
      }}
        data={slides}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item }}
              style={styles.image}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 15,
  },
  imageWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '95%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});

export default CarouselComponent;
