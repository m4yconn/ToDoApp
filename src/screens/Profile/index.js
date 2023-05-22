import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity  } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { getAuth, updateProfile, sendEmailVerification} from "firebase/auth";
import { useState, useEffect, React} from "react";
import { useNavigation } from "@react-navigation/native";
import BtnState from "../../components/BtnState";


export default function Profile(){

    const navigation = useNavigation()
    const auth = getAuth();
    const user = auth.currentUser;
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [input, setInput] = useState(false)
    const [inputUrl, setInputUrl] = useState("")
    const [verified, setVerified] = useState({color: "red", message: "UNVERIFIED EMAIL"})



    const load = () => {user.providerData.forEach((profile) => {
          setName(profile.displayName) 
          setImgUrl(profile.photoURL)
          setEmail(profile.email)

          if(user.emailVerified){
            setVerified({color: "#251180", message: "VERIFIED EMAIL"})
          }

    })}; 


    useEffect(

        () => {
            load()
        }

        , [])

    

    return(
        <View style={styles.container}>

            <View style={styles.topo}>
                <Text style={{
                    color: "#fff",
                    fontFamily: "courier",
                    fontSize: 20,
                    marginTop: "14%",
                    fontWeight: "bold"
                }}>PROFILE</Text>
            </View>
 
            <View style={styles.bubble}>
                <View>
                    <Image
                        style={styles.img}
                        source={{uri: imgUrl}}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.edit}
                    onPress = {() => {setInput(!input)}}
                    >
                <   MaterialIcons name="edit" size={40} color="black" />
                </TouchableOpacity>
            

            {input == true ? <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder=" enter a url of image"
                                    onChangeText={(text)  => {
                                        setInputUrl(text)
                                    }}
                                    onKeyPress={(keyPress) => {

                                        if(keyPress.code == "Enter"){

                                            setImgUrl(inputUrl)
                                            setInput(false)

                                            updateProfile(auth.currentUser, {
                                                photoURL: inputUrl
                                              }).then(() => {
                                                console.log("sucess")
                                              }).catch((error) => {
                                                console.log(error.message)
                                              });
                                        }
                                        
                                    }}
                                />
                            </View>: null}

            <View style={styles.boxText}>
                <Text style={styles.text}>
                    {name}
                </Text>
            </View>

            </View>
            

                <BtnState
                color = {verified.color}
                text = {verified.message}
                onPress = {() => {

                    if(verified.color == "red"){
                        sendEmailVerification(auth.currentUser)
                        .then(() => {
                        setVerified({color: "green", message: "SENT EMAIL"})
                    });
                        
                    }
                }}
                
                />

                <BtnState
                color = "#251180"
                text = "CHANGE PASSWORD"
                onPress = {() => {navigation.navigate("Recovery")}}
                />

                <BtnState
                color = "#251180"
                text = "LOGOUT"
                onPress = {() => {navigation.navigate("InitialPage")}}
                />

            

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderWidth: 1,
        alignItems: "center"
    },

    boxText:{
        marginTop: "5%"
    },

    text:{
        fontFamily: "courier",
        fontSize: 20,
        fontWeight: "bold"
    },

    img:{
        height: 160,
        width: 160,
        borderRadius: 100
    },

    input:{
        fontFamily: "courier",
        fontWeight: "bold",
        paddingLeft: 25,
        fontSize: 16,
        height: 50,
        width: 260,
        borderRadius: 20,
        backgroundColor: "#E6E6FA",
        alignItems: "center",
        marginTop: "5%"
    },

    edit:{
        marginLeft: 140,
        marginTop: -45
    },

    topo:{
        height: "30%",
        width: "100%",
        backgroundColor: "#251180",
        alignItems: "center"
    },

    bubble:{
        width: 300,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#fffafa",
        marginTop: -140,
        borderWidth: 1,
        marginBottom: 45
    },

    boxBtn:{
        marginTop: "20%",
        borderWidth: 1,
        height: "30%"
    },


})