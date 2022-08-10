import React, { useEffect, useState } from "react";
import { List } from "reselect/es/types";
import AnfragenItem from "./CareRequestItem";
import { Pet } from "../Pets/PetList";
import { User } from "../TiersitterApp";
import AddCareRequest from "./AddCareRequest";

import './CareRequests.css';

export default function CareRequests(props: { user: User }) {

    const [careRequests, SetCareRequests] = useState<List<CareRequest>>();
    const [userRegionId, SetUserRegionId] = useState<number>();
    const [user, setUser] = useState<User>(props.user);
    const [addCareRequest, setAddCareRequest] = useState<boolean>(false);

    useEffect(() => {
        const url = 'http://192.168.178.58:8181/api/careRequest/findByRegion/' + user.region?.id;
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                SetCareRequests(result);
            }
            )
    }, [])

    function handleClick(): void {
        setAddCareRequest(!addCareRequest);
    }


    if (addCareRequest)
        return (
            <React.Fragment>
                <div className="careRequests">
                    <AddCareRequest user={user} stateChanger={handleClick} />
                </div>
            </React.Fragment>
        )
    else {
        return (
            <div className="careRequests">
                <button className="addCareRequest" onClick={() => setAddCareRequest(true)}>+</button>
                {careRequests?.map((item) => <AnfragenItem careRequestProps={item} key={item.id}/>)}
            </div>)
    }
}

export interface CareRequest {
    id: number,
    pet: Pet,
    postDate: Date,
    startDate: Date,
    endDate: Date,
    active: boolean,
    description: String
}