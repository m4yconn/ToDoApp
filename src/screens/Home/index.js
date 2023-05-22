import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Topo from "../../components/Topo";
import Completed from "../../components/Completed";
import TaskInput from "../../components/TaskInput";


export default function Home(){

    const [task, setTask] = useState('')
    const [input, setInput] = useState(false)
    const [pending, setPending] = useState([])
    const [completed, setCompleted] = useState([])

    return(
        <View style={styles.container}>
            <Topo
                onPress = {() => setInput(!input)}
            />
            {input ? <TaskInput
                        onChangeText = {(text) => setTask(text)}
                        onPress = {() => {
                            let listTemp = [...pending]
                            listTemp.push(task)
                            setPending(listTemp)
                            setTask('')
                        }}
                        value = {task}
                        
                    /> : <></>}
            <View style={styles.subContainer}>
                <Text style={styles.boxText}>Pendentes</Text>
                <ScrollView style={styles.boxList}>
                    {
                        pending.map(e => {
                            return <Completed msg = {e}
                                    onPress = {() => {

                                        let completeds = [...completed]
                                        let pendings = []
                                        pending.map((e2) => {

                                            if(e2 != e)
                                                pendings.push(e2)
                                            else
                                                completeds.push(e2)
                                              
                                        })

                                        setPending(pendings)
                                        setCompleted(completeds)
                                    }}

                                    onPressEdit = {() => {
                                
                                        let pendings = []
                                        
                                        pending.map((e2) => {

                                            if(e2 != e)
                                                pendings.push(e2)
                                              
                                        })

                                        setPending(pendings)
                                        setInput(e)
                                        setTask(e)

                                    }}
                            />
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
    },

    boxList: {
        height: 50,
        padding: 10,
        margin: 5
    },

    boxText:{
        fontFamily: 'courier',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
        color: '#8b008b'
    },

    subContainer:{
        height: '75%',
    },

    
})