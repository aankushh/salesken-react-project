import React, {useState} from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux'; // Import connect function
import { loginSuccess, loginFailure } from '../redux/actions/authActions'; // Import action 

// AuthScreen component
const AuthScreen = ({ dispatch }) => {
  const [text, setText] = useState('');
  const handleLogin = () => {
    // Call loginSuccess action creator with user data
    dispatch(loginSuccess({ username: text, /* other user data */ }));
  };

  return (
    <View>
      <Text style={styles.heading}> Enter Your Details </Text>
      <TextInput
        style={styles.text}
        placeholder="Email" secureTextEntry
        onChangeText={newText => setText(newText)}
        defaultValue={text} 
      />
      <TextInput 
        style={styles.text}
        placeholder="Password"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
      heading: {
        fontSize: 30,
        textAlign: 'center',
        margin: '20px auto 40px auto'
      },
    text: {
      margin: 10,
      border: '1px solid #ccc',
      padding: 8
    },
  }
);

export default connect()(AuthScreen); // Connect AuthScreen component to Redux
