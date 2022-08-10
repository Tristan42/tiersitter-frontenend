import { useEffect, useState } from "react";
import { List } from "reselect/es/types";
import { Pet } from "../Pets/PetList";
import { User } from "../TiersitterApp";

export default function AddCareRequest(props: { user: User, stateChanger: any }) {

    const [petList, setPetList] = useState<List<Pet>>([]);
    
    const [selectedPet, setSelectedPet] = useState<number>(0);
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    const [postDate, setPostDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>("");


    useEffect(() => {
        const url = 'http://192.168.178.58:8181/api/pet/findByOwner/' + props.user.id;
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setPetList(result);
            }
            )
    }, [])

    return (
        <div className="addCareRequestForm">

            <label htmlFor="pets">Haustier</label>
            <select name="pets" id="pets" value={selectedPet} onChange={(e) => setSelectedPet(e.target.value as unknown as number)}>
                {petList.map(item =>
                    <option value={item.id}>
                        {item.name}
                    </option>)}
            </select> <br />
            <label htmlFor="startDate">StartDate</label>
            <input type="date" name="startDate" id="startDate" onChange={(e) => setStartDate(e.target.value)} /> <br />
            <label htmlFor="endDate">EndDate</label>
            <input type="date" name="endDate" id="endDate" onChange={(e) => setEndDate(e.target.value)} /> <br />
            <label htmlFor="description">Description</label> <br />
            <textarea name="description" id="description" cols={30} rows={10} onChange={(e) => setDescription(e.target.value)}></textarea> <br />
            <button className="addCareRequest" onClick={() => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        pet : {id : selectedPet},
                        postDate: postDate,
                        startDate: startDate,
                        endDate: endDate,
                        active: false,
                        description: description
                    })
                };
                fetch('http://192.168.178.58:8181/api/careRequest', requestOptions)
                console.log(selectedPet)

                props.stateChanger()
            }}>Betreuungsanfrage erstellen</button>
        </div>
    )
}