import React from "react";

interface InputProps {
  onChange: (text: string) => void
}

interface InputState {
  value: string,
  onTextChange: any
}

export default class RsInput extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
        // this.onTextChange = this.onTextChange.bind(this);
        this.state = { value: '', onTextChange: () => this.onTextChange };
    }

    onTextChange = (e: any) => {
        this.setState({ value: e.target.value });
        this.props.onChange(e.target.value)
    }

  render() {
    return (
      <form>
        <input type="text" value={this.state.value} onChange={this.onTextChange} />
      </form>
    );
  }
}