/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

import moment from 'moment';



const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {
    constructor(props){
        super(props)
        this.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

        this.state = {
            data: null,
            currentDay: null,
            day: null,
        }
    }

    componentWillMount(){
        let today = new Date().getDay()

        this.getAPIdata();
        this.setState({day: today, currentDay: today})
    }

    getAPIdata(){
        const api = `http://our-anime-list-fc.herokuapp.com/get-current`

        const options = { method: 'GET' };

        fetch(api, options).then((res) => {
            return res.json()
        }).then((data) => {
            let cleanedup = typeof data === 'string' ? JSON.parse(data) : data;
            let sorted = this.sortByDay(cleanedup)
        }).catch((err) => {
            console.log(err)
        });
    }

    sortByDay(data){
        let animeList = []
        console.log(typeof data)
        data.forEach((anime) => {
            let day = new Date(anime.releaseDate).getDay()
            if(animeList[day]){
                animeList[day].push(anime);
            }
            else{
                animeList[day] = [anime];
            }
        })

        this.setState({data: animeList})
    }

    render() {
        let content;
        if(this.state.data){
            content = this.state.data[this.state.day].map((anime, index) => {
                const formattedDate = moment(anime.releaseDate).format("HH:mma")
                return(
                    <View key={index} style={styles.anime}>
                        <Image style={{width: 225, height: 293}} source={{uri: anime.picture}}/>
                        <Text>{formattedDate}</Text>
                        <Text style={styles.title}>{anime.title}</Text>
                    </View>
                )
            })
        }
        else{
            content = (<Text>Loading!</Text>)
        }

        return (
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    {content}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
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
