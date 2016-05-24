import React from 'react-native';
import TouchItem from '../TouchItem';
import Icon from 'react-native-vector-icons/Ionicons';
import ColorTheme from '../../style/ColorTheme';

const {
  Component,
  View,
  Text,
  StyleSheet,
} = React;

const containerStyle = {
  height: 50,
};

var myIcon = (<Icon name="person" size={20} color={ColorTheme.barBackground} />);

class ContactItem extends Component {

  handlePress = () => {
    console.log('what is this');
  };

  render() {
    const {
      personInfo,
    } = this.props;
    const content = (
      [
        (<View style={{ flex: 1 }} >
          <View style={styles.iconWrap}>
            {
              myIcon
            }
          </View>
        </View>),
        (
          <View style={styles.messageInfo}>
            <Text style={styles.personName}>{personInfo.username }</Text>
          </View>
        )
      ]
    );
    return (
      <View>
        <TouchItem
          children={content}
          containerStyle={containerStyle}
          handlePress={this.handlePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageInfo: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  personName: {
    fontSize: 14,
    marginTop: 5,
  },
  iconWrap: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorTheme.borderColor,
  },
});

export default ContactItem;
