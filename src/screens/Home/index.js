import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs, setDoc, doc, getFirestore} from "firebase/firestore"
import Topo from "../../components/Topo";
import Completed from "../../components/Completed";
import TaskInput from "../../components/TaskInput";
import { firebaseConfig } from "../../../firabase-config";


export default function Home(){

    const navigation = useNavigation()
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const auth = getAuth(app);
    const user = auth.currentUser
    const [task, setTask] = useState('')
    const [input, setInput] = useState(false)
    const [pending, setPending] = useState([])
    
     useEffect(
        
         () => {
             const q = query(collection(db, "users"), where("email", "==", user.email));

             getDocs(q).then(querySnapshot => {
                 querySnapshot.forEach((doc) => {
                 console.log(doc.data().tasks)
                 setPending(doc.data().tasks)
             })
         })

         }
     , [])

    return(
        <View style={styles.container}>
            <Topo
                onPress = {() => setInput(!input)}
                onPress2 = {() => navigation.navigate("Profile")}
            />
            {input ? <TaskInput
                        onChangeText = {(text) => setTask(text)}
                        onPress = {() => {
                            let listTemp = [...pending]
                            listTemp.push(task)

                            setDoc(doc(db, "users", user.email), {
                                name: user.displayName,
                                email: user.email,
                                tasks: listTemp
                              });
                              
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

                                        let pendings = []
                                        pending.map((e2) => {

                                            if(e2 != e)
                                                pendings.push(e2)
                                              
                                        })

                                        setDoc(doc(db, "users", user.email), {
                                            name: user.displayName,
                                            email: user.email,
                                            tasks: pendings
                                        });

                                        setPending(pendings)
                                    }}

                                    onPressEdit = {() => {
                                
                                        let pendings = []
                                        
                                        pending.map((e2) => {

                                            if(e2 != e)
                                                pendings.push(e2)
                                              
                                        })

                                        setDoc(doc(db, "users", user.email), {
                                            name: user.displayName,
                                            email: user.email,
                                            tasks: pendings
                                        });

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
        color: '#251180'
    },

    subContainer:{
        height: '75%',
    },

    
})