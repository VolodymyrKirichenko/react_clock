import { Component } from 'react';
import './App.scss';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface State {
  hasClock: boolean;
  clockName: string;
}

export class App extends Component<{}, State> {
  state: State = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  timerId = 0;

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);
  }

  componentDidUpdate(_: {}, prevState: State) {
    const { clockName, hasClock } = this.state;

    if (clockName !== prevState.clockName && hasClock) {
      window.console.debug(`Renamed from ${prevState.clockName} to ${clockName}`);
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  render() {
    const { clockName, hasClock } = this.state;

    return (
      <div className="app">
        <div className="app__content">
          <h1>React clock</h1>

          {hasClock && <Clock name={clockName} />}
          <button
            className="button"
            type="button"
            onClick={() => {
              this.setState((currentState) => ({
                hasClock: !currentState.hasClock,
              }));
            }}
          >
            Touch me
          </button>
        </div>
      </div>
    );
  }
}
