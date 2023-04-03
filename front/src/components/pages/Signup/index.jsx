import { useNavigate } from "react-router-dom";
import logo from "./../../../assets/logo.svg";
import "./login.scss"

function Signup(props) {
  const navigate = useNavigate();

  return (
    <>
    <div className="z-30 sticky top-0">
      <nav className="flex justify-between  sticky top-0 bg-slate-200 content-center font-mun">
      <button
          onClick={() => {
            navigate("/nation/ALL/202203-202302");
          }}
        >
          <img src={logo} className="w-32 h-32 ml-10" />
        </button>
      </nav>
    </div>

    <div class="loginForm">
      <form>
        <div class="segment">
          <h1>싸피물산에 오신 것을 환영합니다.</h1>
        </div>
        
        <label>
          <input type="email" placeholder=" 이메일"/>
        </label>
        <label>
          <input type="password" placeholder=" 비밀번호"/>
        </label>
        <label>
          <input type="password" placeholder=" 비밀번호 확인"/>
        </label>
        <button class="red" type="button"><i class="icon ion-md-lock"></i>가입하기</button>
        <button onClick={() => {
            navigate("/login");
          }} class="red signup" type="button"><i class="icon ion-md-lock"></i>로그인</button>
        
        {/* <div class="segment">
          <button class="unit" type="button"><i class="icon ion-md-arrow-back"></i></button>
          <button class="unit" type="button"><i class="icon ion-md-bookmark"></i></button>
          <button class="unit" type="button"><i class="icon ion-md-settings"></i></button>
        </div>
        
        <div class="input-group">
          <label>
            <input type="text" placeholder="Email Address"/>
          </label>
          <button class="unit" type="button"><i class="icon ion-md-search"></i></button>
        </div> */}
  
      </form>
    </div>
    </>
  );
}

export default Signup;
