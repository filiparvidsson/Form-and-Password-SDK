// A component which takes in children and renders them as a form

import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

//import hooks
import { useEffect } from 'react';

// import the form field form the form folder
import FormField from './form/formField';
// import the progress bar from the progress bar folder
import ProgressBar from './progressBar/progressBar';

export default function CompiledForm(props) {

            
 
    // a state which keeps track of the current form data
    const [formData, setFormData] = React.useState({});

    // a state which keeps track of how many form fields have been filled out
    const [filledFields, setFilledFields] = React.useState(0);

    // a state which keeps track of how many form fields are required
    const [requiredFields, setRequiredFields] = React.useState(0);

    // a function which sets all states to their initial values
    const resetForm = () => {
        setFormData({});
        setFilledFields(0);
        setRequiredFields(0);
    }

    // a function which calles the reset state and empties all the forms when the page loads for the first time
    useEffect(() => {
        resetForm();
    }, []);


    // a function which checks if the form is filled out as is to be passed to the child and updates the filledFields state
    const checkFilled = (filled) => {
        // only run if the filled state has changed
        if (filled) {
            // increment the filledFields state
            setFilledFields(filledFields + 1);
            console.log("added");
        } else {
            // decrement the filledFields state
            setFilledFields(filledFields - 1);
            console.log("removed");
        }

        console.log(filledFields);
    }

    const countRequiredFields = () => {
        // set the state of the required fields
        setRequiredFields(props.children.length);
    }

    // use the useeffect to keep track of the number of required fields and the number of filled fields
    useEffect(() => {
        // a function which counts the number of required fields
        // call the function
        countRequiredFields(); 
    
        // update when the childrens filled state changes
    }, [filledFields]);


    return (
        <View style={styles.container}>
            <ProgressBar current={filledFields} total={requiredFields} />
            
            {React.Children.map(props.children, (child) => {  
                    return (
                        <FormField title={child}

                        // update compiledform when the formfield by paasing countFilledFields as a prop
                        onChange={checkFilled}
                         />
                    );
                
            })}

            {/* a button that calls the countfilled fields */}
            <Text
                // set number of filled fields to 0
                onPress={() => {
                    setFilledFields(0);
                }}
             >
             Set number of fileds to zero
             </Text>
        </View>
    );
    
    }

    // a stylesheet which styles the form
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
