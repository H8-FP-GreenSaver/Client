import "dotenv/config";

export default {
  expo: {
    name: "GreenSaver",
    slug: "GreenSaver",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.Auth_Domain,
      projectId: process.env.Project_Id,
      storageBucket: process.env.Storage_Bucket,
      messagingSenderId: process.env.Messaging_Sender_Id,
      appId: process.env.App_Id,
    },
    plugins: [
      "expo-secure-store",
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
  },
};
