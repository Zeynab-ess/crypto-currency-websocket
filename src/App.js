import React, { useState, useEffect, useCallback } from "react";
import {
  Col,
  Container,
  Image,
  Row,
  Stack,
  Table,
  Spinner,
} from "react-bootstrap";
import "./scss/app.scss";
import useWebSocket from "react-use-websocket";
import Pagination from "./components/utils/pagination";
import RadioButton from "./components/utils/radio-button";
import MainNavbar from "./components/navbar";
import useMarket from "./context/marketContext";
import Toolbars from "./components/toolbars";
import Search from "./components/search";

const socketUrl = "wss://api.bgcrypto.io/v1/public/markets";

const App = ({}) => {
  const { coins, addAll } = useMarket();
  const [currentList, setCurrentList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageConfigs, setPageConfigs] = useState({
    Skip: 0,
    Take: 10,
    CurrentPage: 1,
    Filter: "",
  });

  const { lastJsonMessage, lastMessage } = useWebSocket(socketUrl);

  const addCoins = async () => {
    await addAll(lastJsonMessage.data);
    currentData();
  };

  useEffect(() => {
    if (lastMessage) addCoins();
  }, [lastMessage]);

  useEffect(() => {
    currentData();
  }, [pageConfigs.CurrentPage]);

  useEffect(() => {
    if (currentList.length !== 0) {
      setLoading(false);
    } else {
      pageConfigs.Filter !== "" ? setLoading(false) : setLoading(true);
    }
  }, [currentList]);

  const currentData = () => {
    const start = (pageConfigs.CurrentPage - 1) * pageConfigs.Take;
    const end = start + pageConfigs.Take;
    let newList = [...coins];

    if (pageConfigs.Filter !== "")
      newList = newList.filter(([key]) => key.includes(pageConfigs.Filter));

    setTotalCount(newList.length);
    setCurrentList(newList.slice(start, end));
  };

  const onMove = useCallback((e, pageNum, skip) => {
    setPageConfigs({ ...pageConfigs, CurrentPage: pageNum, Skip: skip });
  }, []);

  const handleSearch = useCallback((e) => {
    setPageConfigs({
      ...pageConfigs,
      Skip: 0,
      CurrentPage: 1,
      Filter: e.target.value.toLowerCase(),
    });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={6} md={10}>
          <MainNavbar />
        </Col>
        <Col xs={6} md={2} className="text-end">
          <Search value={pageConfigs.filter} onChange={handleSearch} />
        </Col>
      </Row>
      <Toolbars />
      <Row>
        <Col>
          <h1 className="fs-5 fw-bolder text-light">BG Market Watch</h1>
          <p className="fs-6 text-light-emphasis">
            Find promising coins and great apportunities
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table borderless responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Market</th>
                <th>24 baseVolume</th>
                <th>qouteVolume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center align-middle"
                    height="400"
                  >
                    <Spinner animation="border" variant="secondary" />
                  </td>
                </tr>
              ) : currentList.length !== 0 ? (
                currentList.map(([key, value], index) => {
                  const { percentage, baseVolume, quoteVolume, info } = value;
                  const coinName = key.toUpperCase();
                  return (
                    <tr key={index}>
                      <td>
                        <i className="fa fa-star me-2" aria-hidden="true"></i>
                        <Image
                          src={`https://api.bgcrypto.io/logo/${coinName}.png`}
                          width="20"
                          roundedCircle
                          className="me-2"
                        />
                        {coinName}
                      </td>
                      <td>{info.lastPrice}</td>
                      <td>{percentage}%</td>
                      <td>
                        <Image
                          src="./images/chart.png"
                          className=""
                          width={100}
                        />
                      </td>
                      <td>{baseVolume}</td>
                      <td>{quoteVolume}</td>
                      <td className="text-success fw-bold">Trade</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center align-middle"
                    height="400"
                  >
                    <h3>Coins Not Founded!</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Pagination
            onClick={onMove}
            count={totalCount}
            take={pageConfigs.Take}
            currentPage={pageConfigs.CurrentPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
