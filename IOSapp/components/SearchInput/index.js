import React from 'react-native';
import ThemeColor from '../../style/ColorTheme';
import Icon from 'react-native-vector-icons/Ionicons';

const {
  Component,
  View,
  TextInput,
  StyleSheet,
} = React;

class SearchInput extends Component {

  render() {
    const {
      handleChangeText,
      onSubmitEditing,
      onFocus,
      autoFocus,
      onBlur
    } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          blurOnSubmit={false}
          onFocus={onFocus}
          autoFocus={autoFocus}
          onChangeText={handleChangeText}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize="none"
        />
        <View style={styles.iconWrap}>
          <Icon name="search" size={24} color={ThemeColor.labelTextColor} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    height: 48,
    borderColor: ThemeColor.borderColor,
    flexDirection: 'row',
    backgroundColor: ThemeColor.background,
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  input: {
    marginLeft: 8,
    marginTop: 8,
    paddingLeft: 8,
    height: 32,
    flex: 5,
    color: ThemeColor.inputTextColor,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default SearchInput;
