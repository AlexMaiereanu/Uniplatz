import { StackNavigator } from 'react-navigation';
import SignupView from './signup';
import LoginView from './login';

/* this is the navigator between login and signup */
const AuthNavigator = StackNavigator({
    SignIn: {
        screen: LoginView,
        navigationOptions: {
            title: 'Login'
        },
    },
    SignUp: {
        screen: SignupView,
        navigationOptions: {
            title: 'SignUp'
        },
    },
},
{
    headerMode: 'none',
});

export default AuthNavigator;
