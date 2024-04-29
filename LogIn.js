import { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export function LogInUi({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want exit the app ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [getmobile, Setmobile] = useState("");

  const [getPassword, SetPassword] = useState("");

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.view1}>
        <Image source={require("./images/notrer.png")} style={styles.mainImg} />
      </View>
      <View style={styles.view2}>
        <Text style={styles.mainTest}>Log In</Text>

        <Text style={styles.font1}>Mobile</Text>

        <TextInput
          style={styles.input1}
          value={getmobile}
          onChangeText={(value) => {
            Setmobile(value);
          }}
          keyboardType="numeric"
          label="Titile"
        />

        <Text style={styles.font1}>Password</Text>

        <TextInput
          style={styles.input1}
          value={getPassword}
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
              mobile: getmobile,

              password: getPassword,
            };

            fetch("http://192.168.8.145/reactproj/log.php", {
              method: "POST",
              body: JSON.stringify(obj),
            })
              .then((response) => {
                return response.text();
              })
              .then(async (value) => {
                var rdata;
                try {
                  rdata = JSON.parse(value);
                } catch (error) {}

                if (rdata == null) {
                  alert(value);
                } else {
                  alert("success");
                  await AsyncStorage.setItem("mobile", rdata.mobile);
                  await AsyncStorage.setItem("password", rdata.password);

                  Setmobile("");
                  SetPassword("");
                  navigation.navigate("Home");
                }

                // if (value == 2) {
                //   Alert.alert("Message", "Incorrect mobile or password");
                // } else {
                //   var log = JSON.parse(value);

                //   await AsyncStorage.setItem("mobile", log.mobile);
                //   await AsyncStorage.setItem("password", log.password);

                //   navigation.navigate("Home");
                // }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <Text style={styles.btext}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.button2}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.btext}>Not Register yet ? Register</Text>
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
    justifyContent: "center",
  },
  view2: {
    flex: 2,
    marginHorizontal: 5,
    // marginTop:200,
  },
  view3: {
    backgroundColor: "yellow",
    height: 150,
    marginHorizontal: 7,
    marginTop: 5,
    borderRadius: 10,
  },
  text1: {
    marginLeft: 270,
    marginTop: 0,
  },
  mainTest: {
    marginLeft: 165,
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
    // backgroundColor: "green",
    flexDirection: "row",
  },
  view41: {
    flex: 1,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image3: {
    width: 50,
    height: 50,
    marginTop: 100,
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
  button2: {
    backgroundColor: "blue",
    marginTop: 50,
    fontSize: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

    marginHorizontal: 50,
  },
});
