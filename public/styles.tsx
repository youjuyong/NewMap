import { StyleSheet } from "react-native";
import { color } from "./var";
import { Platform } from "react-native";
import { platform } from "os";

export const Root_Css = StyleSheet.create({
   defaultSize : {
    width : '100%',
    height :780
   }
});

export const Header_Container = StyleSheet.create({
    divContainer : {
        padding : 20,
        backgroundColor : color.blue500
    },
    
    divInnerContainer : {
        height : 220,
        width : "100%",
        padding : 20,
        alignItems : "center",
        display : "flex",
        position:'relative',
        flexDirection : 'row',
      flexWrap : 'wrap'
    },

    textPTag : {
       position : 'absolute',
       top : '40%',
       left : '50%',
       marginLeft : -50,
       fontSize : 32,
       lineHeight : 40,
       color : color.white200
    }
    
});

export const Section = StyleSheet.create({ 
    mainBoxDiv : {
        borderTopStartRadius : 50,
        borderTopEndRadius : 50,
        height : "100%",
        width : "100%",
        overflow : 'hidden',
        position : 'absolute',
        top : 310,
        textAlign : 'center',
        backgroundColor : color.blue150
    },

    RouteTypeList : {
      width : "auto",
      height : 40,
      borderTopWidth :1,
      marginLeft : 10,
      marginRight : 10,
      borderColor : color.gray300,
      flexDirection : 'row',
      flexWrap : 'wrap',
      paddingTop : 10,
    },

    mainBoxInner : {
        textAlign : 'center',
        width :300,
        height : 'auto',
        alignItems : 'center',
        position : 'relative',
        flexDirection : 'row',
        flexWrap : 'wrap',
        marginLeft : 'auto',
        marginRight : 'auto',
        marginTop : 50,
        marginBottom : 40
    },
    
    RouteTypeInfo : {
      width: 'auto',
      minWidth : 60,
      height :30,
      borderWidth : 1,
      marginLeft : 10,
      borderRadius : 50,
      paddingLeft : 10,
      paddingTop : 3,
      paddingRight : 10,
      fontWeight : 700,
      fontFamily: 'PretendardVariable',
      color : '#fff'
    },

    SubwayTypeList : {
      width: '100%',
      height :30,
      borderTopWidth : 1,
      borderRadius : 50,
      paddingTop : 3,
      paddingRight : 10,
      fontWeight : 700,
      fontFamily: 'PretendardVariable',
      color : '#fff',
      marginTop : 20,
      borderColor : '#ddd',
        flexDirection : 'row',
      flexWrap : 'wrap',
    },

    SubwayTypeView : {
      width : 'auto',
      flexDirection : 'row',
      flexWrap : 'wrap',
      marginTop : 10,
      marginLeft : 10
    },

    SubwayTypeText : {
      fontWeight : 600,
      marginLeft : 2,
      marginTop : -2,
      color : color.black300,
      fontFamily: 'PretendardVariable',
    },

    RouteTextType : {
      color : '#fff',
      fontWeight : 700
    },

    mainBoxButton : {
        width : 133,
        height : 150,
        display : 'flex',
        position : 'relative',
        marginRight : 0,
        marginLeft : 15,
        marginTop : 15,
        borderRadius : 10,
        ...Platform.select({
          ios : {
            shadowColor : "#000",
            shadowOffset : {
              width : 10,
              height : 10
            },
            shadowOpacity : 0.5,
            shadowRadius : 10
          },
          android : {
            elevation : 20,
          }
        }),
        backgroundColor : color.white
    },

    timeBtnInnerDiv : {
      width : 'auto',
      height : 'auto',
      position : 'relative',
      flexDirection : 'row',
      flexWrap : 'wrap',
      marginBottom : 10,
      paddingBottom : 10,
      paddingTop : 10,
      borderTopWidth : 1,
      borderColor : color.black100,
    } ,

    timeDayWeekText : {
      marginTop : 15,
      fontSize : 15,
      fontFamily: 'PretendardVariable'
    },
  
    mainBoxText : {
          textAlign : 'center',
          color : color.black300,
          fontSize :20,
          fontWeight : 700,
          marginTop : 10,
         fontFamily: 'PretendardVariable'
    },

    mainBoxLocImg : {
        marginLeft : "25%",
        marginTop : 15,
    },

    current_loc : {
        width : 120,
        height : 100
    },

    SubWayInfo : {
              width : "100%",
           position : "relative",
             height : "auto",
             flex : 1,
             flexGrow : 1,
             borderWidth : 1
    },

    SubWayInfoInner : {
        width : "auto",
           position : "relative",
             height : 800,
             borderTopWidth : 1,
             marginRight : 10,
             marginLeft : 10,
             marginTop : 10,
             borderColor : color.gray300,
             flex : 1
    },

    favorListInner : {
       width : "auto",
           position : "relative",
             height : 'auto',
             borderColor : color.gray300,
             flex : 1,
    },

    timeTableInnerDiv : {
      width : '100%',
      height : 'auto',
      flexDirection : 'row',
      flexWrap : 'wrap'
    },

    uptimeTableInnerDiv : {
      width :'50%',
      height : 'auto',
    },

    downtimeTableInnerDiv : {
      width :'50%',
      height : 'auto',
    },
    
    DirTitleView : {
      width : '100%',
      height : 'auto',
      paddingTop : 10,
      paddingBottom : 10,
      borderBottomWidth : 1,
      borderBottomColor : color.black100,
      borderRadius : 10
    },

    DirTitleText : {
      fontSize : 17,
      textAlign : 'center',
      fontFamily: 'PretendardVariable',
      fontWeight : 700
    },

    DirContentView : {
      width : '100%',
      height : 'auto',
      paddingLeft : 10,
      paddingRight : 10
    },
    
    DirContentText : {
      fontSize : 13,
      fontFamily: 'PretendardVariable',
      marginTop : 10
    }
});

export const  Container = StyleSheet.create({ 
  btnContainer : {
    width : '100%',
    height : 'auto',
    flex : 1
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
        marginLeft : 20,
        marginBottom : 10,
  },
  
  timeSectionBtn : {
        marginTop : 10,
        position: "relative",
        width : 'auto',
        height : 'auto',
        marginRight : 30,
        marginLeft : 30,
        borderBottomWidth : 1,
        borderColor : color.black100,
  },
  BtnText : {
    color : color.gray700,
    fontWeight : 700,
    paddingLeft: 5,
    fontFamily: 'PretendardVariable',
  },

   SubWayNameConent : {
            width : 80,
           height : 42,
     paddingBottom : 5,
      paddingRight : 10,
       paddingLeft : 10,
      borderRadius : 60,
        fontWeight : 100,
        marginLeft : 10,
   },

   SubWayNameSearchBtn : {
    width : 60,
           height : 42,
       paddingTop : 8,
     paddingBottom : 5,
      paddingRight : 10,
       paddingLeft : 10,
       borderWidth : 2,
      borderRadius : 60,
        fontWeight : 100,
        marginLeft : 10,
       borderColor : color.blue200,
     backgroundColor : color.blue100
   },


   SubWayNameImage : {
    width : 30,
    height : 30,
    marginLeft :10
   }
});

export const TextInputCss = StyleSheet.create({
  arrivalTxtInput : {
    position: "relative",
      width : 150,
     height : 42,
     borderWidth : 2,
     borderRadius : 60,
     paddingTop : 5,
     paddingBottom : 5,
     paddingRight : 10,
     paddingLeft : 15,
     borderColor : color.blue700,
     color : color.black,
     fontWeight : 400
  },
   timeTxtInput : {
    position: "relative",
      width : 180,
     height : 42,
     borderWidth : 2,
     borderRadius : 60,
     paddingTop : 5,
     paddingBottom : 5,
     paddingRight : 10,
     paddingLeft : 15,
     borderColor : color.blue700,
     color : color.black,
     fontWeight : 400
  }
});

export const Comm = StyleSheet.create({
  loading : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   listContainer: {
    padding: 16,
     flexGrow : 1
  },
  favorListContainer : {
    flexGrow : 1
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 20,
    alignItems: 'center',
    height : 'auto',
    minHeight : 180
  },
  favorItemConatiner : {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection : 'row',
    flexWrap : 'wrap',
    position : "relative"
  },
  favorItemIn : {
    padding : 5,
    borderTopWidth : 1,
    borderBlockColor : color.gray300

  },
  favorItemImgContainer : {
    padding : 10,
      width : 80,
      position : "relative",
  },
  favorItemName : {
    width : 220,
    position : 'relative',
  },
  favorItemText : {
    padding : 5,
    fontFamily: 'PretendardVariable',
    fontSize : 20,
    fontWeight : 700
  },
  favorItemDeleteBtn : {
    height :40,
    width : 50,
    padding : 10,
    paddingLeft : 13,
    borderRadius : 10,
    backgroundColor : color.red600,
  },
  favorImgStar : {
    height : 36,
    width :36
  },
  favorItemDeleteBtnText : {
    fontSize : 14,
    fontWeight : 700,
    color : color.white
  },
  line: {
    fontSize: 16,
    fontWeight: 'bold',
    color : '#fff',
    fontFamily: 'PretendardVariable',
  },
  rightLine : {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign : 'right',
    color : '#fff',
    fontFamily: 'PretendardVariable',
  },
  centerLine : {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign : 'center',
  },
  destination: {
    fontSize: 14,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  subWayName : {
    borderWidth : 1,
    width : 120,
    position : 'absolute',
    backgroundColor : '#fff',
    zIndex : 222,
    height : 35,
    paddingTop : 5,
    lineHeight : 35,
    borderRadius : 50,
     fontFamily: 'PretendardVariable'
  },
  preArivalName : {
     position : 'absolute',
     width : '50%',
     textAlign : 'left',
     paddingLeft :20,
     left : 0,
     zIndex : 0,
     borderRadius : 50,
     paddingTop : 5,
     height : 35,
     lineHeight : 35,
      fontFamily: 'PretendardVariable'
  },
  afterArivalName : {
       position : 'absolute',
      width : '50%',
      right : 0,
      zIndex : 0,
      borderRadius : 50,
      paddingRight :20,
      paddingTop : 5,
      height : 35,
      lineHeight : 35,
      fontFamily: 'PretendardVariable'
  },
  
  info_cntainer : {
    width : '110%',
    height : 'auto',
    top : 25,
    position : 'relative',
    flexDirection : 'row',
      flexWrap : 'wrap',
    left : 0 
  },

  right_info_cntainer : {
    width : '50%',
    height : 'auto',
    position : 'relative',
    right : 0 ,
    borderLeftWidth : 1,
    borderColor : '#ddd',
    paddingBottom : 20,
    marginBottom:15,
    minHeight : 130,
  },

  left_info_cntainer : {
    width : '50%',
    height : 'auto',
    position : 'relative',
    left : 0 ,
    fontFamily: 'PretendardVariable',
    marginBottom:15,
    paddingBottom : 20,
    minHeight : 130,
  },

  info_cntainer_text : {
    paddingTop : 10,
    paddingLeft : 10,
    fontFamily: 'PretendardVariable'
  },

  SubwayionView : {
      flexDirection : 'row',
      flexWrap : 'wrap',
      height : 'auto',
  },

  SubwayionImage : {
    position : 'relative',
    marginTop : 12,
    marginLeft : 5
  },

  taimeTalbeSelectBox : {
    width : 140,
    height : 40
  },

});


export const ImageStyles = StyleSheet.create({
    arrivalLeftImg : {
      position : "absolute",
      left : 0,
      marginTop : 10,
      marginLeft : 5
    },
    arrivalRightImg : {
      position : "absolute",
      right : 0,
      marginTop : 10,
      marginRight : 5
    },
    mainBoxImg : {
      position : "relative",
      marginTop : 115,
      marginLeft : 30
    },
    kakaoImg : {
       position : "absolute",
       left : 25,
       top : 5,
       width : 40,
       height: 40
    }
});


export const Var_Color = StyleSheet.create({
  blue100 : {
    color : '#ECF2FF',
    fontWeight : 700
  },

  blue200 : {
    color : '#D5E3FF',
    fontWeight : 700
  },

  blue300 : {
    color : '#B3CDFF',
    fontWeight : 700
  },

  blue400 : {
    color : '#81ACFF',
    fontWeight : 700
  },

  blue500 : {
    color : '#5383E8',
    fontWeight : 700
  },

  blue600 : {
    color : '#4171D6',
    fontWeight : 700
  },

  red100 : {
    color : '#FFF1F3',
    fontWeight : 700
  },

  red200 : {
    color : '#FFD8D9',
    fontWeight : 700
  },

  red300 : {
    color : '#FFBAC3',
    fontWeight : 700
  },

  red400 : {
    color : '#FF6C81',
    fontWeight : 700
  },

  red500 : {
    color : '#E84057',
    fontWeight : 700
  },

  red600 : {
    color : '#D31A45',
    fontWeight : 700
  },

  puple100 : {
    color : '#DDA0DD',
    fontWeight : 700
  },

  puple200 : {
    color : '#EE82EE',
    fontWeight : 700
  },

  puple300 : {
    color : '#DA70D6',
    fontWeight : 700
  },

  puple400 : {
    color : '#FF00FF',
    fontWeight : 700
  },

  puple500 : {
    color : '#BA55D3',
    fontWeight : 700
  },

  puple600 : {
    color : '#9400D3',
    fontWeight : 700
  },
});


export const RouteColor:any = StyleSheet.create({
  1001 : {
    backgroundColor : '#0052A4'
  },

  1002 : {
    backgroundColor : '#00A84D'
  },

  1003 : {
    backgroundColor : '#EF7C1C'
  },

  1004 : {
    backgroundColor : '#00A5DE'
  },

  1005 : {
    backgroundColor : '#996CAC'
  },

  1006 : {
    backgroundColor : '#CD7C2F'
  },

  1007 : {
    backgroundColor : '#747F00'
  },

  1008 : {
    backgroundColor : '#E6186C'
  },

  1009 : {
    backgroundColor : '#BB8336'
  },

  1092 : {
    backgroundColor : '#B7C452'
  },

  1065 : {
    backgroundColor : '#0065B3'
  },

  1077 : {
    backgroundColor : '#D4003B'
  },

  1063 : {
    backgroundColor : '#77C4A3'
  },

  1075 : {
    backgroundColor : '#F5A200'
  },

  1081 : {
    backgroundColor : '#003DA5'
  },

  1067 : {
    backgroundColor : '#0C8E72'
  },

  1093 : {
    backgroundColor : '#81A914'
  },

  1032 : {
    backgroundColor : '#9A6292'
  },

  9999 : {
    backgroundColor : '#ddd'
  },
});


export const Header_Div = StyleSheet.create({
  
  HeaderContainer : {
      width : '100%',
      minHeight : 90,
      marginBottom : 0,
      borderWidth : 3,
      position : 'relative',
       flexDirection : 'row',
    display : "flex",
    backgroundColor : color.blue1300
  },

  HeaderInner : {
    borderWidth : 1,
    width : '25%',
    borderColor : color.white100
  },

  HeaderText : {
    color : color.white200
  }
});

export const Header_Styles = StyleSheet.create({

  header_container : {
    width : '100%',
    height : '100%',
    paddingTop : 50
  },

  header_Button : {
    marginLeft : 'auto',
    marginRight : 'auto',
    width : 230,
    height : 50,
    borderWidth : 1,
    borderRadius : 30,
  },

  kakao : {
    backgroundColor : color.yellow1000
  },

  header_Button_Text : {
    textAlign : 'center',
    marginTop : 15,
    fontWeight : 700
  }
});


export const MyInfo_Styled = StyleSheet.create({
  rayout_1 : {
    width : 'auto',
    height : 'auto',
    padding : 20,
    backgroundColor : color.blue200
  },

  rayout_2 : {
    height : 100,
    width : '100%',
    flexDirection : 'row',
    flexWrap : 'wrap'
  },

  imgRayout : {
    height : 70,
    width : 70,
    borderRadius : 10,
    backgroundColor : color.gray200,
    marginRight: 10,
    marginTop : 10
  },

  titleRayout : {
    height : '100%',
    width : 138,
    paddingTop : 20,
    marginRight : 10
  },

  logOutRayout : {
    height : '100%',
    minWidth : 70,
    marginTop : 5
  },
  textStyled : {
    fontSize : 12,
    fontWeight : 700,
    fontFamily: 'PretendardVariable'
  },

  logoutBtnStyled : {
    width : 60,
    height :40,
    paddingLeft : 10,
    paddingTop : 10,
    fontWeight : 700,
    marginTop : 20,
    borderRadius : 10,
    backgroundColor : '#ddd',
  },

  imgStyle : {
    height : 50,
    width : 50,
    marginLeft : 10,
    marginTop : 5
  }
});
