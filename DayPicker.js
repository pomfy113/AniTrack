import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Picker, View, Text} from 'react-native';
import moment from 'moment';


export default class DayPicker extends Component{
    render(){
        const PickerItems = this.props.allDays.map((day, index) => {
            return <Picker.Item
                        style={styles.pickerItems}
                        key={index}
                        label={day === this.props.currentDay ? `${day} (Today)` : day} value={index}/>
        })

        return(
            <View style={styles.picker}>
                <Picker
                  style={{flex: 1, color: 'white'}}
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
        flex: 1,
        height: 70,
        marginVertical: 25,
        paddingHorizontal: 15,
        backgroundColor: "#343a70",
        borderRadius: 15
    }
});
