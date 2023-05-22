import { useState, useEffect} from 'react'; 
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from '../../../firabase-config';
import { AntDesign } from '@expo/vector-icons'; 


/**import { collection, query, where, getDocs } from "firebase/firestore";

/ */

export default function Login(){

    const navigation = useNavigation()
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);

    const [message, setMessage] = useState("")
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigation.navigate("Home")
        })
        .catch(error => {
            setMessage(error.code.slice(5).replace("-", " "))
        })
    }

    return(
        <View style={styles.container}>

            <View style={{marginTop: "40%"}}>
                <AntDesign name="aliwangwang" size={120} color="#251180" />
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

            <TouchableOpacity style={styles.btn} onPress={() => signIn()}>
                <Text style={styles.btnText}>
                    LOGIN
                </Text>
            </TouchableOpacity>

            <View style={styles.register}>
                <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
                    <Text style={styles.registerTxt}>Sign up if you don't have an account!</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.forgot}>
                <TouchableOpacity onPress={() => {navigation.navigate("Recovery")}}>
                    <Text style={styles.registerTxt}>Forgot password ?</Text>
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

    forgot:{
        padding: 5,
    },

    registerTxt:{
      fontFamily: "courier",
      fontSize: 14,
      fontWeight: "bold" 
    }
})