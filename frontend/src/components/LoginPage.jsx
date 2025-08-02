import InputField from "./InputField";
function LoginPage() {
return (
  <div className="login-container">
    <div className="input-field">

    <InputField labelText="Email"/>

    </div>

    <div className="input-field">

      <InputField labelText="Password"/>

    </div>

  </div>
);
} export default LoginPage