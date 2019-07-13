import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Fab";
import Icon from "@material-ui/icons/Add";
import Popover from "@material-ui/core/Popover";

class CreateButton extends PureComponent {
  static propsTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    ButtonProps: PropTypes.object,
    PopoverProps: PropTypes.object
  };

  state = { anchorEl: null };

  render() {
    const { classes, id, children, ButtonProps, PopoverProps } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <Button
          aria-owns={this.isOpened() ? id : undefined}
          aria-haspopup="true"
          onClick={this.handlePopover}
          color="secondary"
          className={classes.button}
          {...ButtonProps}
        >
          <Icon className={classes.icon} />
        </Button>
        <Popover
          id={id}
          open={this.isOpened()}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          className={classes.popover}
          {...PopoverProps}
        >
          {children}
        </Popover>
      </>
    );
  }

  isOpened = () => Boolean(this.state.anchorEl);

  handlePopover = ({ currentTarget }) => {
    this.setState(({ anchorEl }) => ({ anchorEl: anchorEl ? null : currentTarget }));
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}

export default withStyles({
  button: {
    position: "fixed",
    right: 10,
    bottom: 10
  },
  icon: {},
  popover: {}
})(CreateButton);
