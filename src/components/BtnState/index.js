import { TouchableOpacity, Text, StyleSheet, View} from "react-native";

export default function BtnState(props){
    return( 
        <View>
        
        <TouchableOpacity
            style={{
                backgroundColor: props.color,
                width: 290,
                height: 55,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                marginTop: 20,
                flexDirection: "row",
                
            }}

            onPress = {props.onPress}
        >   
            <Text
                style={{
                    fontSize: 23,
                    fontFamily: "courier",
                    color: "#fff",
                    fontWeight: "bold"
                }}
            >{props.text}</Text>
        </TouchableOpacity>
        </View>
    );
}

