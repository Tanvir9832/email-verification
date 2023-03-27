import {Route,Routes,BrowserRouter} from "react-router-dom"

import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Profile from "./components/Profile";
import Post from "./components/Post"
import Settings from "./components/Settings"
import MainPage from "./components/MainPage";
import Protected from "./Services/protected";
import ForgetPass from "./components/ForgetPass";
import ForgetPassFinal from "./components/forgetPassFinal";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/forgetPassword" element={<ForgetPass />} />
      <Route path="/user/reset/:id/:token" element={<ForgetPassFinal />}/>
      <Route path="/login" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

        <Route path="/" element={<Protected />}>
          <Route path="/" element={<MainPage />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/post" element={<Post />}/>
          <Route path="/setting" element={<Settings />}/>
        </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App;
