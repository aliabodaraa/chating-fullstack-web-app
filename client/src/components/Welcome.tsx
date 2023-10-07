import { Col, ListGroup, Tab, Row } from "react-bootstrap";
import { useState } from "react";
import { useTheme } from "../contexts/ThemesProvider";
const Welcome = () => {
  console.log("Welcome");
  const { theme } = useTheme();
  let [activeKey, setActiveKey] = useState<null | string>("link1");
  return (
    <>
      <div className="container">
        <Tab.Container
          id="list-group-tabs-example"
          defaultActiveKey="link1"
          onSelect={setActiveKey}
          className={`bg-${theme}`}
        >
          <Row>
            <Col sm={2}>
              <ListGroup>
                <ListGroup.Item eventKey="link1" variant={`${theme}`}>
                  Link 1
                </ListGroup.Item>
                <ListGroup.Item eventKey="link2" variant={`${theme}`}>
                  Link 2
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="link1">
                  <ListGroup>
                    <ListGroup.Item variant={`${theme}`} disabled>
                      Cras justo odio
                    </ListGroup.Item>
                    <ListGroup.Item variant={`${theme}`}>
                      Dapibus ac facilisis in
                    </ListGroup.Item>
                    <ListGroup.Item variant={`${theme}`}>
                      Morbi leo risus
                    </ListGroup.Item>
                    <ListGroup.Item variant={`${theme}`}>
                      Porta ac consectetur ac
                    </ListGroup.Item>
                  </ListGroup>
                </Tab.Pane>
                <Tab.Pane eventKey="link2">
                  <ListGroup>
                    <ListGroup.Item variant={`${theme}`}>
                      222222222Cras justo odio
                    </ListGroup.Item>
                    <ListGroup.Item variant={`${theme}`}>
                      Dapibus ac facilisis in
                    </ListGroup.Item>
                    <ListGroup.Item variant={`${theme}`}>
                      Morbi leo risus
                    </ListGroup.Item>
                    <ListGroup.Item variant={`${theme}`}>
                      Porta ac consectetur ac
                    </ListGroup.Item>
                    <ListGroup.Item variant={`${theme}`}>
                      Vestibulum at eros
                    </ListGroup.Item>
                  </ListGroup>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <div className={`container p-4 text-${theme}`}>
          <h3>
            111Quote of the day Don't try to be different. Just be good. To be
            good is different enough. Arthur Freed
          </h3>
        </div>
      </div>
    </>
  );
};

export default Welcome;
