import InputField from "./InputField";
import ButtonComponent from "./ButtonComponent";
import Divider from "./Divider";  
import { handleGoogleLogin } from "../auth/GoogleAuth.jsx";

function LoginPage() {

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
        
        <div className="space-y-4">
          <div>
            <InputField labelText="Email"/>
          </div>
          <div>
            <InputField labelText="Password"/>
          </div>
          <div className="pt-2 text-center">
            <ButtonComponent labelText="Login"/>
          </div>
          
          <Divider text="or"/>
          
          <div className="text-center">
            <ButtonComponent labelText="Login With Gmail" onClick={handleGoogleLogin}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
