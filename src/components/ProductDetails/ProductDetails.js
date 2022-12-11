import React, { useEffect, useState } from "react";
import SideBarAndNavBar from "../NavBar/SideBarAndNavBar";
import { Table } from "antd";
import axios from "axios";
import classes from "./ProductDetails.module.css";
import { useNavigate } from 'react-router-dom';

function ProductDetails() {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      render: (discountPercentage) => {
        return <>{discountPercentage} %</>;
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      render: (thumbnail) => {
        return (
          <img
            style={{ width: "150px" }}
            className={classes.thumbnail}
            src={thumbnail}
            alt=''
          ></img>
        );
      },
    },
    {
      title: "Compare",
      dataIndex: "id",
      render: (id) => {
        return <button className={classes.button} onClick={() => {navigate(`/compare-product?id=${id}`)}}>Compare Product</button>;
      },
    },
  ];

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products`)
      .then((res) => {
        console.log(res);
        setData(res.data.products);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  return (
    <div>
      <SideBarAndNavBar />
      <div className={classes.product_details}>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
