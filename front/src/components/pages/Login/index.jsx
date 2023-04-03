import React, { useState } from "react";

import "./login.scss"

function Login(props) {

  return (
    <>
    <div class="loginForm">

      <form>
  
        <div class="segment">
          <h1>싸피물산</h1>
        </div>
        
        <label>
          <input type="email" placeholder="이메일"/>
        </label>
        <label>
          <input type="password" placeholder="비밀번호"/>
        </label>
        <button class="red" type="button"><i class="icon ion-md-lock"></i>로그인</button>
        <button class="red signup" type="button"><i class="icon ion-md-lock"></i>회원 가입</button>

        
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

export default Login;
