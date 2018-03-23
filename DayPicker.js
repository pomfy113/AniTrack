import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Picker, View, Text} from 'react-native';
import moment from 'moment';


class DayPicker extends Component{
    render(){
        const PickerItems = this.props.allDays.map((day, index) => {
            return <Picker.Item style={styles.pickerItems} key={index} label={day} value={index}/>
        })

        return(
            <View style={styles.picker}>
                <Picker
                  style={{flex: 1, padding: 5}}
                  selectedValue={this.props.currentDay}
                  onValueChange={(itemValue) => this.props.changeDay(itemValue)}>
                    {PickerItems}
                </Picker>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    picker: {
        flex: 1
    },
        pickerItems: {
            fontSize: 20,
            fontWeight: '900'
        }
});


export default DayPicker;
