// a component which takes in two numbers and renders a progress bar

// import the react library
import React from 'react';

// import the stylesheet and view from react native
import { StyleSheet, View } from 'react-native';

export default function ProgressBar(props) {
    
        // a function which calculates the percentage of the progress bar
        const calculatePercentage = (current, total) => {
            return (current / total) * 100;
        }
    
        // a function which calculates the width of the progress bar
        const calculateWidth = (percentage) => {
            return percentage + '%';
        }
    
        // return the progress bar
        return (
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <View style={styles.progress} />
                </View>
            </View>
        );
    }

    // a stylesheet which styles the progress bar
    const styles = StyleSheet.create({
        // a small container in the top of the screen
        container: {
            width: '100%',
            height: 50,
            backgroundColor: '#0000',
            alignItems: 'center',
            justifyContent: 'center',
            // place the container at the top of the screen
            position: 'absolute',
            top: 10,
        },
        // the progress bar
        progressBar: {
            width: '80%',
            height: 10,
            backgroundColor: '#fff',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
        },
        // the progress bar
        progress: {
            width: '50%',
            height: 10,
            backgroundColor: 'black',
            borderRadius: 5,
        },
    });