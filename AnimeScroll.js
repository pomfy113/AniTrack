import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import moment from 'moment';


function Anime(props){
    return(
        <TouchableOpacity onPress={props.handleModal}>
            <View style={styles.anime}>
                <Image style={{width: 225, height: 293}} source={{uri: props.anime.picture}}/>
                <View style={styles.info}>
                    <Text style={styles.date}>{props.date}</Text>
                    <Text style={styles.title}>{props.anime.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


class AnimeScroll extends Component{
    constructor(props){
        super(props);
        this.state = {
            current: this.props.data[this.props.day],
            days: 0
        }
    }

    render(){
        const content = this.props.data[this.props.day].map((anime, index) => {
            const date = new Date(anime.releaseDate)
            const formattedDate = moment(date).format("h:mma");
            return <Anime key={index} anime={anime} date={formattedDate} handleModal={() => console.log("Hewoo!")}/>
        })

        return (
            <View style={styles.animeList}>
                <ScrollView >
                    {content}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    animeList: {
        flex: 5
    },
    anime: {
        marginVertical: 10,
        flexDirection: "row",
    },
    info: {
        marginLeft: 10,
        width: 200,
        justifyContent: "center"
    },
        title: {
            fontSize: 25,
            fontWeight: "800"
        },
        date: {
            fontSize: 20
        }
});


export default AnimeScroll;
