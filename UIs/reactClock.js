var Button = (props) => (
  <div onClick={() => props.stop()}>Click Me</div>
)

var run;

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {time: '00:00:00'};
  }
  componentDidMount() {
    run = setInterval(() => {
      var time =  new Date();
      this.setState({time: time.toString().slice(15, 24) });
    }, 1000);
  }
  stop() {
    if (this.state.time !== 'stopped') {
      this.setState({time: 'stopped' });
      clearInterval(run);
    } else {
      var time =  new Date();
      this.setState({time: time.toString().slice(15, 24) });
      run = setInterval(() => {
        var time =  new Date();
        this.setState({time: time.toString().slice(15, 24) });
      }, 1000);
    }
  }
  render() {
    return (
      <div >
        {this.state.time}
        <Button stop={this.stop.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById("app"));
