import React, { useState, useEffect } from "react";
import SideBarAndNavBar from "../NavBar/SideBarAndNavBar";
import classes from "./CompareProduct.module.css";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import Popup from "./Popup";

function CompareProducts() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [popUp, setPopUp] = useState(false);
  const [itemData, setitemData] = useState([
    {
      brand: "Brand",
      category: "Category",
      discountPercentage: "Discount Percentage",
      id: -1,
      price: "Price",
      rating: "Rating",
      stock: "Stock",
      title: "Title",
    },
  ]);
  let params = searchParams.get("id");

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products`)
      .then((res) => {
        console.log(res);
        setData(res.data.products);
        console.log(res.data.products[params]);
        setitemData([...itemData, res.data.products[params - 1]]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClickOpen = () => {
    setPopUp(true);
  };

  return (
    <div>
      <SideBarAndNavBar />
      <div className={classes.compare_product}>
        <button
          className={classes.button}
          onClick={() => {
            handleClickOpen();
          }}
        >
          Add Item
        </button>
        <div className={classes.comparison}>
          {itemData?.map((item) => {
            return (
              <ul style={{ listStyleType: "none" }}>
                <li>{item?.title}</li>
                <li>{item?.price}</li>
                <li>{item?.discountPercentage}</li>
                <li>{item?.rating}</li>
                <li>{item?.stock}</li>
                <li>{item?.brand}</li>
                <li>{item?.category}</li>
              </ul>
            );
          })}
        </div>
        {popUp && (
          <Popup
            popUp={popUp}
            setPopUp={setPopUp}
            data={data}
            itemData={itemData}
            setItemData={setitemData}
          />
        )}
      </div>
    </div>
  );
}

export default CompareProducts;
