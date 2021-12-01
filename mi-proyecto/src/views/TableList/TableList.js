import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

const TableList = () => {
  const [productData, setproductData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3030/api/productArray")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setproductData(response);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost:3030/api/userArray")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setUserData(response);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Tabla de Productos</h4>
            <p className={classes.cardCategoryWhite}>
              Muestra todos los productos que hay en la base de datos
              actualmente
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["", "Nombre", "Precio"]}
              tableData={productData}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Tabla de Usuarios</h4>
            <p className={classes.cardCategoryWhite}>
              Muestra todos los Usuarios que hay registrados en la base de datos
              actualmente
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["", "Nombre", "Nombre de Usuario"]}
              tableData={userData}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
export default TableList;
