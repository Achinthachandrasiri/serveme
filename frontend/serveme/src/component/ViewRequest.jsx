import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RequestCss from '../css/Request.css';

function ViewRequest() {
    // Getting profile data
    const { id } = useParams();
    const [profiles, setProfile] = useState([]);

    useEffect(() => {
        async function getReq() {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:10200/projects/request/${id}`);
                    if (Array.isArray(response.data) && response.data.length > 0) {
                        setProfile(response.data);
                    } else {
                        console.log("Empty or non-array response received.");
                    }
                } catch (error) {
                    alert('Error fetching project');
                }
            }
        }
        getReq();
    }, [id]);

    // Deleting project request
    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:10200/projects/request/delete/${id}`);
            setProfile(profiles.filter(profile => profile._id !== id));
            alert("Deleted Request");
        } catch (error) {
            alert('Error deleting project');
        }
    }

    return (
        <div className="mainReqDiv">
            <div className="ReqsubDiv">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Task</th>
                                <th scope="col">Location</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">When</th>
                                <th scope="col">Requirment</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.map((profile, index) => (
                                <tr key={profile._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{profile.task}</td>
                                    <td>{profile.location}</td>
                                    <td>{profile.contact}</td>
                                    <td>{profile.startDate}</td>
                                    <td>{profile.budget}</td>
                                    <td>
                                        <a href={`tel:${profile.contact}`}>
                                            <button className="btn btn-success mr-2" style={{width:"90px", marginRight: "5px", border: "solid 1px #67ba6a ", fontWeight: "bold", background: "#67ba6a" }}>
                                                Call me
                                            </button>
                                        </a>
                                        <button className="btn btn-dark" style={{fontWeight:"bold",width:"90px"}} onClick={() => onDelete(profile._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewRequest;
