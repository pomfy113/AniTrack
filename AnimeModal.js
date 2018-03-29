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
                        <View style={{flexDirection: "column"}}>
                            <View style={styles.modalHead}>
                                <Image style={{width: 112, height: 146}} source={{uri: this.props.anime.picture}}/>
                                <View style={styles.headInfo}>
                                    <Text style={styles.title}>{this.props.anime.title}</Text>
                                    <Text>{this.props.anime.score} / 10 </Text>
                                </View>
                            </View>
                            <Text>{this.props.anime.synopsis}</Text>
                        </View>
                        <Button style={{alignSelf: "flex-end"}}
                            onPress={() => this.props.changeModal()} title="Close"/>
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
    modalHead: {
        flexDirection: "row",
        marginBottom: 10
    },
    headInfo: {
        marginLeft: 30,
        width: 0,
        flexGrow: 1
    },
    title: {
        fontSize: 25
    }
});
