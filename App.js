import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import AnimeScroll from './AnimeScroll.js';
import DayPicker from './DayPicker.js';
import AnimeModal from './AnimeModal.js';
import moment from 'moment-timezone'


export default class App extends React.Component {
    constructor(props){
        super(props)
        this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

        this.state = {
            seasonData: null,
            currentDay: null,
            day: null,
            modal: false,
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
            let day = moment.tz(new Date(anime.releaseDate), "Asia/Tokyo").tz("America/Los_Angeles").weekday()
            if(animeList[day]){
                animeList[day].push(anime);
            }
            else{
                animeList[day] = [anime];
            }
        })

        this.setState({seasonData: animeList})
    }

    changeDay(day){
        return this.setState({day: day})
    }

    changeModal(data){
        return this.setState({modal: !this.state.modal, animeData: data})
    }

    render() {
        let content;
        if(this.state.seasonData){
            content = (
                <View>
                    <DayPicker currentDay={this.state.day} allDays={this.days} changeDay={(day) => this.changeDay(day)}/>
                    <AnimeScroll data={this.state.seasonData} day={this.state.day} changeModal={(data) => this.changeModal(data)}/>
                </View>
            )
        }

        else{
            content = (
                <View>
                    <Text>Loading!</Text>
                    <ActivityIndicator/>
                </View>

            )
        }

        return (
            <View style={styles.container}>
                {this.state.modal === true
                    ? <AnimeModal anime={this.state.animeData} changeModal={() => this.changeModal()}/>
                    : null}
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
