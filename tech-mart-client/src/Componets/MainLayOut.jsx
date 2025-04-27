import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainLayOut = () => {
    const loaderData = useLoaderData();
    // console.log(loaderData.length);
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;