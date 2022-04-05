type RootStackParamList = {
  Auth: undefined;
  RootTabNavigator: undefined;
  Login: undefined;
  Home: undefined;
  Profile: {userId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};
