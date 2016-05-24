'use strict';

import ColorTheme from '../style/ColorTheme';
import MessageList from './MessageList';
import FindFriend from './FindFriend';
import FriendsList from './FriendsList';
import UserHome from './UserHome';
import Setting from './Setting';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Component,
  TouchableOpacity,
} = React;

var Icon = require('react-native-vector-icons/Ionicons');

var ColoredView = React.createClass({
  componentWillMount: function() {
    Icon.getImageSource('android-arrow-back', 30).then((source) => this.setState({ backIcon: source }));
  },
  _navigateToSubview: function() {
    this.props.navigator.push({
      component: ColoredView,
      title: this.props.pageText,
      leftButtonIcon: this.state.backIcon,
      onLeftButtonPress: () => this.props.navigator.pop(),
      passProps: this.props,
    });
  },
  render: function() {
    const { socket } = this.props;
    return (
      <View>
        <MessageList
          navigator={this.props.navigator}
          socket={socket}
        />
      </View>
    );
  }
});

class App extends Component {
  state = {
    selectedTab: 'NiniCall',
  };

  componentWillMount() {
    // https://github.com/facebook/react-native/issues/1403 prevents this to work for initial load
    Icon.getImageSource('plus-round', 25).then((source) => this.setState({ gearIcon: source }));
  }

  handleAddFriend = () => {
    this.refs.nav.push({
      component: FindFriend,
      title: '好友搜索',
    });
  };

  _renderSelectedComponent = (pageText) => {
    switch (pageText) {
      case 'NiniCall':
        return MessageList;
      case '好友列表':
        return FriendsList;
      case '个人':
        return UserHome;
      default:
        return Setting;
    }
  };

  _renderContent = (color: string, pageText: string) => {
    if(!this.state.gearIcon) {
      return false;
    }
    const {
      socket,
    } = this.props;
    const props = { color, pageText, socket };
    return (
      <NavigatorIOS
        style={styles.navigator}
        ref="nav"
        barTintColor={ColorTheme.barBackground}
        itemWrapperStyle={styles.pageBackgroundStyle}
        titleTextColor="#fff"
        tintColor="#fff"
        translucent={false}
        initialRoute={{
          component: this._renderSelectedComponent(pageText),
          passProps: props,
          title: pageText,
        }}
      />
    );
  };

  render() {
    return (
      <TabBarIOS
        tintColor={ColorTheme.primaryColor}
        barTintColor={ColorTheme.highTextColor}>
        <Icon.TabBarItemIOS
          title="NiniCall"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'NiniCall'}
          onPress={() => {
            this.setState({
              selectedTab: 'NiniCall',
            });
          }}>
          {this._renderContent('#414A8C', 'NiniCall')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="好友列表"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === '好友列表'}
          onPress={() => {
            this.setState({
              selectedTab: '好友列表',
            });
          }}>
          {this._renderContent('#090', '好友列表')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="个人"
          iconName="ios-star-outline"
          selectedIconName="ios-star"
          selected={this.state.selectedTab === '个人'}
          onPress={() => {
            this.setState({
              selectedTab: '个人',
            });
          }}>
          {this._renderContent('#900', '个人')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="设置"
          iconName="ios-gear-outline"
          selectedIconName="ios-gear"
          selected={this.state.selectedTab === '设置'}
          onPress={() => {
            this.setState({
              selectedTab: '设置',
            });
          }}>
          {this._renderContent('#009', '设置')}
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
};

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: ColorTheme.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
  button: {
    marginTop: 20,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  pageBackgroundStyle: {
    backgroundColor: ColorTheme.background,
  }
});

export default App;
//export default SimpleExample;
//export default ScrollableTabsExample;
//export default OverlayExample;