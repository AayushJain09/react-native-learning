/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
  Button,
} from 'react-native';
import {
  useCameraPermission,
  useMicrophonePermission,
  useCameraDevice,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useFocusEffect} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

const CameraScreen = ({navigation}) => {
  // State to manage the current camera device
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  // camera device hook
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
  //code scanner hook
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log(codes[0]);
    },
  });
  //camera permission hook
  const {hasPermission, requestPermission} = useCameraPermission();
  //microphone permission hook
  const {
    hasPermission: microphonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();
  //state hooks
  const [isActive, setIsActive] = useState(false); //camera active state
  const [flash, setFlash] = useState('off'); //flash state
  const [isRecording, setIsRecording] = useState(false); //recording state

  const [photo, setPhoto] = useState(null); //photo state
  const [video, setVideo] = useState(null); //video state
  //camera ref
  const camera = useRef(null);
  //camera mode state
  const [mode, setMode] = useState('camera');

  useFocusEffect(
    useCallback(() => {
      setIsActive(true); //set camera active
      return () => {
        setIsActive(false); //set camera inactive
      };
    }, []),
  );

  useEffect(() => {
    //check for camera and microphone permissions
    if (!hasPermission) {
      requestPermission();
    }
    if (!microphonePermission) {
      requestMicrophonePermission();
    }
  }, [hasPermission, microphonePermission]);

  //function for taking picture
  const onTakePicturePressed = async () => {
    //if recording, stop recording
    if (isRecording) {
      camera.current?.stopRecording();
      return;
    }
    //take photo of current camera state
    const photo = await camera.current?.takePhoto({
      flash,
    });
    console.log(photo.path); // Log the path for debugging
    setPhoto(photo);
  };

  //function for starting recording
  const onStartRecording = async () => {
    if (!camera.current) {
      //if camera not found, return
      return;
    }
    setIsRecording(true); //set recording state to true
    camera.current.startRecording({
      //start recording with current frame
      flash: flash === 'on' ? 'on' : 'off',
      onRecordingFinished: video => {
        //when recording finished, set video state and set recording state to false
        console.log(video);
        setIsRecording(false);
        setVideo(video);
      },
      //if error occurs while recording, log the error and set recording state to false
      onRecordingError: (error: any) => {
        console.error(error);
        setIsRecording(false);
      },
    });
  };

  //upload functions
  const uploadPhoto = async () => {
    if (!photo) {
      //if photo not found,
      return;
    }
    //fetch photo data
    const result = await fetch(`file://${photo.path}`);
    const data = await result.blob();
    console.log(data);
    // upload data to your network storage (ex: s3, supabase storage, etc)
  };
  //check for permissions
  if (!hasPermission || !microphonePermission) {
    return <ActivityIndicator />;
  }
  //if camera device not found, return
  if (!device) {
    return <Text>Camera device not found</Text>;
  }

  return (
    <View style={{flex: 1}}>
      {mode === 'qr' ? ( //if mode is qr, show qr code scanner
        <Camera
          device={device}
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          isActive={mode === 'qr' && isActive && !photo && !video}
        />
      ) : (
        //else show camera
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive && !photo && !video && mode === 'camera'}
          photo
          video
          audio
        />
      )}
      {/* //if video found, show video */}
      {video && (
        <>
          <Video
            source={{uri: video.path}} //video path
            style={StyleSheet.absoluteFill} //fill the screen
          />
          <FontAwesome5
            onPress={() => setVideo(null)}
            name="arrow-left"
            size={25}
            color="white"
            style={{position: 'absolute', top: 50, left: 30}}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.40)',
            }}>
            <Button title="Upload" onPress={uploadPhoto} />
          </View>
        </>
      )}
      {/* //if photo found, show photo */}
      {photo && (
        <>
          {/* //show photo */}
          <Image
            source={{uri: `file://${photo.path}`}} //photo path
            style={StyleSheet.absoluteFill} //fill the screen
          />
          <FontAwesome5
            onPress={() => setPhoto(null)}
            name="arrow-left"
            size={25}
            color="white"
            style={{position: 'absolute', top: 50, left: 30}}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.40)',
            }}>
            <Button title="Upload" onPress={uploadPhoto} />
          </View>
        </>
      )}

      {!photo && !video && (
        // /* if photo and video not found, show camera controls */}
        <>
          <FontAwesome5
            onPress={() => navigation.pop()}
            name="arrow-left"
            size={25}
            color="white"
            style={{position: 'absolute', top: 50, left: 30}}
          />
          {/*show flash and mode controls */}
          <View
            style={{
              position: 'absolute',
              right: 10,
              top: 50,
              padding: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.40)',
              gap: 30,
            }}>
            <Ionicons
              name="camera-reverse-sharp"
              onPress={() => setIsFrontCamera(!isFrontCamera)}
              size={30}
              color="white"
            />
            <Ionicons
              name={flash === 'off' ? 'flash-off' : 'flash'}
              onPress={() =>
                setFlash(curValue => (curValue === 'off' ? 'on' : 'off'))
              }
              size={30}
              color="white"
            />

            <Ionicons
              name={mode === 'camera' ? 'qr-code-sharp' : 'camera'}
              onPress={() => setMode(mode === 'qr' ? 'camera' : 'qr')}
              size={30}
              color="white"
            />
          </View>
          {/* show camera button */}
          <Pressable
            onPress={onTakePicturePressed}
            onLongPress={onStartRecording}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              bottom: 50,
              width: 75,
              height: 75,
              backgroundColor: isRecording ? 'red' : 'white',
              borderRadius: 75,
            }}
          />
        </>
      )}
    </View>
  );
};

export default CameraScreen;
