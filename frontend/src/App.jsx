import { useState } from 'react'
import Navbar from "./component/navbar";
import Hero from "./component/hero";
import Footer from "./component/footer";
function App() {
    return (
        <>
            <Navbar />

            <main>
                <Navbar />
                <Hero />
            </main>
            <Footer />
        </>
    );
}

export default App;
