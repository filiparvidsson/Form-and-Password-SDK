// which returns a form field with a field and a title

// Path: form-passoword-sdk\form-sdk\form\formField.js

// import dependencies
import React from 'react';
// import font size and font family from the constants file
import { FONT_SIZE, FONT_FAMILY, FONT_WEIGHT, COLORS, TEXT_INPUT_DIMENSIONS, OPACITY, ALIGN } from '../formToolbag/constants';

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

    // a functions which check the password strength and return a number between 0 and 3
    const checkPasswordStrength = (password) => {
        // a variable which keeps track of the password strength
        let strength = 0;

        // if the password is longer than 8 characters, increment the strength
        if (password.length > 8) {
            strength++;
        }

        // if the password contains a number, increment the strength
        if (/\d/.test(password)) {
            strength++;
        }

        // if the password contains a special character, increment the strength
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            strength++;
        }

        // return the strength
        return strength;
    }

    // a function takes in a number between 0 and 3
    // and returns four small cubes which are green, yellow or red depending on the strength
    const renderPasswordStrength = (strength) => {

        if(!filled) return null;
        // an array which contains the four cubes
        let cubes = [];

        // for each cube, push a view with a different background color depending on the strength
        for (let i = 0; i < 3; i++) {
            cubes.push(
                // set the style to passwordStrengthCube, but change the right margin depending on the index
                // and make the background color green, yellow or red depending on the strength
                <View style={[styles.passwordStrengthCube, {marginRight: -20*i-25}, {backgroundColor: i < strength ? COLORS.GREEN : COLORS.RED}]} key={i}></View>
                //<View style={[styles.passwordStrengthCube, {marginRight: -20*i-25}]} key={i}/>
            )

        }

        return cubes;
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

            {/* if the field is a password field, render the password strength and update when someone is typing */}
            {extractString(props.title) === 'password' ? renderPasswordStrength(checkPasswordStrength(value)) : null}


        </View> 


    )

}




// a stylesheet which styles the form field
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //opacity: OPACITY.NONE,
        alignItems: ALIGN.CENTER,
        justifyContent: ALIGN.CENTER,
    },
    textInput: {
        height: TEXT_INPUT_DIMENSIONS.HEIGHT,
        borderColor: COLORS.GRAY,
        borderWidth: TEXT_INPUT_DIMENSIONS.BORDER_WIDTH,
        width: TEXT_INPUT_DIMENSIONS.WIDTH,
        borderRadius: TEXT_INPUT_DIMENSIONS.BORDER_RADIUS,
    },
    selectInput: {
        height: TEXT_INPUT_DIMENSIONS.HEIGHT,
        borderColor: COLORS.GRAY,
        borderWidth: TEXT_INPUT_DIMENSIONS.BORDER_WIDTH,
        width: TEXT_INPUT_DIMENSIONS.WIDTH,
        borderRadius: TEXT_INPUT_DIMENSIONS.BORDER_RADIUS,
    },
    hiddenInput: {
        height: TEXT_INPUT_DIMENSIONS.HEIGHT,
        borderColor: COLORS.GRAY,
        borderWidth: TEXT_INPUT_DIMENSIONS.BORDER_WIDTH,
        width: TEXT_INPUT_DIMENSIONS.WIDTH,
        borderRadius: TEXT_INPUT_DIMENSIONS.BORDER_RADIUS,
    },
    title: {
        fontSize: FONT_SIZE.MEDIUM,
        fontWeight: FONT_WEIGHT.BOLD,
    },
    checkmark: {
        position: ALIGN.ABSOLUTE,
        right: 0,
        fontSize: FONT_SIZE.MEDIUM,
        fontStyle: FONT_FAMILY.ITALIC,
    },
    passwordStrengthCube: {
        // force them to be in a row
        position: ALIGN.ABSOLUTE,
        // make them small
        width: 10,
        height: 10,
        top: '50%',
        // make them round
        borderRadius: 10,
        // make them have a margin between them
        margin: 5,
        // position them next to the text input
        right: 0,
        // make them red
        //backgroundColor: COLORS.GRAY,
    }

    
});