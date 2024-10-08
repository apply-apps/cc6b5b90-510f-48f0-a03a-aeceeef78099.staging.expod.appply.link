// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';

const API_URL = 'https://apihub.staging.appply.link/chatgpt';

const App = () => {
  const [receiver, setReceiver] = useState('');
  const [reason, setReason] = useState('');
  const [role, setRole] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateGreeting = async () => {
    if (!receiver || !reason || !role) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: "system", content: "You are a helpful assistant that generates friendly greetings." },
          { role: "user", content: `Generate a friendly greeting for ${receiver} who is a ${role}. The reason for the greeting is: ${reason}` }
        ],
        model: "gpt-4o"
      });

      const { data } = response;
      setGreeting(data.response);
    } catch (error) {
      console.error('Error generating greeting:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
      alert('Failed to generate greeting. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Greeting Generator</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter receiver's name"
            placeholderTextColor="#666"
            value={receiver}
            onChangeText={setReceiver}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter receiver's role"
            placeholderTextColor="#666"
            value={role}
            onChangeText={setRole}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter reason for greeting"
            placeholderTextColor="#666"
            value={reason}
            onChangeText={setReason}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={generateGreeting}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Generating...' : 'Generate Greeting'}
            </Text>
          </TouchableOpacity>
          <ScrollView style={styles.greetingContainer}>
            <Text style={styles.greeting}>{greeting}</Text>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // White text
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#FFFFFF', // White text
    backgroundColor: '#333', // Darker input background
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  greetingContainer: {
    width: '100%',
    maxHeight: 200,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#333', // Darker container background
  },
  greeting: {
    fontSize: 16,
    color: '#FFFFFF', // White text
  },
});

export default App;
// End of App.js