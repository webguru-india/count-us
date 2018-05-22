import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import config from '../../../global.configs';
import $ from 'jquery';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',

      nameIsTouched: false,
      emailIsTouched: false,
      contactNumberIsTouched: false,
      passwordIsTouched: false,
      confirmPasswordIsTouched: false,

      nameError: true,
      emailError: true,
      contactNumberError: true,
      passwordError: true,
      confirmPasswordError: true,
      isFormValid: false,

      alertVisible: true,      // For Notification Alert
      successErrorAlertMsg: '',
      successOrError: 0,
      registerButtonClicked: false
    }
    this.registerFunction = this.registerFunction.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.showNotificationAlert = this.showNotificationAlert.bind(this);
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
      this.validateRegistrationForm();
    }, 10);
  }

  validateRegistrationForm() {
    let flag = 0;
    this.setState({nameError: false});
    this.setState({emailError: false});
    this.setState({contactNumberError: false});
    this.setState({passwordError: false});
    this.setState({confirmPasswordError: false});

    if(this.state.name == '') {
      this.setState({nameError: true});
      flag = 1;
    }
    if(this.state.email == '' || !(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
      this.setState({emailError: true});
      flag = 1;
    }
    if(this.state.contactNumber == '' || !(/^\d*$/.test(this.state.contactNumber))) {
      this.setState({contactNumberError: true});
      flag = 1;
    }
    if(this.state.password == '' || !(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*\_\-])[a-zA-Z0-9!@#$%^&*\_\-]{8,}$/.test(this.state.password))) {
      this.setState({passwordError: true});
      flag = 1;
    }
    if(this.state.password != this.state.confirmPassword) {
      this.setState({confirmPasswordError: true});
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

  registerFunction(e) {
    e.preventDefault();
    if(!(!this.state.registerButtonClicked)) {
      return false;
    }
    this.setState({
      registerButtonClicked: true,
      nameIsTouched: true,
      emailIsTouched: true,
      contactNumberIsTouched: true,
      passwordIsTouched: true,
      confirmPasswordIsTouched: true
    });

    if(!(!this.validateRegistrationForm(true))) {
      return false;
    }

    let fd = new FormData();
    
    fd.append("name", this.state.name);
    fd.append("email", this.state.email);
    fd.append("contact_number", this.state.contactNumber);
    fd.append("password", this.state.password);
    fd.append("repeat_password", this.state.confirmPassword);

    $.ajax({
      url: config.apiBaseUrl + "registration",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      success: (resp) => {
        console.log(resp);
        this.showNotificationAlert(0, resp.api_message);
        this.setState({
          name: '',
          email: '',
          contactNumber: '',
          password: '',
          confirmPassword: ''
        });
        this.setState({registerButtonClicked: false});
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
        this.props.history.push('/login');
      }, 1000);
    }, 8000);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" lg="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>

                  <Form onSubmit={this.registerFunction}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input className={!(!this.state.nameError) && !(!this.state.nameIsTouched) ? 'invalid' : 'valid'} type="text" placeholder="Name *" name="name" onChange={e => this.handleChange(e)} value={this.state.name} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input className={!(!this.state.emailError) && !(!this.state.emailIsTouched) ? 'invalid' : 'valid'} type="email" placeholder="Email *" name="email" onChange={e => this.handleChange(e)} value={this.state.email} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input className={!(!this.state.contactNumberError) && !(!this.state.contactNumberIsTouched) ? 'invalid' : 'valid'} type="text" placeholder="Contact Number *" name="contactNumber" onChange={e => this.handleChange(e)} value={this.state.contactNumber} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input className={!(!this.state.passwordError) && !(!this.state.passwordIsTouched) ? 'invalid' : 'valid'} type="password" placeholder="Password *" name="password" onChange={e => this.handleChange(e)} value={this.state.password} />
                      <small>(Password must be of minimum 8 characters length and contains atleast 1 number, 1 alphabet and 1 special character.)</small>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input className={!(!this.state.confirmPasswordError) && !(!this.state.confirmPasswordIsTouched) ? 'invalid' : 'valid'} type="password" placeholder="Confirm password *" name="confirmPassword" onChange={e => this.handleChange(e)} value={this.state.confirmPassword} />
                    </InputGroup>

                    <Row>
                      <Col sm="7">
                        {(!this.state.registerButtonClicked) ?
                          <Button color="primary" block type="submit" disabled={!this.state.isFormValid}>
                            Create Account
                          </Button>
                          :
                          <Button color="success" block type="button">
                            <i className="fa fa-spinner fa-spin"></i> Please wait ...
                          </Button>
                        }
                      </Col>
                      <Col sm="5">
                        <Button color="link" block>
                          <Link to={'/login'}>Existing User? Login!{this.state.successOrError == 0}</Link>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
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
      </div>
    );
  }
}

export default Register;
