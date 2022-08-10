import { CareRequest } from "./CareRequests";

export default function AnfragenItem(props: { careRequestProps: CareRequest }) {

    function handleClick() {
        alert("Betreuungsangebot für " + props.careRequestProps.id);
    }

    return (
        <div className="careRequest">
            <div className="petBubble">
                <img src={props.careRequestProps.pet.picture} alt="" />
            </div>
            <div className="careRequestDescription">
                <p>{props.careRequestProps.description}</p>
                <div className="careRequestDetails">
                    <button className="offerCare" onClick={handleClick}>Betreuung anbieten</button>
                    <p>Von {props.careRequestProps.startDate?.toLocaleString as unknown as string}</p>
                    <p>Bis </p>
                </div>

            </div>

        </div>
    )
}