/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,

} from 'react-native';
import Navigation from './Navigation';
import { AuthContext } from './src/context/AuthContext_1';
// import { AuthProvider } from './src/context/AuthContext';
// import Odoo from 'react-native-odoo'

// const odoo = new Odoo({
//   host: 'http://172.16.0.86',
//   port: 5432,
//   db:"odoodb",
//   username: 'odoo',
//   password: 'pwd'
// });

const App = () => {

  const [user, setUser] = useState({});
  const UserProvider = useMemo(() => ({ user, setUser }), [user])



  return (
    // <AuthProvider>
    <AuthContext.Provider value={UserProvider}>
      <Navigation />
    </AuthContext.Provider>
    // </AuthProvider>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FBFC',
    paddingHorizontal: 20,
  },
  logo: {
    width: '70%',
    maxHeight: 200,
    marginBottom: 30,
  },
});

export default App;
