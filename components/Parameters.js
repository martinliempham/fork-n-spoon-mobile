import React, { PureComponent } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Button } from 'react-native';

const urlPropsQueryConfig = {
  label: { type: UrlQueryParamTypes.string },
  calories: { type: UrlQueryParamTypes.number, queryParam: 'caloriesInUrl' }
};

class MainPage extends PureComponent {
  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    label: PropTypes.string,
    calories: PropTypes.number,

    onChangeCalories: PropTypes.func,
    onChangeLabel: PropTypes.func
  };

  static defaultProps = {
    calories: 123,
    label: 'chicken'
  };

  render() {
    const { calories, label, onChangecalories, onChangelabel } = this.props;

    return (
      <View>
        <View>
          calories={calories}
          <Button onPress={() => onChangecalories(999)}>
            Set calories to 999
          </Button>
        </View>
        <View>
          label={label}
          <Button onPress={() => onChangelabel('testing')}>
            Set label to "testing"
          </Button>
        </View>
      </View>
    );
  }
}

export default addUrlProps({ urlPropsQueryConfig })(MainPage);
