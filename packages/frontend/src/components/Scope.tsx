import {useRouter, useLocation, Router} from 'wouter';

/**
 *
 * @param children
 * @param base
 * @constructor
 */
const Scope = ({children, base}) => {
    const router = useRouter();
    const [parentLocation] = useLocation();

    const nested = `${router.base}${base}`;

    if (!parentLocation.startsWith(nested)) {
        return null;
    }

    return (
        <Router
            base={nested}
            key={nested}
        >
            {children}
        </Router>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 11.04.2021
 * Time: 13:56
 */
export default Scope;
