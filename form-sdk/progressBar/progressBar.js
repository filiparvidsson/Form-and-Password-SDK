// a component which takes in two numbers and renders a progress bar

// import the react library
import React from 'react';

import { COLORS, PROGRESS_BAR_DIMENSIONS, ALIGN } from '../formToolbag/constants';

// import the stylesheet and view from react native
import { StyleSheet, View } from 'react-native';

// import hooks
import { useEffect } from 'react';

// takes in two variables and renders a progress bar named current and total
export default function ProgressBar(props) {

    // a state which keeps track of the current progress
    const [progress, setProgress] = React.useState(0);
    
        // a function which calculates the percentage of the progress bar
        const calculatePercentage = (current, total) => {
            // calculate the percentage
            let percentage = current / total;
            // set the progress state to the percentage
            setProgress(percentage);
            
        }

        // a hook which updates the percentage when the props change
        useEffect(() => {
            // run the calculate percentage function
            calculatePercentage(props.current, props.total);
        }, [props.current, props.total]);
        
    
        // a function which calculates the width of the progress bar
        const calculateWidth = (percentage) => {
            return percentage + '%';
        }
    
        // return the progress bar
        return (
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <View 
                    // set the width of the progress bar to the percentage and give it style.progress
                    // if it is 100% give it green background
                    style={[styles.progress, {width: calculateWidth(progress * 100), backgroundColor: progress === 1 ? 'green' : 'black'}]}
                    />
                </View>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            width: PROGRESS_BAR_DIMENSIONS.WIDTH_FULL,
            height: PROGRESS_BAR_DIMENSIONS.LARGE_HEIGHT,
            backgroundColor: COLORS.SECONDARY,
            alignItems: ALIGN.CENTER,
            justifyContent: ALIGN.CENTER,
            position: ALIGN.ABSOLUTE,
            top: PROGRESS_BAR_DIMENSIONS.TOP,
        },
        progressBar: {
            width: PROGRESS_BAR_DIMENSIONS.WIDTH_SEMIFULL,
            height: PROGRESS_BAR_DIMENSIONS.SMALL_HEIGHT,
            backgroundColor: COLORS.SECONDARY,
            borderColor: COLORS.PRIMARY,
            borderWidth: PROGRESS_BAR_DIMENSIONS.BORDER_WIDTH,
            borderRadius: PROGRESS_BAR_DIMENSIONS.BORDER_RADIUS,
        },
        progress: {
            width: PROGRESS_BAR_DIMENSIONS.WIDTH_SEMIFULL,
            height: PROGRESS_BAR_DIMENSIONS.SMALL_HEIGHT,
            borderRadius: PROGRESS_BAR_DIMENSIONS.BORDER_RADIUS,
            transition: PROGRESS_BAR_DIMENSIONS.TRANSITION,
        },
        
    });