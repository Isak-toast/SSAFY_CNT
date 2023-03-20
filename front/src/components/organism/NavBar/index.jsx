import logo from "./../../../../public/assets/logo.svg";
import excel from "./../../../../public/assets/excel.svg";
import pdf from "./../../../../public/assets/pdf.svg";
import NationOrItem from "../../molecules/navBar/NationOrItem";
import NationSelector from "../../molecules/navBar/NationSelector";
import ViewPeriod from "../../molecules/navBar/ViewPeriod";

function NavBar() {
  return (
    <>
      <nav className="flex justify-between space-x-5 sticky top-0 border-8 border-rose-400">
        <img src={logo} />
        <div className="content-center">
          <NationOrItem />
        </div>

        <div>
          <NationSelector />
        </div>

        <div>
          <ViewPeriod />
        </div>

        <div className="">
          <img src={pdf} />
          <img src={excel} />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
