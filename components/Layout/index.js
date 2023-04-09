import Head from "next/head";
import React, { useState, useEffect } from 'react'
import Header from "../Header";
import Footer from "../Footer";



const Layout = ({ children, title = 'Portfolio', description = '', socials }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <Header />
            <main>
                {children}
            </main>
            <Footer />

        </div>
    );
}

export default Layout;