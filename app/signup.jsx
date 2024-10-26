import * as React from "react";
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [profileImage, setProfileImage] = React.useState(null); // Store the selected image
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const pickImage = async () => {
    // Request permissions to access the image gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera roll is required!");
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Store the image URI
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      {/* Display the profile image picker at the top */}
      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image
            source={require("../assets/images/placeholderimg.png")}
            style={styles.profileImage}
          />
        )}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Ionicons name="camera-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            onChangeText={setEmailAddress}
            style={styles.input}
          />
          <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TextInput
            value={firstName}
            placeholder="First Name"
            onChangeText={setFirstName}
            style={styles.input}
          />
          {/* <Button title="Sign Up" onPress={onSignUpPress} /> */}
          <TouchableOpacity
            style={styles.button}
            onpress={() => onSignUpPress()}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Verification Code"
            onChangeText={setCode}
            style={styles.input}
          />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4abd3e",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  imagePicker: {
    backgroundColor: "#4abd3e",
    padding: 10,
    borderRadius: 40,
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: "30%",
    width: 60,
  },
  imageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 20,
  },
  button: {
    borderColor: "#4abd3e",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#4abd3e",
    fontSize: 20,
    fontWeight: "bold",
  },
});
