import { useEffect, useState } from "react"
import { List } from "reselect/es/types";
import { User } from "../TiersitterApp";
import './PetList.css';

export default function PetList(props: { user: User }) {

    const [user, setUser] = useState<User>(props.user);
    const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
    const [petList, setPetList] = useState<List<Pet>>([]);
    const [addPet, setAddPet] = useState<boolean>(false);
    const [petToAdd, setPetToAdd] = useState<Pet>();

    const [name, setName] = useState("");
    const [art, setArt] = useState("");
    const [picture, setPicture] = useState<string>("");
    const [foodPreferences, setFoodPreferences] = useState("");

    useEffect(() => {
        const url = 'http://192.168.178.58:8181/api/pet/findByOwner/' + user.id;
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                setDataIsLoaded(true);
                setPetList(result);
            }
            )
    }, [])

    function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                picture: picture,
                art: art,
                owner: user
            })
        };
        fetch('http://192.168.178.58:8181/api/pet', requestOptions)
        setAddPet(false);
    }

    async function handleFileRead(event: any) {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
    }

    async function convertBase64(file: any) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
                setPicture((fileReader.result) as string);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    let el;

    switch (addPet) {
        case true:
            el =
                <div>
                    <label htmlFor="picture">Foto:</label> <br />
                    <input type="file" name="picture" accept="image/*" id="picture" onChange={(e) => handleFileRead(e)} /> <br />
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                    <label htmlFor="art">Art</label>
                    <input type="text" name="art" id="art" value={art} onChange={(e) => setArt(e.target.value)} /> <br />
                    <button onClick={() => handleSubmit()} className="addPetButton">Tier hinzufügen</button>
                </div>;
            break;
        case false:
            el = (
                <div className="petlist">
                    {petList.map((item) =>
                        <div key={item.id} className="petCard">
                            <img src={item.picture} alt={item.name} className="petPicture" />
                            <p>{item.name}</p>
                        </div>
                    )}
                    <button className="addPet" onClick={() => { setAddPet(!addPet) }}>+</button>
                </div>
            )
            break;
    }

    return (
        <div className="petlistcontainer">
            {el}
        </div>
    )
}

export interface Pet {
    id: number,
    name: string,
    art: string,
    dateOfBirth: Date,
    picture: string,
    foodPreferences: string,
    medication: string,
    owner: User
}