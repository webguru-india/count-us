import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Form } from 'reactstrap';

class GuestAdvanceLogin extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h2>Provide details</h2>
                  <Form action="" method="post" className="form-horizontal">
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" placeholder="Email *" />
                    </InputGroup>
                    <InputGroup className="mb-1">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-calendar"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="date" placeholder="Event Date" />
                    </InputGroup>
                    <p className="mb-1">OR</p>
                    <InputGroup className="mb-1">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Keyword for the event" />
                    </InputGroup>
                    <p className="mb-1">OR</p>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Location of the event" />
                    </InputGroup>
                    <Button color="primary" block>Search Event</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default GuestAdvanceLogin;
