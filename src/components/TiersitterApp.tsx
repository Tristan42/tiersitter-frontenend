import { useEffect, useState } from "react";
import CareRequests from "./CareRequests/CareRequests";
import PetList from "./Pets/PetList";
import './TiersitterApp.css';

export default function TiersitterApp() {

    const [route, setRoute] = useState("START");
    const [userID, setUserID] = useState<number>(1);
    const [user, setUser] = useState<User>({ password: "Hallo", userName: "Dirk", id: 1 });

    useEffect(() => {
        if (userID > 0) {
            const url = 'http://192.168.178.58:8181/api/person/' + userID;
            fetch(url)
                .then(res => res.json())
                .then(result => {
                    setUser(result);
                });
        }
    }, [userID])

    let el;
    switch (route) {
        case "START":
            el =
                <div className="start">
                    <input type="number" name="UserID" id="" value={userID} onChange={handleUserIDChange} />
                    <p>Start</p>
                </div>
            break;
        case "ANFRAGEN":
            el =
                <div className="anfragen">
                    <CareRequests user={user} />
                </div>
            break;
        case "MEINE_TIERE":
            el = <div className="meine-tiere">
                <PetList user={user} />
            </div>
            break;
        default:
            el = <div className="error">
                <p>Error in Navigation</p>
            </div>
    }

    function handleUserIDChange(e: any): void {
        setUserID(e.target.value);
    }

    return (
        <div className="tiersitter-app">
            <nav className="sidenav">
                <button onClick={() => { setRoute("START") }}>Start</button>
                <button onClick={() => { setRoute("ANFRAGEN") }}>Betreuungsanfragen</button>
                <button onClick={() => { setRoute("MEINE_TIERE") }}>Meine Tiere</button>
            </nav>
            {el}

        </div>
    )
}

export interface Region {
    id?: number,
    cityName: string
}

export interface User {
    userName: string,
    password: string,
    id: number,
    region?: Region
}