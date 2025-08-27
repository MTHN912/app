import { useEffect, useState } from "react";

function CookieViewer() {
    const [cookies, setCookies] = useState("");

    useEffect(() => {
        setCookies(document.cookie);
    }, []);

    return (
        <div>
        <h3>Cookie hiện tại:</h3>
        <pre>{cookies}</pre>
        </div>
    );
}

export default CookieViewer;
