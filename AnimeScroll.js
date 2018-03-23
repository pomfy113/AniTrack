import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import moment from 'moment';


function Anime(props){
    return(
        <View key={props.index} style={styles.anime}>
            <Image style={{width: 225, height: 293}} source={{uri: props.anime.picture}}/>
            <Text>{props.date}</Text>
            <Text style={styles.title}>{props.anime.title}</Text>
        </View>
    )
}

class AnimeScroll extends Component{
    render(){
        const content = this.props.data[this.props.day].map((anime, index) => {
            const formattedDate = moment(anime.releaseDate).format("HH:mma");
            return <Anime index={index} anime={anime} date={formattedDate}/>
        })

        return (
            <ScrollView horizontal={true}>
                {content}
                <Text>Testing</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    anime: {
        width: 225,
        marginHorizontal: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "800"
    }
});


export default AnimeScroll;
