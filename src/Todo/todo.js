import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import navCss from "../css/nav.css";
import homeCss from "../css/home.css";
import Sidebar from "../navBar/sidebar";
import Card from "react-bootstrap/Card";
import defaultPost from "../images/defaultPost.svg";
import TopBar from "../navBar/topBar";
import {
  PlusSquare,
  Trash,
  TrashFill,
  PencilSquare,
  CheckSquareFill,
} from "react-bootstrap-icons";

function TodoPage() {
  const [feed, setFeeds] = useState("");
  const [feedsDB, setFeedsDB] = useState([]);
  const [style, setTodoStyle] = useState("todoStyle");
  const [checkedArr,setCheckedArr]=useState([]);

  // console.log("feedsDB Length :", feedsDB.length);

  // var feedBox = document.getElementById("feedBox");
  // const AddFeed = (e) => {
  //   e.preventDefault();
  //   let obj = [...feedsDB];
  //   obj.push(feed);
  //   setFeedsDB(obj);
  //   e.target.reset();
  //   setTodoStyle("todoStyle")
  // };
  // console.log(feedsDB);

  // const deleteTodo = (data) => {
  //   var tempDB = [...feedsDB];

  //   var feeds = tempDB.filter((element, index) => {
  //     if (index != data) return element;
  //   });
  //   setFeedsDB(feeds);
  //   console.log(feedsDB);
  //   setTodoStyle("todoStyle")
  // };

  const changeStyle=(index)=>{
    const temp=[...checkedArr]
    temp.push(index);
    setCheckedArr(temp);
    
  }

 const handleSubmit = (e)=>{
   e.preventDefault();
   let todoData={
     "todoId":0,
     "todoName":feed,
     "userId" :1
   }
   axios.post("http://localhost:5032/api/Todo/AddTodo",todoData)
   .then(res=>{
     const data = res
     console.log(data)
    e.preventDefault();
    let obj = [...feedsDB];
    obj.push(res.data);
    setFeedsDB(obj);
    e.target.reset();
   })
   .catch(err => console.log(err));
 }
 
 useEffect(()=>{
   axios.get("http://localhost:5032/api/Todo").then((response)=>{
     setFeedsDB(response.data)
   })
 },[])
//  console.log(feedsDB)

 const handleDelete = (todoId)=>{
  axios.delete(`http://localhost:5032/api/Todo/DeleteTodo?todoId=${todoId}`).then((response)=>{
    console.log(response)
    // const todoIndex = todoId-1
    // var tempDB = [...feedsDB];
    // var feeds = tempDB.filter((element, index) => {
    //   if (index != todoIndex) return element;
    // });
    var feeds = response.data.data
    setFeedsDB(feeds)
    console.log(feeds)
  })
 }
  

  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 sideNav">
            <Sidebar />
          </div>
          <div className="col-md-11">
            <div className="container" style={{ padding: "20px" }}>
              <h5 style={{ fontWeight: "400" }}>To-Do Tasks</h5>
              <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      className="mb-1"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        onChange={(e) => {
                          setFeeds(e.target.value);
                        }}
                        placeholder="Add Your Tasks here..."
                        as="textarea"
                        rows={3}
                      />
                    </Form.Group>
                    <Button onSubmit={handleSubmit}
                      variant="primary"
                      style={{
                        float: "right",
                        width: "120px",
                        fontSize: "16px",
                      }}
                      type="submit"
                    >
                      <PlusSquare /> Add Todo
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              {feedsDB.length < 1 ? (
                <Card style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Card.Body>
                    <img
                      src={defaultPost}
                      style={{
                        height: "150px",
                        marginBottom: "10px",
                        marginTop: "10px",
                      }}
                    />
                    <br />
                    <p style={{ textAlign: "center" }}>
                      {" "}
                      There are no Tasks here{" "}
                    </p>
                  </Card.Body>
                </Card>
              ) : (
                feedsDB.map((data) => (
                  <Card
                    key={data.todoId}
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  >
                    <Card.Body>
                      <div className="row">
                        <div className="col-md-10">
                          <h4 className={checkedArr.includes(data.todoId)?"todoStyleChecked":style}> {data.todoName} </h4>
                        </div>
                        <div className="col-md-1">
                          <Button
                            style={{ float: "right" }}
                            variant="primary"
                            type="button"
                            onClick={()=>changeStyle(data.todoId)}
                          >
                            <CheckSquareFill/>
                          </Button>
                          </div>
                          <div className="col-md-1">
                          <Button
                            onClick={()=>handleDelete(data.todoId)}
                            variant="danger"
                            type="button"
                          >
                            <TrashFill />
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoPage;
