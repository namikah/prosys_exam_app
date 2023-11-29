import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { examService } from "../../API/services/ExamService";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { studentService } from "../../API/services/StudentService";
import { lessonService } from "../../API/services/LessonService";
import axios from "axios";

function Exam() {
  const [data, setData] = useState([]);
  const [lessons, setlessons] = useState([]);
  const [students, setStudents] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selected, setSelected] = useState({});
  const [exam, setExam] = useState({
    date: "",
    score: "",
    lessonId: 0,
    studentId: 0
  });
  
  const getData = useCallback(() => {
    examService.getData().then((res) => {
      setData(res.data.data);
      console.log(res.data);
    });
  }, []);

  const getStudentsData = useCallback(() => {
    studentService.getData().then((res) => {
      setStudents(res.data.data);
      console.log(res.data);
    });
  }, []);

  const getLessonsData = useCallback(() => {
    lessonService.getData().then((res) => {
      setlessons(res.data.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
    getStudentsData();
    getLessonsData();
  }, [getData,getStudentsData,getLessonsData]);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
    console.log(exam);
  };

  const getUpdateElementValues = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
    console.log(selected);
  };

  const handleAddData = useCallback(() => {
    console.log(exam)
    examService
      .addData(exam)
      .then((res) => {
        if (res.status === 200) {
          getData();
          console.log(res.data);
        } else {
          getData();
          console.log(res.data);
        }
      })
      .catch((error) => {
        getData();
        error.response.data;
      });
  }, [exam]);

  const handleDeleteData = useCallback(
    (id) => {
      axios
        .post(`https://localhost:7045/api/exam/delete?id=${id}`)
        .then((res) => {
          if (res.status === 200) {
            getData();
            console.log(res.data);
          } else {
            getData();
            console.log(res.data);
          }
        })
        .catch((error) => {
          getData();
          console.log(error.response.data);
        });
    },
    [exam]
  );

  const handleUpdateData = useCallback(() => {
    examService
      .updateData(selected)
      .then((res) => {
        if (res.status === 200) {
          getData();
          console.log(res.data);
        } else {
          getData();
          console.log(res.data);
        }
      })
      .catch(() => {
        getData();
      });
  }, [selected]);

  return (
    <section id="exam">
      <div className="table p-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Score</th>
              <th>Student</th>
              <th>Class</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr   key={index}
              onClick={() => {
                setIsUpdate(true);
                setSelected(data.find((x) => x.id == item.id));
                console.log(selected)
              }}>
                <td>{index + 1}</td>
                <td>{item?.date}</td>
                <td>{item?.score}</td>
                <td>{`${item?.student?.name} ${item?.student?.surname}`}</td>
                <td>{item?.lesson?.name}</td>
                <td className="text-center">
                  <div
                    className="delete-teacher"
                    data-id={item.id}
                    onClick={(e) => {
                      handleDeleteData(e.target.getAttribute("data-id"));
                    }}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Form className="text-center col-3 d-inline-block m-2">
          <FormGroup>
            <Input
              type="date"
              name="date"
              id="date"
              placeholder="date"
              onChange={getElementValues}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              name="score"
              id="score"
              placeholder="score"
              onChange={getElementValues}
            />
          </FormGroup>
          <FormGroup>
              <Input
                type="select"
                name="studentId"
                id="studentId"
                placeholder="student"
                onChange={getElementValues}
              >
                <option value="">Select student</option>
                {students?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {`${item.name} ${item.surname}`}
                  </option>
                ))}
              </Input>
              <Input
                type="select"
                name="lessonId"
                id="lessonId"
                placeholder="lesson"
                onChange={getElementValues}
              >
                <option value="">Select lesson</option>
                {lessons?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {`${item.name}`}
                  </option>
                ))}
              </Input>
            </FormGroup>
          <Button
            className="btn"
            id="animate.css"
            onClick={() => {
              handleAddData();
            }}
            color="light"
          >
            Add
          </Button>
        </Form>
        {isUpdate ? (
          <Form className="text-center col-3 d-inline-block m-2">
             <FormGroup>
            <Input
              type="date"
              name="date"
              id="date"
              placeholder="date"
              onChange={getUpdateElementValues}
              value={selected?.date}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              name="score"
              id="score"
              placeholder="score"
              onChange={getUpdateElementValues}
              value={selected?.score}
            />
          </FormGroup>
          <FormGroup>
              <Input
                type="select"
                name="studentId"
                id="studentId"
                placeholder="student"
                onChange={getUpdateElementValues}
              value={selected?.studentId}
              >
                <option value="">Select student</option>
                {students?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {`${item.name} ${item.surname}`}
                  </option>
                ))}
              </Input>
              <Input
                type="select"
                name="lessonId"
                id="lessonId"
                placeholder="lesson"
                onChange={getUpdateElementValues}
              value={selected?.lessonId}
              >
                <option value="">Select lesson</option>
                {lessons?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {`${item.name}`}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button
              className="btn"
              id="animate.css"
              onClick={() => {
                handleUpdateData();
              }}
              color="light"
            >
              Update
            </Button>
          </Form>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Exam;
