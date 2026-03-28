import { useState } from "react";

const translations = {
  en: {
    navtitle:"Crisis Awareness",
    title: "ACT.AWARE.EMPOWER",
    login: "Log in to explore crises happening around you",
    signup: "Create an account to stay informed and safe",
    email: "Enter your email",
    password: "Enter your password",
    name: "Enter your name",
    loginBtn: "Log in",
    signupBtn: "Sign up",
    toggle1: "Don't have an account?",
    toggle2: "Already have an account?",
    create: "Create one",
    loginText: "Log in",

    howTitle: "How This Platform Works",
    step1Title: "Get Started Securely",
    step1Desc:
      "Sign in to your account or create one to begin exploring the platform.",
    step2Title: "Discover Nearby Crises",
    step2Desc:
      "Your location is detected or entered manually to view crises in your area.",
    step3Title: "Share Your Experience",
    step3Desc:
      "Provide feedback after viewing crisis details to improve the platform.",

    emergencyTitle: "Emergency Resources",
    emergencyDesc:
      "Quick access to important emergency contacts and safety guidelines.",
  },

  hi: {
    navtitle: "संकट जागरूकता",
    title: "कार्य करें। जागरूक बनें। सशक्त बनें।",
    login: "अपने आसपास हो रहे संकटों को देखने के लिए लॉगिन करें",
    signup: "सुरक्षित रहने के लिए खाता बनाएं",
    email: "अपना ईमेल दर्ज करें",
    password: "पासवर्ड दर्ज करें",
    name: "अपना नाम दर्ज करें",
    loginBtn: "लॉगिन",
    signupBtn: "साइन अप",
    toggle1: "क्या आपके पास खाता नहीं है?",
    toggle2: "क्या आपके पास खाता है?",
    create: "खाता बनाएं",
    loginText: "लॉगिन",

    howTitle: "यह प्लेटफॉर्म कैसे काम करता है",
    step1Title: "शुरुआत करें",
    step1Desc: "लॉगिन करें या खाता बनाकर शुरू करें",
    step2Title: "संकट खोजें",
    step2Desc: "अपनी लोकेशन से आसपास के संकट देखें",
    step3Title: "प्रतिक्रिया दें",
    step3Desc: "संकट देखने के बाद प्रतिक्रिया दें",

    emergencyTitle: "आपातकालीन संसाधन",
    emergencyDesc: "महत्वपूर्ण आपातकालीन संपर्क और दिशानिर्देश",
  },
};

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [lang, setLang] = useState("en");

  const t = translations[lang];

  const handleSubmit = () => {
    if (email && password) {
      setUser({ email });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-200 via-white to-orange-200">

      <nav className="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md shadow-sm">
        <h1 className="font-semibold text-gray-800">{t.navtitle}</h1>

        <div className="flex items-center gap-4">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>

          <button className="text-sm">{t.loginText}</button>
          <button className="bg-black text-white px-3 py-1 rounded-md text-sm">
            {t.signupBtn}
          </button>
        </div>
      </nav>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl p-10 w-full max-w-lg min-h-[500px]">

          <h2 className="text-4xl font-bold mb-3">{t.title}</h2>

          <p className="text-gray-600 mb-6 text-lg">
            {isSignup ? t.signup : t.login}
          </p>

          <div className="space-y-4">
            {isSignup && (
              <input className="border p-3 w-full rounded-lg" placeholder={t.name} />
            )}

            <input
              className="border p-3 w-full rounded-lg"
              placeholder={t.email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="border p-3 w-full rounded-lg"
              placeholder={t.password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-black text-white w-full py-3 rounded-lg"
            >
              {isSignup ? t.signupBtn : t.loginBtn}
            </button>
          </div>

          <p className="text-sm mt-4 text-center">
            {isSignup ? t.toggle2 : t.toggle1}
            <span
              className="text-blue-600 cursor-pointer ml-1"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? t.loginText : t.create}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-10">
          {t.howTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6 shadow rounded-xl">
            <h3 className="font-semibold text-lg">{t.step1Title}</h3>
            <p className="text-gray-600">{t.step1Desc}</p>
          </div>

          <div className="p-6 shadow rounded-xl">
            <h3 className="font-semibold text-lg">{t.step2Title}</h3>
            <p className="text-gray-600">{t.step2Desc}</p>
          </div>

          <div className="p-6 shadow rounded-xl">
            <h3 className="font-semibold text-lg">{t.step3Title}</h3>
            <p className="text-gray-600">{t.step3Desc}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          {t.emergencyTitle}
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto">
          {t.emergencyDesc}
        </p>

        <div className="mt-6 flex justify-center gap-6">
          <div className="bg-white p-4 rounded shadow">🚑 Ambulance: 102</div>
          <div className="bg-white p-4 rounded shadow">🚒 Fire: 101</div>
          <div className="bg-white p-4 rounded shadow">👮 Police: 100</div>
        </div>
      </div>

      <footer className="bg-blue-600 text-white text-center py-4">
        © 2026 Crisis Awareness Platform
      </footer>
    </div>
  );
}

export default Login;