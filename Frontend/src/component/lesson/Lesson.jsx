import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { lessonService } from "../../API/services/LessonService";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { teacherService } from "../../API/services/TeacherService";

function Lesson() {
  const [data, setData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selected, setSelected] = useState({});
  const [lesson, setLesson] = useState({
    code: "",
    name: "",
    teacherId: 0,
  });

  const getData = useCallback(() => {
    lessonService.getData().then((res) => {
      setData(res.data.data);
      console.log(res.data);
    });
  }, []);

  const getTeachersData = useCallback(() => {
    teacherService.getData().then((res) => {
      setTeachers(res.data.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
    getTeachersData();
  }, [getData,getTeachersData]);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
    console.log(lesson);
  };

  const getUpdateElementValues = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
    console.log(selected);
  };

  const handleAddData = useCallback(() => {
    console.log(lesson)
    lessonService
      .addData(lesson)
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
  }, [lesson]);

  const handleDeleteData = useCallback(
    (id) => {
      axios
        .post(`https://localhost:7045/api/lesson/delete?id=${id}`)
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
    [lesson]
  );

  const handleUpdateData = useCallback(() => {
    lessonService
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
    <section id="lesson">
      <div className="table p-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Name</th>
              <th>Teacher</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr 
              key={index}
              onClick={() => {
                setIsUpdate(true);
                setSelected(data.find((x) => x.id == item.id));
              }}>
                <td>{index + 1}</td>
                <td>{item?.code}</td>
                <td>{item?.name}</td>
                <td>{`${item?.teacher?.name} ${item?.teacher?.surname}`}</td>
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
              type="text"
              name="code"
              id="code"
              placeholder="code"
              onChange={getElementValues}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={getElementValues}
            />
          </FormGroup>
          <FormGroup>
              <Input
                type="select"
                name="teacherId"
                id="teacherId"
                placeholder="teacher"
                onChange={getElementValues}
              >
                <option value="">Select teacher</option>
                {teachers?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {`${item.name} ${item.surname}`}
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
                type="text"
                name="code"
                id="code"
                placeholder="code"
                onChange={getUpdateElementValues}
                value={selected?.code}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={getUpdateElementValues}
                value={selected?.name}
              />
            </FormGroup>
            <FormGroup>
            <Input
                type="select"
                name="teacherId"
                id="teacherId"
                placeholder="teacher"
                onChange={getElementValues}
                value={selected?.teacherId}
              >
                <option value="">Select teacher</option>
                {teachers?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {`${item.name} ${item.surname}`}
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

export default Lesson;
