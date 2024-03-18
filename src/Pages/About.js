import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { NavLink } from "react-router-dom";

const App = () => {
    return (
        <>
            <Header />
            <section className="bg-gray-50">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            We are a coding platform.
                            <p><p></p></p>
                            <strong className="font-extrabold font-mono text-3 text-red-700 sm:block">
                                {" "}
                                Contributors
                                {" "}
                            </strong>
                        </h1>
                        <h2 className="mt-4 sm:text-2xl sm:leading-relaxed">
                            Chinmay - 
                            Keshav -  
                            Priyanshu - 
                            Subrat 
                        </h2>
                        <NavLink exact to="/contact">
                            <h2 className="mt-4 sm:text-base underline text-black sm:leading-relaxed">
                                Contact us
                            </h2>
                        </NavLink>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default App;
