import React, { Component } from 'react';
import { StyleSheet, Button, TouchableOpacity, Modal, View, Text} from 'react-native';


export default class AnimeModal extends Component{
    render(){
        return(
            <Modal
                visible={true}
                animation="slide"
                onRequestClose={() => console.log("Closing!")}
                transparent={true}>
                <View style={styles.modalBG}>
                    <View style={styles.modalBox}>
                        <Text>Testing!</Text>
                        <Button onPress={() => this.props.changeModal()} title="Close"/>
                    </View>
                </View>

            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    modalBG: {
        flex: 1,
        backgroundColor: "#7777775A",
        justifyContent: "center"
    },
    modalBox: {
        padding: 10,
        alignSelf: "center",
        height: "80%",
        width: "80%",
        backgroundColor: "white"
    }
});
