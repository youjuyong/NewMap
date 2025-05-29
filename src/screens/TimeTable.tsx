import React, { useCallback, useState }  from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, ActivityIndicator, ScrollView  } from "react-native";
import { Button, TextInputCss, Comm, Section } from "../../public/styles";
import { BtnContainer } from "../component/Container";
import DropDownPicker from 'react-native-dropdown-picker';

const TimeTableCompo = ({ route, navigation } : any) => {
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '선택', value: 'apple'},
    {label: '[1]평일', value: 'banana'},
    {label: '[2]토요일', value: 'banana'},
    {label: '[3]휴일/일요일', value: 'banana'}
  ]);

       const [subName, setSubName] = useState<string | undefined>('');
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const onChangeSubWayName = useCallback(( text : string ) => {
            setSubName(text);
    },[subName]);
    

    const ButtonClick = useCallback(() => {

    },[]);

    return (
          <BtnContainer>
                 <View style={Button.btnInnerDiv}>
                    <View style={Section.timeBtnInnerDiv}>
                        <TextInput
                                                        style={[TextInputCss.timeTxtInput, isFocus && { backgroundColor : "#B3CDFF" }]}
                                                        onChangeText={(text : string) => onChangeSubWayName(text)} // 콜백 삽입
                                                        onFocus ={ (e) => setIsFocus(!isFocus)}
                                                        value={subName} // value 연결
                                                        placeholder="역명을 입력해주세요."
                                                        autoComplete="email"
                                                        textContentType="emailAddress"
                        />
                        <TouchableOpacity  style={Button.SubWayNameBtn} onPress = {(element) => ButtonClick() }><Text style={Button.BtnText}>검색</Text></TouchableOpacity >
                    </View>
                    <View>
                        <Text>요일(필수)</Text>
                         <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={Comm.taimeTalbeSelectBox}
                    />
                    </View>
                 </View>
          </BtnContainer>
    );
}


const TimeTable = React.memo(TimeTableCompo);
export default TimeTable;