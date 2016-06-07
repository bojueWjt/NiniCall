'use strict';

import ColorTheme from '../style/ColorTheme';
import MessageList from './MessageList';
import { userStorage } from '../Storage'
import FriendsList from './FriendsList';
import UserHome from './UserHome';
import Setting from './Setting';
import Socket from '../Socket';

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
    friendRequestNum: 0,
    chatNum: 0,
  };

  componentWillMount() {
    // https://github.com/facebook/react-native/issues/1403 prevents this to work for initial load
    const {
      userId
    } = this.props;

    const mySocket = Socket.bind(this);
    mySocket(userId);

    Icon.getImageSource('plus-round', 25).then((source) => this.setState({ gearIcon: source }));
  }


  addNewChat = (chat) => {
    const {
      chatList
    } = this.state;
    const newChatList = _.merge({}, chatList);
    newChatList[chat.id] = chat;
    this.setState({
      chatList: newChatList,
    });

  };

  handlePushChatMessage = (sendMessageInfo) => {
    const chatList = _.merge({}, this.state.chatList);
    chatList[sendMessageInfo.id].chatMessages.push({
      content: sendMessageInfo.content,
      type: 'to',
    });
  };

  handleClearFriendRequestNum = () => {
    this.setState({
      friendRequestNum: 0,
    })
  };

  handleClearChatNum = (num) => {
    this.setState({
      chatNum: this.state.chatNum - num,
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
      chatList,
      chatSocket,
      friendRequestNum,
    } = this.state;
    const props = {
      color,
      chatList: chatList,
      pageText,
      socket,
      chatSocket,
      handleClearChatNum: this.handleClearChatNum,
      handlePushChatMessage: this.handlePushChatMessage,
      friendRequestNum: friendRequestNum,
      handleClearFriendRequestNum: this.handleClearFriendRequestNum,
      addNewChat: this.addNewChat
    };


    return (<NavigatorIOS
      style={styles.navigator}
      ref="nav"
      barTintColor={ColorTheme.barBackground}
      itemWrapperStyle={styles.pageBackgroundStyle}
      titleTextColor="#fff"
      tintColor="#fff"
      translucent={false}
      initialRoute={{
          component: this._renderSelectedComponent(pageText),
          passProps: _.merge({}, props),
          title: pageText,
        }}
    />);
  };

  render() {
    const {
      friendRequestNum,
      chatNum
    } = this.state;
    console.log(chatNum);
    return (
      <TabBarIOS
        tintColor={ColorTheme.primaryColor}
        barTintColor={ColorTheme.highTextColor}>
        <Icon.TabBarItemIOS
          title="NiniCall"
          badge={ chatNum === 0 ? null : chatNum }
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
          badge={ friendRequestNum === 0 ? null : friendRequestNum }
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