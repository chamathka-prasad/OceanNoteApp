import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function AddNoteUi({ navigation }) {

  useEffect(() => {
    const backAction = () => {
    navigation.navigate("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const [getTitle, setTitle] = useState("");
  const [getCategory, setCategory] = useState("");
  const [getDescription, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Study", value: "1" },
    { label: "Travel", value: "2" },
    { label: "Personal", value: "3" },
    { label: "Work", value: "4" },
  ]);
  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.view1}>
        <Image source={require("./images/notrer.png")} style={styles.mainImg} />

        
      </View>
      <View style={styles.view2}>
        <Text style={styles.mainTest}>Add Note</Text>
        <Text style={styles.font1}>Title</Text>
        <TextInput
          style={styles.input1}
          onChangeText={(value) => {
            setTitle(value);
          }}
          label="Titile"
        />

        <Text style={styles.font1}>Category</Text>

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.drop}
        />
        <Text style={styles.font1}>Description</Text>
        <TextInput
          style={styles.des}
          multiline={true}
          onChangeText={(value) => {
            setDescription(value);
          }}
          numberOfLines={4}
        />

        <Pressable
          style={styles.button1}
          onPress={async () => {
            const obj = {
              title: getTitle,
              category: value,
              description: getDescription,
              userMobile: await AsyncStorage.getItem("mobile"),
            };

            fetch("http://192.168.8.145/reactproj/addNoteProcess.php", {
              method: "post",
              body: JSON.stringify(obj),
            })
              .then((response) => {
                return response.text();
              })
              .then((value) => {
                Alert.alert("Message", value);

                if (value == "success") {
                  navigation.navigate("Home");
                }else if(value.length==0){
                  navigation.navigate("Home");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <Text style={styles.btext}>ADD NOTE</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  view1: {
    flex: 1,
    backgroundColor: "#0C2D48",
  },
  view2: {
    backgroundColor: "#fff",
    flex: 6,
    marginHorizontal: 5,
  },
  view3: {
    backgroundColor: "#ADD8E6",
    height: 150,
    marginHorizontal: 7,
    marginTop: 5,
    borderRadius: 10,
  },
  text1: {
    marginLeft: 250,
    marginTop: 0,
  },
  mainTest: {
    marginLeft: 130,
    fontSize: 20,
    fontWeight: "bold",
  },
  image1: {
    width: 100,
    height: 100,
    position: "absolute",
    zIndex: 1,
    marginLeft: 250,
    marginTop: 450,
  },
  image2: {
    width: 60,
    height: 60,
    margin: 3,
  },
  mainImg: {
    width: 200,
    height: 100,
    marginLeft: 100,
  },
  titleText: {
    position: "absolute",
    marginLeft: 110,
    marginTop: 35,
    fontSize: 20,
    fontWeight: "bold",
  },
  drop: {
    fontSize: 30,
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    marginBottom: 10,

    width: 350,
  },
  view4: {
    height: 90,
    backgroundColor: "green",
    flexDirection: "row",
  },
  view41: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    justifyContent: "center",
    alignItems: "center",
  },
  image3: {
    width: 50,
    height: 50,
  },
  input1: {
    borderStyle: "solid",
    borderColor: "black",

    fontSize: 20,
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
  },
  font1: {
    marginTop:10,
    marginLeft: 20,
    fontSize: 20,
  },
  des: {
    borderStyle: "solid",
    borderColor: "black",

    fontSize: 20,
    height: 250,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
  },
  button1: {
    backgroundColor: "green",
    marginTop: 50,
    fontSize: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

    marginHorizontal: 100,
  },
  btext: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
