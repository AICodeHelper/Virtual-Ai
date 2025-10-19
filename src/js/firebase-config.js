import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCOpyk7CW14zFu6TBpmZrUsZxQzsW3Vtu0",
    authDomain: "virtual-ai-48b4d.firebaseapp.com",
    projectId: "virtual-ai-48b4d",
    storageBucket: "virtual-ai-48b4d.firebasestorage.app",
    messagingSenderId: "775331250023",
    appId: "1:775331250023:web:61f6b4e7792ff1658b79c2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };