import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Control from "./pages/Control";
import RequireLogin from "./pages/RequireLogin";
import { Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { MQTTProvider } from "./context/MQTTContext";
import { THRESHOLD } from "./utils/constants";

export const AuthContext = createContext();
export const AuthDisPathContext = createContext();
export const WaterThresholdContext = createContext();
export const WaterThresholdDispatchContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [waterThreshold, setWaterThreshold] = useState(THRESHOLD.min);

  useEffect(() => {
    const storedWaterData = localStorage.getItem("waterThreshold");
    if (storedWaterData) setWaterThreshold(JSON.parse(storedWaterData));
    const storedLogin = localStorage.getItem("login");
    if (storedLogin) setIsLogin(JSON.parse(storedLogin));
  }, []);

  useEffect(() => {
    localStorage.setItem("waterThreshold", waterThreshold);
  }, [waterThreshold]);

  useEffect(() => {
    localStorage.setItem("login", isLogin);
  }, [isLogin]);

  const onClickLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <AuthContext.Provider value={isLogin}>
        <AuthDisPathContext.Provider value={{ onClickLogin }}>
          <div className="page_wrapper">
            <Header />
            <WaterThresholdContext.Provider value={waterThreshold}>
              <WaterThresholdDispatchContext.Provider
                value={{ setWaterThreshold }}
              >
                <MQTTProvider>
                  <div className="page_container">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/dashboard"
                        element={isLogin ? <Dashboard /> : <RequireLogin />}
                      />
                      <Route
                        path="/control"
                        element={isLogin ? <Control /> : <RequireLogin />}
                      />
                      <Route path="*" element={<RequireLogin />} />
                    </Routes>
                  </div>
                </MQTTProvider>
              </WaterThresholdDispatchContext.Provider>
            </WaterThresholdContext.Provider>
          </div>
        </AuthDisPathContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
