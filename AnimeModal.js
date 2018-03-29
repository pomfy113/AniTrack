import React, { Component } from 'react';
import { StyleSheet, Button, TouchableOpacity, Image, Modal, View, Text} from 'react-native';


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
                        <View style={styles.miniBox}>
                            <Image style={{width: 112, height: 146}} source={{uri: this.props.anime.picture}}/>
                            <View style={{marginLeft: 30}}>
                                <Text>{this.props.anime.title}</Text>
                                <Text>{this.props.anime.score} / 10 </Text>
                            </View>
                        </View>

                        <Text>{this.props.anime.synopsis}</Text>
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
        backgroundColor: "white",
        justifyContent: "space-between"
    },
    miniBox: {
        flexDirection: "row"
    }
});
