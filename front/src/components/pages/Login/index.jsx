import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "./../../../assets/logo.svg";
import "./login.scss"

function Login(props) {
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
          <h1>ONE & ONLY NO IN JUNG.</h1>
        </div>
        
        <label>
          <input type="email" placeholder=" 이메일"/>
        </label>
        <label>
          <input type="password" placeholder=" 비밀번호"/>
        </label>
        <button onClick={() => {
            navigate("/err404");
          }} class="red" type="button"><i class="icon ion-md-lock"></i>로그인</button>
        <button onClick={() => {
            navigate("/signup");
          }} class="red signup" type="button"><i class="icon ion-md-lock"></i>회원 가입</button>
      </form>
    </div>
    </>
  );
}

export default Login;
