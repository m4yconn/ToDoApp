import {View, TextInput, StyleSheet, Text, TouchableOpacity, Alert} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


export default function RecoveryPass(){
    
    const [error, setError] = useState({color: "red", message: ""})
    const navigation = useNavigation("Login")
    const [email, setEmail] = useState("")
    const auth = getAuth();


    const recoveryPassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setError({color: "green", message: "recovery email sent"})
        })
        .catch((error) => {
            setError({color: "red", message: error.code})
        });
    }
    
    return(
        <View style={styles.container}>

            <View style={{marginTop: "50%"}}>
                <AntDesign name="aliwangwang" size={120} color="#251180" />
            </View>

            <View style={styles.input}>
                <TextInput onChangeText={(text) => {setEmail(text)} } style={styles.boxInput} placeholder="Enter a email"></TextInput>
            </View>

            <Text
                style={{
                    margin: 10,
                    fontFamily: "courier",
                    color: error.color,
                    fontWeight: "bold",
                    fontSize: 16
                }}
            >{error.message}</Text>

            <TouchableOpacity style={styles.btn} onPress={() => recoveryPassword()}>
                <Text style={styles.btnText}>
                    SEND
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.btnText}>
                    BACK
                </Text>
            </TouchableOpacity>

        </View>
    )
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

    boxInput:{
        paddingLeft: 15,
        fontSize: 16,
        height: 50,
        width: 280,
        borderRadius: 20,
        backgroundColor: "#E6E6FA",
        fontFamily: "courier"
    },

    btn: {
        marginTop: "4%",
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
    }
})