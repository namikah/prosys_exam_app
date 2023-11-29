import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { studentService } from "../../API/services/StudentService";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import { groupService } from "../../API/services/GroupService";

function Student() {
  const [data, setData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selected, setSelected] = useState({});
  const [student, setStudent] = useState({
    number: 0,
    name: "",
    surname: "",
    groupId: 0
  });

  const getData = useCallback(() => {
    studentService.getData().then((res) => {
      setData(res.data.data);
      console.log(res.data);
    });
  }, []);

  const getGroupData = useCallback(() => {
    groupService.getData().then((res) => {
      setGroups(res.data.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
    getGroupData();
  }, [getData,getGroupData]);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    console.log(student);
  };

  const getUpdateElementValues = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
    console.log(selected);
  };

  const handleAddData = useCallback(() => {
    console.log(student)
    studentService
      .addData(student)
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
  }, [student]);

  const handleDeleteData = useCallback(
    (id) => {
      axios
        .post(`https://localhost:7045/api/student/delete?id=${id}`)
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
    [student]
  );

  const handleUpdateData = useCallback(() => {
    studentService
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
    <section id="student">
      <div className="table p-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Number</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Group</th>
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
                }}
              >
                <td>{index + 1}</td>
                <td>{item?.number}</td>
                <td>{item?.name}</td>
                <td>{item?.surname}</td>
                <td>{item?.group?.number}</td>
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
              name="number"
              id="number"
              placeholder="number"
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
              type="text"
              name="surname"
              id="surname"
              placeholder="Surname"
              onChange={getElementValues}
            />
          </FormGroup>
          <FormGroup>
              <Input
                type="select"
                name="groupId"
                id="groupId"
                placeholder="group"
                onChange={getElementValues}
              >
                <option value="">Select a class</option>
                {groups?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.number}
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
                name="number"
                id="number"
                placeholder="number"
                onChange={getUpdateElementValues}
                value={selected?.number}
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
                type="text"
                name="surname"
                id="surname"
                placeholder="Surname"
                onChange={getUpdateElementValues}
                value={selected?.surname}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="select"
                name="groupId"
                id="groupId"
                placeholder="group"
                onChange={getUpdateElementValues}
                value={selected?.groupId}
              >
                <option value="">Select a class</option>
                {groups?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.number}
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

export default Student;
