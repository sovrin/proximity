import React from 'react';
import App from 'next/app';
import 'styles/global.css'

/**
 *
 * @param children
 * @constructor
 */
const SafeHydrate = ({children}) => (
    <div suppressHydrationWarning>
        {typeof window === 'undefined' ? null : children}
    </div>
);

class Document extends App {
    render() {
        const {Component, pageProps} = this.props;

        return (
            <SafeHydrate>
                <div className="proximity">
                    <Component {...pageProps} />
                </div>
            </SafeHydrate>
        );
    }
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.02.2021
 * Time: 19:41
 */
export default Document;
