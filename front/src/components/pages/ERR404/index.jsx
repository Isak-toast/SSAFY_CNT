import { useNavigate } from "react-router-dom";
import logo from "./../../../assets/logo.svg";
import "./err404.scss";

function err404() {
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
        <div className="content-center flex items-center m-10">
          <div>
              <button onClick={() => {
              navigate("/login")
            }}>  로그인</button> 
          </div>
        </div>
      </nav>
    </div>

    <div class="alert animation--boom">
        <p> <span class="alert__icon">i</span> 아직 그런 페이지는 없어요 ㅠㅅㅠ </p>
    </div>

    <div class="alert alert--inverted animation--shake">
        <p> <span class="alert__icon">i</span> 무슨 색이 더 나은가요 </p>
    </div>
    </>
  );
}

export default err404;
