// which returns a form field with a field and a title

// Path: form-passoword-sdk\form-sdk\form\formField.js

// import dependencies
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { useState, useEffect } from 'react';


// a component which takes in a title as a child and renders a form field
export default function FormField(props) {

    // a state which keeps track if the field is filled out
    const [filled, setFilled] = useState(false);

    // a state which keeps track of the value of the field
    const [value, setValue] = useState('');


    // an array with possible text input types
    const textInputTypes = ['text', 'email', 'number', 'tel', 'url'];

    // an array with possible select input types
    const selectInputTypes = ['select', 'radio', 'checkbox'];

    // an array with possible hidden input types
    const hiddenInputTypes = ['hidden', 'password'];

    // access the text written in the rendered text input and check if it is filled out
    const checkFilled = (text) => {
        if (text.length > 0 && !filled) {
            setFilled(true);
            console.log("filled")
        } else if (text.length === 0 && filled) {
            setFilled(false);
            console.log("empty")
        }
        
    }

    // call the props.onchange function when the filled state changes
    useEffect(() => {
        props.onChange(filled);
    }, [filled]);

    // a function which extracts the string from the title
    const extractString = (title) => {
        return title.props.children;
    }
    // depending on which title is passed in the props, render a different form field depending on which array the title is in
    // if the title is in the textInputTypes array, render a text input field
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{extractString(props.title)}</Text>
            <TextInput
             /* change the style depending on the title*/
                style={
                    textInputTypes.includes(extractString(props.title)) ? styles.textInput : null ||
                    selectInputTypes.includes(extractString(props.title)) ? styles.selectInput : null ||
                    hiddenInputTypes.includes(extractString(props.title)) ? styles.hiddenInput : null
                }

                /* if the input is in the hiddenTypesArray make it secureTextEntry */
                secureTextEntry={hiddenInputTypes.includes(extractString(props.title)) ? true : false}

                onChangeText={(text) => {
                    checkFilled(text);
                    setValue(text);
                }}
            />

            {/* if the field is filled out, render a checkmark next to it */}
            {filled ? <Text style={styles.checkmark}>✓</Text> : null}

        </View> 


    )

}




// a stylesheet which styles the form field
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // transparant background
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        borderRadius: 5,
    },
    selectInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        borderRadius: 5,
    },
    hiddenInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    // place the checkmark on the right side of the form field
    checkmark: {
        position: 'absolute',
        right: 0,
        fontSize: 20,
        fontStyle: 'italic',
    }

    
});