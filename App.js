import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import AnimeScroll from './AnimeScroll.js'
import DayPicker from './DayPicker.js'

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

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
        const api = 'http://ouranimechart.herokuapp.com/get-current'

        const options = { method: 'GET' };
        return fetch(api, options).then((res) => {
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

    changeDay(day){
        console.log(day)
        return this.setState({day: day})
    }

    render() {
        let content;
        if(this.state.data){
            console.log("Found something?")
            content = (
                <View>
                    <DayPicker currentDay={this.state.day} allDays={this.days} changeDay={(day) => this.changeDay(day)}/>
                    <AnimeScroll data={this.state.data} day={this.state.day}/>
                </View>
            )
        }

        else{
            content = (<Text>Loading!</Text>)
        }

        return (
            <View style={styles.container}>
                {content}
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
    day: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: '900'
    }
});
