import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const useWarmUpBrowser = () => {
    useEffect(() => {
      // Warm up the android browser to improve UX
      WebBrowser.warmUpAsync();

      WebBrowser.maybeCompleteAuthSession();

      return () => {
        WebBrowser.coolDownAsync();
      };
    }, []);
  };

  useWarmUpBrowser();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

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
      const { createdSessionId, setActive } = await startOAuthFlow({
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
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Sign In" onPress={onSignInPress} />
      <View>
        <Text>Don't have an account?</Text>
        <Link replace href="/signup">
          <Text>Sign up</Text>
        </Link>
      </View>
      <Button title="Sign in with Google" onPress={onOAuthSignInPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 10,
    height: 40,
    width: "80%",
    borderWidth: 1,
  },
});
