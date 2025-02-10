import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:userToken`
    )

    return accessToken ? accessToken : null;
  }

  async setAccessToken(accessToken) {
    
    await AsyncStorage.setItem(
      `${this.namespace}:userToken`,
      accessToken
    )
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:userToken`)
  }
}

export default AuthStorage;