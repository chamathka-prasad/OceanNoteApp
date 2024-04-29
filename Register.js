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

export function RegiaterUi({ navigation }) {

  useEffect(() => {
    const backAction = () => {
    navigation.navigate("LogIn");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Student", value: "1" },
    { label: "Employee", value: "2" },
  ]);

  const [getFirstName, SetFirstName] = useState("");
  const [getLastName, SetLastName] = useState("");
  const [getmobile, Setmobile] = useState("");
  const [getUserType, SetUserType] = useState("");
  const [getPassword, SetPassword] = useState("");
  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.view1}>
        <Image source={require("./images/notrer.png")} style={styles.mainImg} />

        <View style={styles.view4}>
          <View style={styles.view41}>
            <Image
              source={require("./images/register.png")}
              style={styles.image3}
            />
          </View>
        </View>
      </View>
      <View style={styles.view2}>
        <Text style={styles.mainTest}>Register</Text>
        <Text></Text>
        <Text style={styles.font1}>First Name</Text>
        <TextInput
          style={styles.input1}
          onChangeText={(value) => {
            SetFirstName(value);
          }}
          label="Titile"
        />
        <Text style={styles.font1}>Last Name</Text>

        <TextInput
          style={styles.input1}
          onChangeText={(value) => {
            SetLastName(value);
          }}
          label="Titile"
        />

        <Text style={styles.font1}>Mobile</Text>

        <TextInput
          style={styles.input1}
          onChangeText={(value) => {
            Setmobile(value);
          }}
          keyboardType="numeric"
          label="Titile"
        />
        <Text style={styles.font1}>User Type</Text>

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.drop}
        />

        <Text style={styles.font1}>Password</Text>

        <TextInput
          style={styles.input1}
          onChangeText={(value) => {
            SetPassword(value);
          }}
          secureTextEntry={true}
          label="Titile"
        />

        <Pressable
          style={styles.button1}
          onPress={() => {
            const obj = {
              firstName: getFirstName,
              lastName: getLastName,
              mobile: getmobile,
              userType: value,
              password: getPassword,
            };
            fetch("http://192.168.8.145/reactproj/registerProcess.php", {
              method: "post",
              body: JSON.stringify(obj),
            })
              .then((response) => {
                return response.text();
              })
              .then((value) => {
                if (value == "success") {
                  navigation.navigate("LogIn");
                  Alert.alert("Success", "Successfully Registred");
                  SetFirstName("");
                  SetLastName("");
                  Setmobile("");
                  value(null);
                  SetPassword("");
              
                } else {
                  Alert.alert("Message", value);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <Text style={styles.btext}>Register</Text>
        </Pressable>

        <Pressable
          style={styles.button2}
          onPress={() => {
            navigation.navigate("LogIn");
          }}
        >
          <Text style={styles.btext}>Already registered go to Login</Text>
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
    flex: 2,
    backgroundColor: "#0C2D48",
  },
  view2: {
    backgroundColor: "#fff",
    flex: 6,
    marginHorizontal: 5,
  },
  view3: {
    backgroundColor: "yellow",
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
    marginLeft: 150,
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
    backgroundColor: "white",
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
    backgroundColor: "blue",
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
  button2: {
    backgroundColor: "green",
    marginTop: 50,
    fontSize: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

    marginHorizontal: 50,
  },
});
