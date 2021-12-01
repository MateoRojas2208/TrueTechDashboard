import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
// import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const Dashboard = () => {
  const [productData, setproductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3030/api/product")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setproductData(response);
        console.log(productData.countByCategory);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost:3030/api/user")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setUserData(response);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost:3030/api/category/productsxCategory")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setCategoryData(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad De Productos</p>
              <h3 className={classes.cardTitle}>
                {productData.count} <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} />
                  10% Incremento en el ultimo mes.
                </span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad de Usuarios</p>
              <h3 className={classes.cardTitle}>{userData.count}</h3>
            </CardHeader>
            <CardFooter stats>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} />
                  20% Incremento en el ultimo mes.
                </span>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Cantidad De Categorias</p>
              <h3 className={classes.cardTitle}>{categoryData.count}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ArrowUpward className={classes.upArrowCardCategory} />
                0% Incremento en el ultimo mes.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Ventas Diarias</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                Incremento en el ultimo mes.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> actualizado hace 4 minutos
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                Usuarios registrados por mes
              </h4>
              <p className={classes.cardCategory}>En el ultimo año</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> actualizado hace 6 dias
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Productos Visitados</h4>
              <p className={classes.cardCategory}>En el ultimo mes</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> actualizado hace 6 dias
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={[0, 1]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                Cantidad de Productos por Categoria
              </h4>
              <p className={classes.cardCategoryWhite}>
                Actualizado hace 8 Horas
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Puesto", "categoria", "Cantidad de Productos"]}
                tableData={categoryData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
export default Dashboard;
