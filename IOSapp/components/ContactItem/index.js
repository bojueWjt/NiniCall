import React from 'react-native';
import TouchItem from '../TouchItem';
import Icon from 'react-native-vector-icons/Ionicons';
import ColorTheme from '../../style/ColorTheme';
import SButton from '../SButton';
import { userFetch } from '../../Fetch';

const {
  Component,
  View,
  Text,
  StyleSheet,
  Alert,
} = React;

const containerStyle = {
  height: 50,
};

const agreeBtnStyle = {
  height: 30,
  width: 50,
};

const refuseBtnStyle = {
  height: 30,
  width: 50,
  backgroundColor: ColorTheme.errorColor,
  marginRight: 5,
};

var myIcon = (<Icon name="person" size={20} color={ColorTheme.barBackground} />);

class ContactItem extends Component {

  _handleAgreeRequest = () => {
    const {
      personInfo: {
        _id,
      }
    } = this.props;
    userFetch.agreeFriendRequest(_id, this._handleAgreeFriendRequestSuccess);
  };

  _handleAgreeFriendRequestSuccess = (data) => {
    const {
      changeStatus,
    } = this.props;
    if(data.code === 0) {
      changeStatus(data.id ,1);
    }else {
      Alert.alert(data.errorMessage);
    }
  };
  
  renderStatusView = () => {
    const {
      status
    } = this.props;

    if (status === 0) {
      return (
        <View style={styles.statusWrapStyle}>
          <View style={styles.rowView}>
            <SButton text="同意" btnStyle={agreeBtnStyle} handlePress={this._handleAgreeRequest}/>
            <SButton text="拒绝" btnStyle={refuseBtnStyle} />
          </View>
        </View>
      );
    }

    if (status === 1) {
      return (
        <View style={styles.statusWrapStyle}>
          <Text style={styles.statusText}>已同意</Text>
        </View>
      )
    }

    if (status === 2) {
      return (
        <View style={styles.statusWrapStyle}>
          <Text style={styles.statusText}>已拒绝</Text>
        </View>
      );
    }
  };

  render() {
    const {
      personInfo,
      status,
      handlePress,
    } = this.props;
    const StatusView = this.renderStatusView();
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
            {
              status || status === 0 ? StatusView : null
            }
          </View>
        )
      ]
    );
    return (
      <View>
        <TouchItem
          children={content}
          containerStyle={containerStyle}
          handlePress={handlePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageInfo: {
    flex: 4,
    flexDirection: 'row',
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
  statusWrapStyle: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  rowView: {
    flexDirection: 'row',
  },
  statusText: {
    color: ColorTheme.borderColor,
  }
});

export default ContactItem;
