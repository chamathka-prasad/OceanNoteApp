import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function HomeUi({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Study", value: "1" },
    { label: "Travel", value: "2" },
    { label: "Personal", value: "3" },
    { label: "Work", value: "4" },
  ]);

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      console.log("reloaded");
      get();

      return ui;
    });
  }, [navigation]);

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

  const [getData, setData] = useState();
  get();

  async function get() {
    const obj = { mobile: await AsyncStorage.getItem("mobile") };
    fetch("http://192.168.8.145/reactproj/getNoteProcess.php", {
      method: "post",
      body: JSON.stringify(obj),
    })
      .then((response) => {
        return response.text();
      })
      .then((value) => {
        // Alert.alert("Message", value);
        var ob = JSON.parse(value);
        // alert(ob);
        if (value.length == 0) {
          setData = null;
        } else {
          setData(ob);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.view1}>
        <TouchableWithoutFeedback>
          <Image
            source={require("./images/notrer.png")}
            style={styles.mainImg}
          />
        </TouchableWithoutFeedback>

        <View style={styles.view4}>
          <View style={styles.view41}>
            <Image
              source={require("./images/previous.png")}
              style={styles.image3}
            />
          </View>
          <View style={styles.view41}>
            <TouchableWithoutFeedback
              onLongPress={async () => {
                try {
                  await AsyncStorage.removeItem("mobile");
                  await AsyncStorage.removeItem("password");
                  BackHandler.exitApp();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <Image
                source={require("./images/user.png")}
                style={styles.image3}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={styles.view2}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.drop}
        />

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("AddNote");
          }}
        >
          <Image
            source={require("./images/addition.png")}
            style={styles.image1}
          />
        </TouchableWithoutFeedback>
        <FlatList data={getData} renderItem={LisUi} />
      </View>
    </SafeAreaView>
  );

  return ui;
}
function LisUi({ item }) {
  var im;
  images();
  function images() {
    if (item.category == 1) {
      im = require("./images/studying.png");
    } else if (item.category == 2) {
      im = require("./images/destination.png");
    } else if (item.category == 3) {
      im = require("./images/protection.png");
    } else {
      im = require("./images/briefcase.png");
    }
    return im;
  }

  const ui = (
    <TouchableWithoutFeedback>
      <View style={styles.view3}>
        <Text style={styles.text1}>{item.reg_date}</Text>
        <Image source={im} style={styles.image2} />
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={{ textAlign: "center" }}>{item.description}</Text>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: "#ADD8E6",
    flex: 6,
  },
  view3: {
    backgroundColor: "#145DA0",
    height: 150,
    marginHorizontal: 7,
    marginTop: 5,
    borderRadius: 10,
  },
  text1: {
    marginLeft: 250,
    marginTop: 0,
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
    marginLeft: 90,
    marginTop: 35,
    fontSize: 20,
    fontWeight: "bold",
  },
  drop: {
    marginVertical: 3,
    marginHorizontal: 3,
  },
  view4: {
    height: 90,
    backgroundColor: "green",
    flexDirection: "row",
  },
  view41: {
    flex: 1,
    backgroundColor: "#145DA0",
    justifyContent: "center",
    alignItems: "center",
  },
  image3: {
    width: 50,
    height: 50,
  },
});
