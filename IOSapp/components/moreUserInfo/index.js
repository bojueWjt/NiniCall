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
    const content = [
      (
        <View style={styles.contentStyle}>
          <Text style={styles.infoStyle}>地域: 广东 湛江</Text>
          <Text style={styles.infoStyle}>个性签名: we all in the gutter, but some of us looking at stars.</Text>
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
