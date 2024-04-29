import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeUi } from "./Home";
import { StyleSheet } from "react-native";
import { AddNoteUi } from "./AddNote";
import { RegiaterUi } from "./Register";
import { LogInUi } from "./LogIna";
import { HubUi } from "./Hub";



const Stack = createNativeStackNavigator();

export default function app() {
 

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Hub" component={HubUi}  options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogInUi} options={{ headerShown: false }}/>
            <Stack.Screen
              name="Home"
              component={HomeUi}
              options={{ headerShown: false}}
            />
      
            <Stack.Screen name="Register" component={RegiaterUi} />
            <Stack.Screen name="AddNote" component={AddNoteUi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "yellow",
  },
});
