import React, { useEffect } from 'react';

export const FacebookButton = () => {
  useEffect(() => {
    if (document.getElementById('facebook-jssdk')) {
      return;
    }

    const sdk = document.createElement('script');
    sdk.id = 'facebook-jssdk';
    sdk.src = 'https://connect.facebook.net/en_US/sdk.js';

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(sdk, firstScript);

    sdk.addEventListener('load', () => {
      const fb = window.FB;
      window.FB = undefined;

      // This subscribe the callback when login status change
      // Full list of events is here
      // https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/v2.9
      fb.Event.subscribe('auth.statusChange', self.onStatusChange.bind(self));
    });
    document.body.appendChild(scriptTag);





    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

  }, []);




  // This is the meat of the component
  // create a script tag, load FB SDK
  // then after script is loaded, set related behavior
  // If you have other components that rely on the FB SDK
  // I recommend extracting this into its own module
  let self = this;
  let scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=xxxxx";
  scriptTag.addEventListener('load', function (e) {
    self.FB = window.FB;
    // I don't like exposing the SDK to global scope
    window.FB = null;

    // This subscribe the callback when login status change
    // Full list of events is here
    // https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/v2.9
    self.FB.Event.subscribe('auth.statusChange', self.onStatusChange.bind(self));
  });
  document.body.appendChild(scriptTag);



};




import React, { Component } from 'react';

class FbLoginBtn extends Component {
  constructor(props) {
    super(props);

    // post login behavior should be defined at a higher level
    this.onSuccess = this.props.onSuccess || (() => { });
    this.onFailure = this.props.onFailure || (() => { });
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  componentDidMount() {
    // This is the meat of the component
    // create a script tag, load FB SDK
    // then after script is loaded, set related behavior
    // If you have other components that rely on the FB SDK
    // I recommend extracting this into its own module
    let self = this;
    let scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=xxxxx";
    scriptTag.addEventListener('load', function (e) {
      self.FB = window.FB;
      // I don't like exposing the SDK to global scope
      window.FB = null;

      // This subscribe the callback when login status change
      // Full list of events is here
      // https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/v2.9
      self.FB.Event.subscribe('auth.statusChange', self.onStatusChange.bind(self));
    });
    document.body.appendChild(scriptTag);
  }

  onStatusChange(response) {
    if (response.status === 'connected') {
      const { accessToken } = response.authResponse;
      // I have a afterLogin optional callback
      // which takes care of ads landing, invitation or any other custom behavior
      this.onSuccess(accessToken, this.props.afterLogin);
    } else {
      this.onFailure();
    }
  }

  render() {
    return (
      <div
        className="fb-login-button"
        data-width={this.props.width}
        data-max-rows="1"
        data-size="large"
        data-button-type="login_with"
        data-show-faces="false"
        data-auto-logout-link="true"
        data-use-continue-as="false"
        data-scope={this.props.dataScope}
      >
      </div>
    );
  }
}

export default FbLoginBtn;







class FacebookLoginButton extends Component {
  componentDidMount() {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    window.fbAsyncInit = () => {
      FB.init({
        appId: "9999999999999999", //Change with your Facebook app id
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.0"
      });

      FB.Event.subscribe("auth.statusChange", response => {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log(
            "[FacebookLoginButton] User cancelled login or did not fully authorize."
          );
        }
      });
    };
  }

  checkLoginState() {
    FB.getLoginStatus(
      function (response) {
        this.statusChangeCallback(response);
      }.bind(this)
    );
  }

  login() {
    FB.login(this.checkLoginState(), {
      scope: "email"
    });
  }

  statusChangeCallback(response) {
    if (response.status === "connected") {
      this.testAPI();
    } else if (response.status === "not_authorized") {
      console.log(
        "[FacebookLoginButton] Person is logged into Facebook but not your app"
      );
    } else {
      console.log("[FacebookLoginButton] Person is not logged into Facebook");
    }
  }

  testAPI() {
    FB.api("/me", function (response) {
      console.log("[FacebookLoginButton] Successful login for: ", response);
    });
  }

  render() {
    return (
      <button className="btn btn-block btn-fb" onClick={() => this.login()}>
        <i className="fa fa-facebook" /> Connect with Facebook{" "}
      </button>
    );
  }
}

export default FacebookLoginButton;
