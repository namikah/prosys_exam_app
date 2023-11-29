import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { teacherService } from "../../API/services/TeacherService";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './teacher.scss'

function Teacher() {
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selected, setSelected] = useState({});
  const { navigate } = useNavigate();
  const [teacher, setTeacher] = useState({
    name: "",
    surname: "",
  });

  const getData = useCallback(() => {
    teacherService.getData().then((res) => {
      setData(res.data.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
    console.log(teacher);
  };

  const getUpdateElementValues = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
    console.log(selected);
  };

  const handleAddData = useCallback(() => {
    teacherService
      .addData(teacher)
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
  }, [teacher]);

  const handleDeleteData = useCallback(
    (id) => {
      axios
        .post(`https://localhost:7045/api/teacher/delete?id=${id}`)
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
    [teacher]
  );

  const handleUpdateData = useCallback(() => {
    teacherService
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
      .catch((error) => {
        getData();
        error.response.data;
      });
  }, [selected]);

  return (
    <section id="teacher">
      <div className="table p-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Surname</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} onClick={() => {setIsUpdate(true); setSelected(data.find(x=>x.id==item.id))}}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.surname}</td>
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
              name="name"
              id="name"
              placeholder="Name"
              onChange={getElementValues}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="surname"
              id="surname"
              placeholder="Surname"
              onChange={getElementValues}
            />
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
      {isUpdate ?   <Form className="text-center col-3 d-inline-block m-2">
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={getUpdateElementValues}
              value={selected.name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="surname"
              id="surname"
              placeholder="Surname"
              onChange={getUpdateElementValues}
              value={selected.surname}
            />
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
        </Form> : ""}
      </div>
    </section>
  );
}

export default Teacher;
