import { View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 
//rocket1

export default function InitialPage(){

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <AntDesign name="aliwangwang-o1" size={140} color="#251180"/>

            </View>
            <View style={styles.boxText}>
                <Text style={styles.text}>ToDo App</Text>
            </View>

            <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>

                <View style={[styles.btn, {backgroundColor: "#251180"}]}>
                    <Text style={[styles.textbtn, {color: "#fffafa"}]}>LOGIN</Text>
                </View>
                
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
                
                <View style={[styles.btn, {borderWidth: 1, borderColor: "#251180"}]}>
                    <Text style={[styles.textbtn, {color: "#251180"}]}>SING UP</Text>
                </View>
                
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{ 
        height: "100%",
        width: "100%",
        backgroundColor: "#fffafa",
        alignItems: "center"
    },

    boxImage:{
        marginTop: "45%",

    },

    boxText:{
        marginTop: "5%",
        marginBottom: "8%"
    },

    text:{
        color: "#251180",
        fontWeight: "bold",
        fontFamily: "courier",
        fontSize: 28
    },

    btn:{
        marginTop: "5%",
        padding: 12,
        width: 260,
        alignItems: "center",
        borderRadius: 5,

    },

    textbtn:{
        fontFamily: "courier",
        fontWeight: "bold",
        fontSize: 20
    }
})