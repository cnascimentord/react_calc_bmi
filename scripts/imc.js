var BMIBox = React.createClass({
  render: function() {
    let style = {
      marginTop: 0,
      marginBottom: '20px'
    }
    return (
      <div className="bmi-box">
        <div className="ribbon"><span>NEW</span></div>
        <header className="text-center">
          <img src="./img/centimeter.svg"/>
          <h3 style={style}>BMI CALCULATOR</h3>
        </header>
        <BodyForm />
      </div>
    );
  }
});

var DisplayBMI = React.createClass({
  render: function() {
    let showAlert;
    if (this.props.result !== '' ) {
      showAlert = <div className="displayBMI text-center">
                    <div className="alert alert-info">{this.props.result}</div>
                  </div>
    }
    return (
      showAlert || null
    )
  }
});

var BodyForm = React.createClass({
  getInitialState() {
    return {
      displayBMI: ''
    }
  },

  updateDisplayBMI: function() {
    let myWeight = this.refs.myWeight.value,
        myHeight = this.refs.myHeight.value,
        myGender = this.refs.myGender.value;
    this.setState({
      displayBMI: this.doCalc(myWeight, myHeight, myGender)
    })
  },

  resetDisplayBMI: function() {
    this.setState({
      displayBMI: ''
    });
    this.refs.myWeight.value = '';
    this.refs.myHeight.value = '';
    this.refs.myGender.value = '0';
  },

  doCalc: function(myWeight, myHeight, myGender) {
    if(myWeight > 0 && myHeight > 0) {
      var finalBmi = myWeight/(myHeight/100*myHeight/100)
      if(finalBmi < 18.5) {
        return "That you are too thin."
      }
      if(finalBmi > 18.5 && finalBmi < 25) {
        return "That you are healthy."
      }
      if(finalBmi > 25) {
        return "That you have overweight."
      }
    } else {
      return "Please Fill in everything correctly"
    }
  },

  render: function() {
    return (
      <div>
        <DisplayBMI result={this.state.displayBMI} />
        <div className="bodyForm">
          <div className="form-group">
            <div className="input-group">
              <input type="text" ref="myWeight" placeholder="Your weight in kg. Ex: 68" className="form-control"/>
              <span className="input-group-addon">kg</span>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <input type="text" ref="myHeight" placeholder="Yout height in cm. Ex: 160" className="form-control"/>
              <span className="input-group-addon">cm</span>
            </div>
          </div>
          <div className="form-group">
            <select className="form-control" ref="myGender">
              <option value="0">Select your gender</option>
              <option value="M">Man</option>
              <option value="W">Woman</option>
            </select>
          </div>
          <div className="pull-right">
            <button type="button" className="btn btn-link" onClick={this.resetDisplayBMI}>reset</button>
            <button type="submit" className="btn btn-primary" onClick={this.updateDisplayBMI}>Calculate</button>
          </div>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <BMIBox />,
  document.querySelector('.container')
);
