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

        this.state = {
            data: null,
            day: null
        }
    }

    componentWillMount(){
        this.getAPIdata();
        this.setState({day : new Date().getDay()})
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
                return(
                    <View key={index} style={styles.anime}>
                        <Image style={{width: 112, height: 159}} source={{uri: anime.picture}}/>
                        <Text>{anime.title}</Text>
                    </View>
                )
            })
        }
        else{
            content = (<Text>Loading!</Text>)
        }

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <ScrollView horizontal='true'>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    anime: {
        width: 112,
        marginHorizontal: 10
    }
});
