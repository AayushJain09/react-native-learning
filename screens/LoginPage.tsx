import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackBtn from '../components/BackBtn';
import {COLORS, SIZES} from '../constants';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const LoginPage = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [obsecureText, setObsecureText] = useState(true);


  const errMesg = () => {
    Alert.alert('Wrong credential format', 'Please check all the field', [
      {
        text: 'ok',
        onPress: () => console.log('ok pressed')
      }
    ]);
  };

  const login = async (values: any) => {
    setLoader(true);
    try {
      const endpoint = "https://backend-furniture-seven.vercel.app/api/login/";
      const data = values;
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        const responseData = response.data; // Use response.data directly
  
        // Save response data to AsyncStorage
        await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData));
        await AsyncStorage.setItem('id', JSON.stringify(responseData._id));

        // // Retrieve the saved user data to verify
        // const newUser = await AsyncStorage.getItem(`user${responseData._id}`);
        // console.log('newUser', newUser);
        
        navigation.replace('Bottom Navigation');
      } else {
        Alert.alert(
          'Error',
          'Please check all the fields and enter valid credentials.',
          [{ text: 'ok', onPress: () => console.log('ok pressed') }]
        );
      }
    } catch (error) {
      console.error('API error:', error); // Log the error for debugging
      Alert.alert(
        'Error',
        error.message || 'An error occurred', // Ensure error message is a string
        [{ text: 'ok', onPress: () => console.log('ok pressed') }]
      );
    } finally {
      setLoader(false);
    }
  };
  
  

  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <BackBtn OnPress={() => navigation.goBack()} />
          <Image
            source={require('../assets/images/bk.png')}
            style={styles.cover}
          />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={values => login(values)}>
            {({
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="enter email"
                      onFocus={() => setFieldTouched('email')}
                      onBlur={() => setFieldTouched('email', '')}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize="none"
                      placeholderTextColor={COLORS.gray}
                      autoCorrect={false}
                      style={{flex: 1, 
                        color: COLORS.gray}}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder="enter password"
                      onFocus={() => setFieldTouched('password')}
                      onBlur={() => setFieldTouched('password', '')}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      placeholderTextColor={COLORS.gray}
                      autoCorrect={false}
                      style={{flex: 1, color: COLORS.gray}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText(!obsecureText);
                      }}>
                      <MaterialCommunityIcons
                        name={obsecureText ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color={COLORS.gray}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <Button loader={loader} isValid={isValid} onPress={isValid ? handleSubmit : errMesg} title="L O G I N" />
              
                  <Text style={styles.registration} onPress={() => navigation.navigate('Signup')}>Don't have an account? <Text style={{color:COLORS.tertiary}}>Signup</Text></Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: 'contain',
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: 'center',
    marginBottom: SIZES.xxLarge,
  },
  wrapper: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.gray,
    marginBottom: 5,
    marginEnd: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.xSmall,
    textAlign: 'right',
  },
  inputWrapper: borderColor => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  registration:{
    color: COLORS.black,
    marginTop: 20,
    textAlign: 'center',
  }
});
