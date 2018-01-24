import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Ingredients = ({ ingredients }) => (
  <View>
    <List>
      {ingredients.map(function(name, index) {
        return <li key={index}>{name}</li>;
      })}
    </List>
  </View>
);

Ingredients.propTypes = {
  ingredients: PropTypes.array.isRequired
};

export default Ingredients;
