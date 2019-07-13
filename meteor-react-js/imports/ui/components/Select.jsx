import PropTypes from "prop-types";
import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

const ITEM_TYPE = PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired
});

class SelectInput extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    items: PropTypes.arrayOf(ITEM_TYPE),
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    helperText: PropTypes.string,
    onChange: PropTypes.func,
    fullWidth: PropTypes.bool
  };

  static defaultProps = {
    items: []
  };

  constructor(props) {
    super(props);
    this.state = { value: this.getValue(props) };
  }

  render() {
    const { classes, id, name, placeholder, items, fullWidth } = this.props;
    const { value } = this.state;

    return (
      <FormControl fullWidth={fullWidth} className={classes.root}>
        {this.renderLabel()}
        <Select
          value={value}
          onChange={this.handleChange}
          input={<Input name={name} id={id} placeholder={placeholder} />}
          name={name}
          displayEmpty
          fullWidth={fullWidth}
        >
          {this.renderPlaceholder()}
          {items.map(item => this.renderItem(item))}
        </Select>
        {this.renderHelpText()}
      </FormControl>
    );
  }

  renderItem = ({ value, label }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  );

  renderLabel = () => {
    const { label, required, id } = this.props;

    return (
      label && (
        <InputLabel shrink required={required} htmlFor={id}>
          {label}
        </InputLabel>
      )
    );
  };

  renderPlaceholder = () => !isEmpty(this.props.placeholder) && <MenuItem value="">{this.props.placeholder}</MenuItem>;

  renderHelpText = () => {
    const { helperText } = this.props;
    return helperText && <FormHelperText>{helperText}</FormHelperText>;
  };

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
    this.props.onChange({ target });
  };

  getValue = ({ defaultValue, value }) => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    if (value !== undefined) {
      return value;
    }
    return "";
  };
}

export default withStyles({
  root: {
    minWidth: 150
  }
})(SelectInput);
