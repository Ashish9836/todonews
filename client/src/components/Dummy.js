import { useLoaderData, useParams } from "react-router-dom";


const Dummy=()=>{
    const data = useLoaderData();
    const prm = useParams();
    console.log(data,"userloader")
    console.log(prm,"userparams")
    return (
        <div>
            <div>Hi, I am a dummy component for testing</div>
        </div>
    )
}
export default Dummy;