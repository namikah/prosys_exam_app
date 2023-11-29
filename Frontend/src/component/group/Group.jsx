import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Table } from "react-bootstrap";
import { groupService } from "../../API/services/GroupService";
import axios from "axios";

function Group() {
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selected, setSelected] = useState({});
  const [group, setGroup] = useState({
    number: 0,
  });

  const getData = useCallback(() => {
    groupService.getData().then((res) => {
      setData(res.data.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
    console.log(group);
  };

  const getUpdateElementValues = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
    console.log(selected);
  };

  const handleAddData = useCallback(() => {
    groupService
      .addData(group)
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
  }, [group]);

  const handleDeleteData = useCallback(
    (id) => {
      axios
        .post(`https://localhost:7045/api/group/delete?id=${id}`)
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
    [group]
  );

  const handleUpdateData = useCallback(() => {
    groupService
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
    <section id="group">
      <div className="table p-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Number</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr  key={index}
              onClick={() => {
                setIsUpdate(true);
                setSelected(data.find((x) => x.id == item.id));
              }}>
                <td>{index + 1}</td>
                <td>{item?.number}</td>
                <td>
                  {item?.students?.map((item, index) => (
                    <span key={index}>{item?.name},</span>
                  ))}
                </td>
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

export default Group;
