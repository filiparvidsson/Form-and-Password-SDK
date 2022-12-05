import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// import the form component
import CompiledForm from './form-sdk/compiledForm';

export default function App() {
  return (
    <View style={styles.container}>
    {/* render the form component with a few children */}
      <CompiledForm>
        <Text>text</Text>
        <Text>email</Text>
        <Text>password</Text>
      </CompiledForm>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
