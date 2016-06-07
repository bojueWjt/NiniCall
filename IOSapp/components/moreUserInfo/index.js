import React from 'react-native';
import TouchItem from '../TouchItem';

const {
  Component,
  View,
  Text,
  StyleSheet,
} = React;

class MoreUserInfo extends Component {
  
  render() {
    const {
      personInfo: {
        local,
        motto,
      }
    } = this.props;
    const content = [
      (
        <View style={styles.contentStyle}>
          <Text style={styles.infoStyle}>地域: { local ? local : '未填写'}</Text>
          <Text style={styles.infoStyle}>个性签名: { motto ? motto : '未填写'}</Text>
        </View>
      )
    ];

    return (
      <View style={styles.container}>
        <TouchItem children={content} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  contentStyle: {
    flex: 1,
  },
  infoStyle: {
    fontSize: 14,
    lineHeight: 20,
  }
});

export default MoreUserInfo;
