import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import {
  Container,
  Row,
  Col
} from 'reactstrap';

class QrCodeScanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delay: 300,
      result: 'No result',
    };
    this.handleScan = this.handleScan.bind(this);
  }
  
  handleScan(data){
    if(data){
      this.setState({
        result: data,
      })
    }
  }

  handleError(err){
    console.error(err)
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <div>
              <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%' }}
                />
              <p>{this.state.result}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default QrCodeScanner;
