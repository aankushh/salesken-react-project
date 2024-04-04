import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TextInput, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'; // Import connect function
import { logout } from '../redux/actions/authActions'; // Import action 

const LaunchesList = () => {
  const [launches, setLaunches] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredLaunches, setFilteredLaunches] = useState([]);

  useEffect(() => {
    // Fetch data from SpaceX API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches');
        const data = await response.json();
        setLaunches(data);
        setFilteredLaunches(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = launches.filter(launch => launch.mission_name.toLowerCase().includes(text.toLowerCase()));
    setFilteredLaunches(filtered);
  };

  const handleLogin = () => {
    // Call loginSuccess action creator with user data
    dispatch(logout());
  };


  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Ensure leading zeros for day and month
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Return formatted date string
  return `${formattedDay}/${formattedMonth}/${year}`;
};


   return (
    <View>
      <Button style={styles.button} title="Logout" onPress={handleLogin} />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        placeholder="Search by title"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        horizontal
        data={filteredLaunches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={item.links.mission_patch} style={styles.image} />
              <Text style={styles.margin}>{formatDate(item.launch_date_local)}</Text>
              <Text style={styles.margin}>{item.rocket.rocket_name}</Text>
              <Text style={styles.margin}>{item.launch_site.site_name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 5,
    margin: 'auto',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    margin: 20,
    alignContent: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    width: 200,
  },  
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    margin: 'auto',
  },
});

export default connect()(LaunchesList);
