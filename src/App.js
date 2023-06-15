import { createContext, useContext } from "react";
import Categories from "./screens/Categories";
import { initializeApp } from "firebase/app";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-GWt2JoXLDWEPNs5Vhp8bzONh",
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

const firebaseConfig = {
  apiKey: "AIzaSyDV3k45DPQH2uALGHqxm52F6j7PUtqErG8",
  authDomain: "react-generative-ai.firebaseapp.com",
  projectId: "react-generative-ai",
  storageBucket: "react-generative-ai.appspot.com",
  messagingSenderId: "240530431819",
  appId: "1:240530431819:web:1db367c112eb76703d92ce",
  measurementId: "G-84VEPYFYGW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    // <OpenAIContext.Provider value={openai}>
    <div className="App">
      <Categories />
    </div>
    // </OpenAIContext.Provider>
  );
}

export default App;
