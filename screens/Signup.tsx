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
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  location: Yup.string().min(3, 'Provide a valid location').required('Required'),
  username: Yup.string().min(3, 'Provide a valid username').required('Required'),
});

const Signup = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);

  const errMesg = () => {
    Alert.alert('Wrong credential format', 'Please check all the field', [
      {
        text: 'ok',
        onPress: () => console.log('ok pressed'),
      },
    ]);
  };

  const registerUser = async (values: any) => {
    setLoader(true);
    try {
      const endpoint = "https://backend-furniture-seven.vercel.app/api/register/";
      const data = values;

      const response = await axios.post(endpoint, data);

      if(response.status === 201){
        navigation.replace('Login');
      }
    } catch (error) {
      console.log('error in register user', error);
    }
  }

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
            initialValues={{email: '', password: '', location: '', username: ''}}
            validationSchema={validationSchema}
            onSubmit={values => registerUser(values)}>
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
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.username ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="face-man-profile"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="enter username"
                      onFocus={() => setFieldTouched('username')}
                      onBlur={() => setFieldTouched('username', '')}
                      value={values.username}
                      onChangeText={handleChange('username')}
                      autoCapitalize="none"
                      placeholderTextColor={COLORS.gray}
                      autoCorrect={false}
                      style={{flex: 1,color: COLORS.gray}}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorMessage}>{errors.username}</Text>
                  )}
                </View>
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
                      style={{flex: 1, color:COLORS.gray}}
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
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Location</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.location ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="enter location"
                      placeholderTextColor={COLORS.gray}
                      onFocus={() => setFieldTouched('location')}
                      onBlur={() => setFieldTouched('location', '')}
                      value={values.location}
                      onChangeText={handleChange('location')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1, color: COLORS.gray}}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errorMessage}>{errors.location}</Text>
                  )}
                </View>
                <Button
                  isValid={isValid}
                  loader={loader}
                  onPress={isValid ? handleSubmit : errMesg}
                  title="S I G N U P"
                />

                <Text
                  style={styles.registration}
                  onPress={() => navigation.navigate('Login')}>
                  Don't have an account? <Text style={{color:COLORS.tertiary}}>Login</Text>
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 3.3,
    width: SIZES.width - 60,
    resizeMode: 'contain',
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: 'center',
    marginBottom: SIZES.Large,
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
  registration: {
    color: COLORS.gray,
    marginTop: 10,
    textAlign: 'center',
  },
});
