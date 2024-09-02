

import { GoogleOAuthProvider } from '@react-oauth/google';
import Messenger from "./components/Messenger"

import AccountProvider from './context/AccountProvider';

function App() {

  const clientId='229143859379-ao00rrou1khdfh2i51old74it4b8s507.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
      
    </GoogleOAuthProvider>
  );
}

export default App;
