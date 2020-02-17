import * as React from "react";
import { Button } from 'antd-mobile'
import "./Hello.css";
import { StoreState1 } from '../store/state'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as actions from '../store/actions'

export interface Props {
  name: string;
  enthusiamLevel: number;
  onIncrement: () => void
  onDecrement: () => void
}

class Hello extends React.Component<Props, {}> {
  render() {
    console.log(this.props.enthusiamLevel);
    const { enthusiamLevel } = this.props 
    if (enthusiamLevel < 1 ) {
      throw new Error("You could be a little more enthusiastic. :D");
    }
    return (
      <div className="hello">
        <div className="greeting">
          Hello 
          {this.props.name + getExclamationMarks(enthusiamLevel)}
        </div>
        <button onClick={this.props.onDecrement}>-</button>
        <button onClick={this.props.onIncrement}>+</button>
        <div>
          <Button type="primary">点我</Button>
        </div>
      </div>
    );
  }
}

export function mapStateToProps({ enthusiamLevel, languageName }: StoreState1) {
  return {
    enthusiamLevel,
    name: languageName
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    onIncrement: () => dispatch(actions.IncrementEnthusiasm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello)

function getExclamationMarks(numChars: number) {
  return '!'.repeat(numChars)
}
