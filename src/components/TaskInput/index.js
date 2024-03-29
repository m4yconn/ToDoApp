import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function TaskInput(props){  

    return(
        <View style={styles.container}>
            <TextInput
                placeholder = "Adicione uma tarefa"
                style = {styles.input}
                onChangeText = {props.onChangeText}
                value = {props.value}
                

            />
            <TouchableOpacity
                onPress = {props.onPress}
            >
                <Ionicons name="add-circle" size={40} color="#251180" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    input:{
        fontFamily: 'courier',
        marginHorizontal: 10,
        borderBottomWidth: 3,
        borderColor: '#251180',
        fontSize: 20,
        width: '75%'
    },

    container:{
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})