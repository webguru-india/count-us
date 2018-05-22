import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Tooltip, TabContent, TabPane, Nav, NavItem, NavLink, Form, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import GuestAdvanceLogin from './../GuestAdvanceLogin';
import config from '../../../global.configs';
import $ from 'jquery';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false,      
      activeTab: '1',
      
      email: '',
      password: '',
      
      emailIsTouched: false,
      passwordIsTouched: false,

      emailError: true,
      passwordError: true,
      isFormValid: false,

      alertVisible: true,      // For Notification Alert
      successErrorAlertMsg: '',
      successOrError: 0,
      loginButtonClicked: false,
      
      forgetPasswordModal: false
    }

    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.registerFunction = this.registerFunction.bind(this);
    this.loginFunction = this.loginFunction.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.showNotificationAlert = this.showNotificationAlert.bind(this);
    this.forgetPasswordModalToggle = this.forgetPasswordModalToggle.bind(this);
  }

  forgetPasswordModalToggle() {
    this.setState({
      forgetPasswordModal: !this.state.forgetPasswordModal
    });
  }

  onDismiss() {
    this.setState({ alertVisible: false });
  }

  handleChange(e) {
    this.setState({ 
      [e.target.name] : e.target.value, 
      [e.target.name + "IsTouched"] : true
    });
    
    setTimeout(() => {
      this.validateLoginForm();
    }, 10);
  }

  validateLoginForm() {
    let flag = 0;
    this.setState({emailError: false});
    this.setState({passwordError: false});

    if(this.state.email == '' || !(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
      this.setState({emailError: true});
      flag = 1;
    }
    if(this.state.password == '') {
      this.setState({passwordError: true});
      flag = 1;
    }

    if(flag == 0) {
      this.setState({ isFormValid: true });
      return false;
    }
    else {
      this.setState({ isFormValid: false });
      return true;
    }
  }

  loginFunction(e) {
    e.preventDefault();
    if(!(!this.state.loginButtonClicked)) {
      return false;
    }
    this.setState({
      loginButtonClicked: true,
      emailIsTouched: true,
      passwordIsTouched: true
    });

    if(!(!this.validateLoginForm(true))) {
      return false;
    }

    let fd = new FormData();
    
    fd.append("email", this.state.email);
    fd.append("password", this.state.password);

    $.ajax({
      url: config.apiBaseUrl + "organiser_login",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      success: (resp) => {
        console.log(resp);
        this.showNotificationAlert(0, resp.api_message);
        this.setState({
          email: '',
          password: ''
        });
        this.setState({
          loginButtonClicked: false,
          isFormValid: false
        });
      }
    })
  }

  showNotificationAlert(messageType, message) {
    this.setState({ successOrError : messageType == 0 ? 1 : 2 });
    this.setState({ successErrorAlertMsg : message });
    console.log(this.state.successOrError)
    setTimeout(() => {
      this.setState({ successOrError : 0 });
      setTimeout(() => {
        this.setState({ successErrorAlertMsg : '' });
        // this.props.history.push('/dashboard');
      }, 1000);
    }, 5000);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  registerFunction = () => {
    this.props.history.push("/register");
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center login-page pt-3">
        <Container>
          <Row className="justify-content-center">
            <Col lg="3" md="4" xs="6" className="mb-3">
              <img src="assets/img/logo.png" className="img-responsive" alt="" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg="8" md="10" sm="12">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h2>Organiser Login</h2>
                    <p className="text-muted">Sign In to your account</p>

                    <Form onSubmit={this.loginFunction}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-envelope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input className={!(!this.state.emailError) && !(!this.state.emailIsTouched) ? 'invalid' : 'valid'} type="email" placeholder="Email" name="email" onChange={e => this.handleChange(e)} value={this.state.email} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input className={!(!this.state.passwordError) && !(!this.state.passwordIsTouched) ? 'invalid' : 'valid'} type="password" placeholder="Password" name="password" onChange={e => this.handleChange(e)} value={this.state.password} />
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          {(!this.state.registerButtonClicked) ?
                            <Button color="primary" type="submit" className="px-4" block disabled={!this.state.isFormValid}>Login</Button>
                            :
                            <Button color="success" block type="button">
                              <i className="fa fa-spinner fa-spin"></i> Please wait ...
                            </Button>
                          }
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <Button color="link" type="button" className="px-0" onClick={this.registerFunction}>Register Now!</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" type="button" className="px-0" onClick={this.forgetPasswordModalToggle}>Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-4">
                  <CardBody className="text-center">
                    <h2>Guest Section</h2>
                    <p>Please enter the below informations</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-calendar"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Event ID" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-envelope"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="enail" placeholder="Email" />
                    </InputGroup>
                    <Row>
                      <Col xs="12">
                        <Button color="light" className="px-4" block onClick={this.loginFunction}>Get your QR code</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        {/* <p className="text-muted mt-2"><small><i className="icon-info"></i> For Event ID please contact Event Organiser.</small></p> */}
                        <p className="text-muted mt-2">Don't remember <i id="GuestEventIdTooltip"><u>Event ID</u></i>? <Link to={'/guest-advance-login'} className="text-unmuted"><u>Let's help</u></Link></p>
                        <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="GuestEventIdTooltip" toggle={this.toggle}>For Event ID please contact Event Organiser.</Tooltip>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg="8" md="10" sm="12" className="mt-5 mb-5">
              <h2 className="text-center">How It Works</h2>

              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggleTab('1'); }}
                  >
                    Organiser
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggleTab('2'); }}
                  >
                    Guest
                  </NavLink>
                </NavItem>
              </Nav>
              
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <img src="assets/img/how-it-works-organiser.png" className="img-responsive" alt="" />
                </TabPane>
                <TabPane tabId="2">
                  <img src="assets/img/how-it-works-guest.png" className="img-responsive" alt="" />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
          
          <Row>
            <Col md="6">
              <Alert className={this.state.successOrError == 0 ? 'success-error-alert' : 'show-notification success-error-alert'} color={this.state.successOrError == 1 ? 'success' : 'error'} isOpen={this.state.alertVisible} toggle={this.onDismiss}>
                {this.state.successErrorAlertMsg}
              </Alert>
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.forgetPasswordModal} toggle={this.forgetPasswordModalToggle} className={this.props.className}>
          <ModalHeader toggle={this.forgetPasswordModalToggle}>Forget Password</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="">

              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.forgetPasswordModalToggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.forgetPasswordModalToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Login;
