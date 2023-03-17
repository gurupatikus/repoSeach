import React from "react";

interface InputProps {
  onChange: (text: string) => void
}

interface InputState {
  value: string,
  onTextChange: any
}

class RsInput extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
        this.state = { value: '', onTextChange: () => this.onTextChange };
    }

    onTextChange = (e: any) => {
        this.setState({ value: e.target.value });
        this.props.onChange(e.target.value)
    }

  render() {
    return (
      <form>
        <input type="search" name="repo_search" value={this.state.value} onChange={this.onTextChange} />
      </form>
    );
  }
}

export default RsInput;