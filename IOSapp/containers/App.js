'use strict';

import ThemeColor from '../style/ColorTheme';
import MessageList from './MessageList';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
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

var App = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'home',
    };
  },

  componentWillMount: function() {
    // https://github.com/facebook/react-native/issues/1403 prevents this to work for initial load
    Icon.getImageSource('ios-gear', 30).then((source) => this.setState({ gearIcon: source }));
  },

  _renderContent: function(color: string, pageText: string) {
    if(!this.state.gearIcon) {
      return false;
    }
    const {
      socket,
    } = this.props;
    var props = { color, pageText, socket };
    return (
      <NavigatorIOS
        style={styles.navigator}
        barTintColor="#232323"
        titleTextColor="#fff"
        tintColor="#fff"
        translucent={false}
        initialRoute={{
          component: ColoredView,
          passProps: props,
          title: pageText,
          rightButtonIcon: this.state.gearIcon,
        }}
      />
    );
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor={ThemeColor.primaryColor}
        barTintColor={ThemeColor.highTextColor}>
        <Icon.TabBarItemIOS
          title="Home"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          {this._renderContent('#414A8C', 'Home')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Profile"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'profile'}
          onPress={() => {
            this.setState({
              selectedTab: 'profile',
            });
          }}>
          {this._renderContent('#090', 'Profile')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Starred"
          iconName="ios-star-outline"
          selectedIconName="ios-star"
          selected={this.state.selectedTab === 'starred'}
          onPress={() => {
            this.setState({
              selectedTab: 'starred',
            });
          }}>
          {this._renderContent('#900', 'Starred')}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Settings"
          iconName="ios-gear-outline"
          selectedIconName="ios-gear"
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          {this._renderContent('#009', 'Settings')}
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: ThemeColor.background,
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
});

export default App;
//export default SimpleExample;
//export default ScrollableTabsExample;
//export default OverlayExample;