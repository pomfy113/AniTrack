import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import moment from 'moment';


function Anime(props){
    return(
        <View style={styles.anime}>
            <Image style={{width: 225, height: 293}} source={{uri: props.anime.picture}}/>
            <View style={styles.info}>
                <Text style={styles.date}>{props.date}</Text>
                <Text style={styles.title}>{props.anime.title}</Text>
            </View>
        </View>
    )
}

class AnimeScroll extends Component{
    render(){
        const content = this.props.data[this.props.day].map((anime, index) => {
            const formattedDate = moment(anime.releaseDate).format("HH:mma");
            return <Anime key= {index} anime={anime} date={formattedDate}/>
        })

        return (
            <ScrollView>
                {content}
                <Text>Testing</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    anime: {
        flex: 1,
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
