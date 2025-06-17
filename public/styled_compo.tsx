import styled from 'styled-components/native';
import { TextInput, TouchableOpacity } from "react-native";
import { color } from "./var";

interface Button_Touchable_type {
     width : string,
    height : string
}
export const Button_Tochable_style = styled(TouchableOpacity)<Button_Touchable_type>`
           width : ${(props) => props.width};
          height : ${(props) => props.height};
      paddingTop : 15px;
   paddingBottom : 5px;
    paddingRight : 10px;
     paddingLeft : 20px;
     borderWidth : 2px;
    borderRadius : 10px;
      fontWeight : 100;
      marginLeft : 10px;
     borderColor : ${color.blue500};
 backgroundColor : ${color.blue500};
`;

interface Text_Input_type {
     width : string,
    height : string
}
export const Text_Input_Style = styled(TextInput)<Text_Input_type>`
      position : "relative";
         width : ${(props) => props.width};
        height : ${(props) => props.height};
     marginTop : 5px;
   borderWidth : 2px;
  borderRadius : 60px;
    paddingTop : 5px;
 paddingBottom : 5px;
  paddingRight : 10px;
   paddingLeft : 15px;
   borderColor : ${color.blue700};
         color : ${color.black};
    fontWeight : 400;
`;
