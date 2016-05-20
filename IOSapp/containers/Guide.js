import React from 'react-native';
import Login from './login';
import Register from './RegisterStep1';

const {
  Component,
} = React;

class Guide extends Component {

  state = {
    isLogin: true,
  };

  handleToRegister = () => {
    this.setState({
      isLogin: false,
    });
  };

  handleToLogin = () => {
    this.setState({
      isLogin: true,
    })
  };

  render() {
    const {
      isLogin,
    } = this.state;
    let showPage = '';
    console.log(isLogin);
    if (isLogin) {
      showPage = (<Login
        {...this.props}
        handleToRegister={this.handleToRegister}
      />);
    } else {
      showPage = (<Register
        handleToLogin={this.handleToLogin}
      />);
    }
    console.log(showPage);
    return (
      showPage
    );
  }
}

export default Guide;