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
        width :300,
        alignItems : 'center',
        position : 'relative',
        flexDirection : 'row',
        flexWrap : 'wrap',
        marginLeft : 'auto',
        marginRight : 'auto',
        marginTop : 70,
    },
    
    mainBoxButton : {
        width : 133,
        height : 150,
        display : 'flex',
        position : 'relative',
        marginRight : 0,
        marginLeft : 10,
        marginTop : 10,
        backgroundColor : color.blue600,
        borderRadius : 10
    },

    mainBoxText : {
          textAlign : 'center',
          color : color.white200,
          fontSize :20,
          fontWeight : 700,
          marginTop : 10,
          fontFamily: 'Pretendard-Regular',
    },

    mainBoxLocImg : {
        marginLeft : "30%",
        marginTop : 15
    },

    current_loc : {
        width : 120,
        height : 100
    },

    SubWayInfo : {
              width : "100%",
           position : "relative",
             height : "100%",
    },

    SubWayInfoInner : {
        width : "auto",
           position : "relative",
             height : "100%",
             borderTopWidth : 1,
             marginRight : 10,
             marginLeft : 10,
             borderColor : color.gray300
    }
});

export const  Container = StyleSheet.create({ 
  btnContainer : {
    width : '100%',
    height : 'auto',
  }
});

export const Button = StyleSheet.create({ 
  btnInnerDiv : {
        flexDirection : 'row',
        flexWrap : 'wrap',
        marginTop : 10,
        position: "relative",
        width : 'auto',
        height : 'auto',
        marginRight : 30,
        marginLeft : 30,
        marginBottom : 10
  },

  BtnText : {
    color : color.gray600,
    fontWeight : 600
  },

   SubWayNameBtn : {
            width : 80,
           height : 42,
       paddingTop : 8,
     paddingBottom : 5,
      paddingRight : 10,
       paddingLeft : 20,
       borderWidth : 2,
      borderRadius : 60,
        fontWeight : 100,
        marginLeft : 10,
       borderColor : color.green200,
     backgroundColor : color.green200
   }
});

export const TextInputCss = StyleSheet.create({
  arrivalTxtInput : {
    position: "relative",
      width : 180,
     height : 42,
     borderWidth : 2,
     borderRadius : 60,
     paddingTop : 5,
     paddingBottom : 5,
     paddingRight : 10,
     paddingLeft : 15,
     borderColor : color.green700,
     color : color.green700,
     fontWeight : 100
  }
});