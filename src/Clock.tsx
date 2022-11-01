import { Component } from 'react';

type Props = {
  name: string;
};

type State = {
  today: Date;
};

export class Clock extends Component<Props, State> {
  state: State = {
    today: new Date(),
  };

  timer = 0;

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState({ today: new Date() });

      window.console.info(this.state.today.toUTCString().slice(-12, -4));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { name } = this.props;
    const { today } = this.state;
    const time = today.toUTCString().slice(-12, -4);

    return (
      <div className="clock">
        <strong className="clock__name">
          { name }
        </strong>

        {' time is '}

        <span className="clock__time">
          { time }
        </span>
      </div>
    );
  }
}
