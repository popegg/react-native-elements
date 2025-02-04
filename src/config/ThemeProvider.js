import React from 'react';
import PropTypes from 'prop-types';
import deepmerge from 'deepmerge';

import colors from './colors';

export const ThemeContext = React.createContext({
  theme: {
    colors,
  },
});

export default class ThemeProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.defaultTheme = deepmerge(
      {
        colors,
      },
      props.theme
    );
    this.state = {
      theme: this.defaultTheme,
    };
  }


  // ThemeProvider를 다른 HOC 안에서 쓸 때 필요
  static getDerivedStateFromProps(props, state) {
    return {theme: deepmerge({colors}, props.theme)};
  }

  updateTheme = updates => {
    this.setState(({ theme }) => ({
      theme: deepmerge(theme, updates),
    }));
  };

  replaceTheme = theme => {
    this.setState(() => ({
      theme: deepmerge(this.defaultTheme, theme),
    }));
  };

  getTheme = () => this.state.theme;

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          updateTheme: this.updateTheme,
          replaceTheme: this.replaceTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node.isRequired,
};

ThemeProvider.defaultProps = {
  theme: {},
};

export const ThemeConsumer = ThemeContext.Consumer;
