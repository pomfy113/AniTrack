import React, { Component } from 'react';
import { FlatList, ListItem, StyleSheet, View, Text, Image, ScrollView } from 'react-native';
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

// class AnimeScroll extends Component{
//     render(){
//         const content = this.props.data[this.props.day].map((anime, index) => {
//             const date = new Date(anime.releaseDate)
//             const formattedDate = moment(date).format("h:mma");
//             return <Anime key= {index} anime={anime} date={formattedDate}/>
//         })
//
//         return (
//             <ScrollView>
//                 {content}
//                 <Text>Testing</Text>
//             </ScrollView>
//         )
//     }
// }

class AnimeScroll extends Component{
    constructor(props){
        super(props);
        this.state = {
            current: this.props.data[this.props.day],
            days: 0
        }
    }

    extend(){
        console.log("In")
        console.log(this.state.current.length, this.props.data[1].length,
            this.state.current.concat(this.props.data[this.state.days + 1]).length)
        this.setState({
            current: this.state.current.concat(this.props.data[this.state.days + 1]),
            days: this.state.days + 1
        })
    }

    render(){
        // const content = this.props.data[this.props.day].map((anime, index) => {
        //     const date = new Date(anime.releaseDate)
        //     const formattedDate = moment(date).format("h:mma");
        //     // return <Anime key= {index} anime={anime} date={formattedDate}/>
        // })

        return (
            <FlatList
                data={this.state.current}
                renderItem={({item}, index) =>
                    <Anime
                        key={index}
                        anime={item}
                        pageSize={5}
                        date={moment(new Date(item.releaseDate)).format("h:mma")}
                        onEndReached={() => console.log("!")}
                        onEndReachedThreshold={0.5}
                        style={{flex: 1}}
                    />}
            />
        )
    }
}

const styles = StyleSheet.create({
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
