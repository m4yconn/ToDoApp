import { useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {getAuth, createUserWithEmailAndPassword, updateProfile, ProviderId} from 'firebase/auth'
import { useNavigation } from "@react-navigation/native";
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from '../../../firabase-config';
import { getFirestore, collection, setDoc, doc} from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons'; 


export default function Register(){

    const navigation = useNavigation()
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const auth = getAuth(app);


    const [login, setLogin] = useState(false)
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            
            setLogin(true)

        })
        .catch(error => {
            setMessage(error.code)
        })
    } 


    useEffect(
        () => {
            if(login == true){
            updateProfile(auth.currentUser, {
                displayName: username, photoURL: "https://is4-ssl.mzstatic.com/image/thumb/Purple/v4/15/2c/e7/152ce763-aa06-05f4-7e9c-3e2480262156/source.icns/512x512bb.png", 
              }).then(() => {
                setDoc(doc(db, "users", email), {
                    name: username,
                    tasks: []
                  });
                navigation.navigate("Home")
              }).catch((error) => {
                console.log(error.message)
              })
        }}
        , [login])

    return(
        <View style={styles.container}>

            <View style={{marginTop: "40%"}}>
                <AntDesign name="aliwangwang" size={120} color="#251180" />
            </View>

            <View style={styles.input}>
                <TextInput onChangeText={(text) => {setUsername(text)} } style={styles.boxInput} placeholder="Enter a username"></TextInput>
            </View>

            <View style={styles.input}>
                <TextInput onChangeText={(text) => {setEmail(text)} } style={styles.boxInput} placeholder="Enter a email"></TextInput>
            </View>

            <View style={styles.input}>
                <TextInput onChangeText={(text) => {setPassword(text)} } style={styles.boxInput}  placeholder="Enter a password" secureTextEntry={true}></TextInput>
            </View>

            <View style={styles.boxMessage}>
                <Text style={styles.textMessage}>{message}</Text>
            </View>

            <TouchableOpacity style={styles.btn}
                onPress={() => signUp()}
            >
                <Text style={styles.btnText}>
                    REGISTER
                </Text>
            </TouchableOpacity>

            <View style={styles.register}>
                <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
                    <Text style={styles.registerTxt}>Sign in if you have an account.</Text>
                </TouchableOpacity>
            </View>

            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: "100%",
        width: "100%",
        alignItems: "center",
        backgroundColor: "#fffafa"
    },

    input:{
        marginTop: "5%",
    },

    btn: {
        marginTop: "7%",
        backgroundColor: "#251180",
        width: 280,
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: "center"
    },

    btnText: {
        color: "#fffafa",
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: "courier"
    },

    boxInput:{
        paddingLeft: 15,
        fontSize: 16,
        height: 50,
        width: 280,
        borderRadius: 20,
        backgroundColor: "#E6E6FA",
        fontFamily: "courier"
    },
    
    boxMessage:{
        marginTop: "3%"
    },

    textMessage:{
        color: "red",
        fontFamily: "courier",
        fontWeight: "bold",
        fontSize: 16
    },

    register:{
        padding: 10,
        marginTop: "3%"
    },

    registerTxt:{
      fontFamily: "courier",
      fontSize: 14,
      fontWeight: "bold" 
    }
})