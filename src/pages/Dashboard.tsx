import RequestsChart from "../components/chart/RequestsChart";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  RadialLinearScale,
} from "chart.js";
import { ENDPOINT_METHODS, RequestData } from "../types/types";
import MethodsChart from "../components/chart/MethodsChart";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DashboardFilter,
  resetFilter,
  setData,
  setFilterEndpoint,
  setFilterMethod,
  sortData,
} from "../store/slice/dashboardSlice";
import PerformanceChart from "../components/chart/PerformanceChart";
import ResponseTimeChart from "../components/chart/ResponseTimeChart";
import {
  useFindAllQuery,
  useFindByEndpointQuery,
} from "../store/slice/requestApi";
import { SelectInput } from "../components/input/Input";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

export default function Dashboard() {
  const requestData: RequestData[] = useSelector(
    (store: RootState) => store.dashboardSlice.requestData
  );
  const filter: DashboardFilter = useSelector(
    (store: RootState) => store.dashboardSlice.filter
  );
  const [endpoints, setEndpoints] = useState([""]);
  const dispatch = useDispatch();
  const { data: dataAll, refetch: refetchAll } = useFindAllQuery(undefined);
  const { data: dataFilter, refetch: refetchFilter } = useFindByEndpointQuery({
    endpoint: filter.endpoint,
    method: filter.method,
  });

  useEffect(() => {
    dispatch(sortData());

    if (!filter.endpoint && !filter.method) {
      setEndpoints([...new Set(requestData.map((rd) => rd.endpoint.endpoint))]);
    }
  }, [requestData]);

  const updateRequestData = (updatedData: RequestData[]) => {
    dispatch(setData(updatedData));
  };

  useEffect(() => {
    if (dataAll) updateRequestData(dataAll);
  }, [dataAll]);

  useEffect(() => {
    if (dataFilter) updateRequestData(dataFilter);
  }, [dataFilter]);

  useEffect(() => {
    if (!filter.endpoint && !filter.method) refetchAll();
    else refetchFilter();
  }, [filter]);

  return (
    <Container fluid>
      <h1>Dashboard</h1>

      <Row className="w-100 m-0">
        <Col>
          <Card className="mb-4" style={{ boxShadow: "0 0 10px gray" }}>
            <CardHeader>Filters</CardHeader>
            <CardBody>
              <Row className="w-100 mb-3 align-items-end">
                <Col md={5}>
                  <SelectInput
                    label="Method"
                    value={filter.method}
                    onChange={(e) => dispatch(setFilterMethod(e.target.value))}
                    error={false}
                  >
                    <option value=""></option>
                    {ENDPOINT_METHODS.map((e) => (
                      <option value={e}>{e}</option>
                    ))}
                  </SelectInput>
                </Col>

                <Col md={5}>
                  <SelectInput
                    label="Endpoint"
                    value={filter.endpoint}
                    onChange={(e) =>
                      dispatch(setFilterEndpoint(e.target.value))
                    }
                    error={false}
                  >
                    <option value=""></option>
                    {endpoints.map((e) => (
                      <option value={e}>{e}</option>
                    ))}
                  </SelectInput>
                </Col>

                <Col md={2} className="mb-3">
                  <Button
                    variant="secondary"
                    className="w-100"
                    onClick={() => dispatch(resetFilter())}
                  >
                    Reset Filters
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row
        className="w-100 align-items-stretch m-0"
        style={{ maxHeight: "100%" }}
      >
        <Col md={6} className="mb-4">
          <Card className="h-100" style={{ boxShadow: "0 0 10px gray" }}>
            <CardHeader>Api Requests</CardHeader>
            <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <RequestsChart requestData={requestData} />
            </CardBody>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100" style={{ boxShadow: "0 0 10px gray" }}>
            <CardHeader>Methods</CardHeader>
            <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <MethodsChart requestData={requestData} />
            </CardBody>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100" style={{ boxShadow: "0 0 10px gray" }}>
            <CardHeader>Performance</CardHeader>
            <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <PerformanceChart requestData={requestData} />
            </CardBody>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100" style={{ boxShadow: "0 0 10px gray" }}>
            <CardHeader>Response Time</CardHeader>
            <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <ResponseTimeChart requestData={requestData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
