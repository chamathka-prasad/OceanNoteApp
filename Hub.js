import { Image, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export function HubUi({ navigation }) {
  getDetails();

  async function getDetails() {
    var m = await AsyncStorage.getItem("mobile");
    var p = await AsyncStorage.getItem("password");

    if (m != null || p != null) {
      var obj = { mobile: m, password: p };
      fetch("http://192.168.8.145/reactproj/log.php", {
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then((response) => {
          return response.text();
        })
        .then((value) => {
          var rdata;
          try {
            rdata = JSON.parse(value);
          } catch (error) {}

          if (rdata == null) {
            navigation.navigate("LogIn");
            alert("your account is deactivated");
          } else {
            navigation.navigate("Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigation.navigate("LogIn");
    }
  }

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.view1}>
        <Image source={require("./images/notrer.png")} style={styles.mainImg} />
      </View>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  view1: {
    // backgroundColor: "blue",
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
