import { Component } from 'react';
import './App.scss';
import {
  Button,
  Paper,
  Box,
} from '@mui/material';
import { Clock } from './Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface State {
  isClockVisible: boolean;
  clockName: string;
}

export class App extends Component<{}, State> {
  state: State = {
    isClockVisible: true,
    clockName: 'Clock-0',
  };

  timerId = 0;

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);
  }

  componentDidUpdate(_: {}, prevState: State) {
    const { clockName, isClockVisible } = this.state;

    if (clockName !== prevState.clockName && isClockVisible) {
      window.console.debug(`Renamed from ${prevState.clockName} to ${clockName}`);
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  toggleClockVisibility = () => {
    this.setState((currentState) => ({
      isClockVisible: !currentState.isClockVisible,
    }));
  };

  render() {
    const { clockName, isClockVisible } = this.state;

    return (
      <div className="app">
        <Paper elevation={10}>
          <Box
            sx={{
              width: 400,
              height: 250,
              backgroundColor: 'lightgrey',
            }}
          >
            <div className="app__content">
              <h1>React clock</h1>

              {isClockVisible && <Clock name={clockName} />}

              <Button
                variant="contained"
                sx={{
                  width: 300,
                  background: 'grey',
                }}
                onClick={this.toggleClockVisibility}
              >
                click on me
              </Button>
            </div>
          </Box>
        </Paper>
      </div>
    );
  }
}
