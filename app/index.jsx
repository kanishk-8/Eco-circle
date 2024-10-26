import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import LottieView from "lottie-react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

const Index = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef(null);
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, setActive } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const useWarmUpBrowser = () => {
    useEffect(() => {
      WebBrowser.warmUpAsync();
      WebBrowser.maybeCompleteAuthSession();
      return () => {
        WebBrowser.coolDownAsync();
      };
    }, []);
  };

  useWarmUpBrowser();

  const handleOpenSignup = () => {
    setIsBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  };

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/home");
      } else {
        console.error(
          "Sign-in process incomplete",
          JSON.stringify(signInAttempt, null, 2)
        );
      }
    } catch (err) {
      console.error("Sign-in error", JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  const onOAuthSignInPress = useCallback(async () => {
    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop={false}
        style={styles.lottieAnimation}
        source={require("../assets/images/plant.json")}
      />
      <Text style={styles.text}>Eco Circle</Text>

      {/* Button to trigger signup bottom sheet */}
      <TouchableOpacity style={styles.button} onPress={handleOpenSignup}>
        <Text style={styles.buttonText}>Let's get started</Text>
      </TouchableOpacity>

      {/* Bottom sheet for Signup form */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Closed by default
        snapPoints={["40%", "50%"]}
        enablePanDownToClose
        onClose={() => setIsBottomSheetOpen(false)}
        style={styles.bottomSheet}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <Text style={styles.signupTitle}>Welcome Back!</Text>

          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={setEmailAddress}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.signinButton} onPress={onSignInPress}>
            <Text style={styles.signinButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Google OAuth */}
          <TouchableOpacity
            style={styles.oauthButton}
            onPress={onOAuthSignInPress}
          >
            <Ionicons name="logo-google" size={24} color="#4abd3e" />
            <Text style={styles.oauthButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          {/* Link to sign up page */}
          <View style={styles.signupFooter}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 40,
    color: "#4abd3e",
    fontWeight: "bold",
    marginBottom: 20,
  },
  lottieAnimation: {
    width: 400,
    height: 400,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: Dimensions.get("window").width * 0.8,
    height: 60,
    marginVertical: 10,
    backgroundColor: "#4abd3e",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  signupTitle: {
    fontSize: 24,

    fontWeight: "bold",
    color: "#4abd3e",
    marginBottom: 30,
    textAlign: "center",
  },
  signupText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
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
  signinButton: {
    backgroundColor: "#4abd3e",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
  },
  signinButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  oauthButton: {
    // backgroundColor: "#db4437",
    flexDirection: "row",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    // elevation: 2,
    borderColor: "#4abd3e",
    borderWidth: 1,
  },
  oauthButtonText: {
    color: "#4abd3e",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  signupFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  footerText: {
    color: "#666",
    marginRight: 5,
  },
  signupLink: {
    color: "#4abd3e",
    fontWeight: "bold",
  },
});
