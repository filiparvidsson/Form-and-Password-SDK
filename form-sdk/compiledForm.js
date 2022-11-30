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

    // count the number of children that has the filled state set to true
    const countFilledFields = () => {
        let count = 0;

        // filter out the number of children that has the filled state set to true
        React.Children.map(props.children, (child) => {
            if (child.filled) {
                count++;
            }
        });

        console.log(count);

    }

    // call the countFilledFields function when the formfield component typed in the children is updated
    useEffect(() => {
        countFilledFields();
    }, [props.children]);


    // use the useeffect to keep track of the number of required fields and the number of filled fields
    useEffect(() => {
        // a function which counts the number of required fields
        const countRequiredFields = () => {
            // set the state of the required fields
            setRequiredFields(props.children.length);
        }
        // call the function
        countRequiredFields(); 
    
        // update when the childrens filled state changes
    }, []);


    return (
        <View style={styles.container}>
            <ProgressBar filledFields={5} requiredFields={10} />
            
            {React.Children.map(props.children, (child) => {  
                    return (
                        <FormField title={child}


                         />
                    );
                
            })}

            {/* a button that calls the countfilled fields */}
            <Text onPress={() => countFilledFields()}>Count filled fields</Text>
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
