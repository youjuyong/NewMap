import { StyleSheet } from "react-native";
import { color } from "./var";

export const Root_Css = StyleSheet.create({
   defaultSize : {
        height : "100%",
        width : "100%"
   }
});

export const Header_Container = StyleSheet.create({
    divContainer : {
        marginBottom : 10,
        padding : 20,
        backgroundColor : color.yellow500
    },
    
    divInnerContainer : {
        height : 200,
        width : "100%",
        padding : 20,
        alignItems : "center",
        display : "flex",
        position:'relative'
    },

    textPTag : {
       position : 'absolute',
       top : '50%',
       left : '50%',
       marginLeft : -50,
       fontSize : 32,
       lineHeight : 40,
       color : color.white200
    }
    
});

export const Section = StyleSheet.create({ 
    mainBoxDiv : {
        height : "100%",
        width : "100%",
        overflow : 'hidden',
        position : 'relative',
        textAlign : 'center',
        flexDirection : 'row',
    },
    
    mainBoxInner : {
        textAlign : 'center',
        width : 380,
        alignItems : 'center',
        position : 'relative',
        flexDirection : 'row',
        flexWrap : 'wrap',
        marginLeft : 'auto',
        marginRight : 'auto',
        marginTop : 30
    },
    
    mainBoxButton : {
        width : 173,
        height : 150,
        display : 'flex',
        position : 'relative',
        marginRight : 0,
        marginLeft : 10,
        marginTop : 10,
        backgroundColor : color.blue700,
        borderRadius : 10
    },

    mainBoxText : {
          textAlign : 'center',
          color : color.white200,
          fontSize :20,
          fontWeight : 700,
          marginTop : 10,
          fontFamily: 'Pretendard-Regular'
    },

    mainBoxLocImg : {
        marginLeft : "30%",
        marginTop : 15
    },

    current_loc : {
        width : 120,
        height : 100
    }
});