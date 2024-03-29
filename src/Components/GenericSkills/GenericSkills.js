import React, { useEffect, useState } from "react";
import Sidebar from "../navBar/sidebar";
import Navbar from "../navBar/topBar";
import navCss from "../../css/nav.css";
import homeCss from "../../css/home.css";
import questionsCss from "../../css/questions.css";
import { Card, Button } from "react-bootstrap";
import profileImg from "../../images/2474247.jpg";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { MdSend } from "react-icons/md";
import Stack from "@mui/material/Stack";
import Buttons from "@mui/material/Button";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import "../Profile/Profile.css";
import Skill from "../../Components/Skill";
import { GrLinkNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Rating_info from "../Profile/Rating_info";
import GenericSkillQuestions from "./Questions";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import {useQuery} from 'react-query'
async function fetchData(){
  const {data} = await axios.get(`https://localhost:7074/api/GenericSkills/GetGenericSkillByEmpId?empId=1`)    
  return data
}
function GenericSkills() {
  const {data, error, isError, isLoading } = useQuery('GenericData', fetchData) 
 
  const loggedUsername = localStorage.getItem("User");
  const profileURL = `http://localhost:5032/api/Employee/GetEmployeeByUsername?username=${loggedUsername}`;
  const [profile, setProfile] = useState([]);
  const [editform, setEditform] = useState(false);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const obj={
    "genericId": 0,
    "employeeId": 2,
    "oral_Communication": 0,
    "written_Communication": 0,
    "process_Conformance": 0,
    "presentation_skill": 0,
    "leadership_Skills": 0,
    "management": 0,
    "interpersonal_Skills": 0,
    "takes_Initiative": 0,
    "critical_and_Analytical_Thinking": 0,
    "demonstrate_Teamwork": 0,
    "adaptability_And_Flexibility": 0,
    "customer_Focus": 0,
    "planning_And_Organizing": 0,
    "negotiation_Skills": 0,
    "problem_Solving_Skills": 0,
    "isApproved": false
  }
  // useEffect(()=>{
  //   axios.get(``).then((res))

  // },[])
const [quesKeys,setQuesKeys] = useState(Object.entries(obj));
const apiCall=(obj)=>{
  console.log(obj);
  axios.post(`https://localhost:7074/api/GenericSkills/CreateGenericSkills`,obj)
  .then(res=>console.log(res))
  .catch(err => console.log(err));
}
if(isLoading){
  return <div>Loading...</div>
}
if(isError){
  return <div>Error! {error.message}</div>
}

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 sideNav">
            <Sidebar />
          </div>

          <div className="col-md-7">
            <div>
              <br />
              <div>
                <h1>General Skills</h1>
              </div>{" "}
              <br />
              <div>
                <Card className="questionsCard">
                  <div className="row">
                    <div className="col-md-12">
                      <Card.Body>
                        <Skill questions={GenericSkillQuestions} quesKeys={quesKeys} setQuesKeys={setQuesKeys} data={data}/>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              </div>
              <br />
            </div>
          </div>

          <div className="col-md-1"></div>

          <div className="col-md-3">
          <Rating_info next={"/BasicFoundation"} prev={false} quesKeys={quesKeys} apiCall={apiCall}/>
          </div>
        </div>
      </div>
    </>
  );
}
export default GenericSkills;
