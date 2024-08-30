import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Test() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  const fetchLiveMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.elbotola.com/analytics/v2/matches/?lang=fr&status=Playing');
      setMatches(response.data.results || []);
    } catch (error) {
      console.error('Error fetching live matches:', error);
      setError('Failed to load live matches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatScore = (scores) => {
    return `${scores.ft.home} - ${scores.ft.away}`;
  };

  const formatTime = (time) => {
    if (typeof time !== 'string') return 'N/A';
    return time.replace('Z', '').slice(0, 5); // Remove 'Z' and get the time part
  };

  const renderMatchItem = (item) => {
    return (
      <View style={styles.row} key={item.match_id}>
        <Text style={styles.cell}>{item.contestant[0].name}</Text>
        <Text style={styles.cell}>{formatScore(item.match_details.scores)}</Text>
        <Text style={styles.cell}>{item.contestant[1].name}</Text>
        <Text style={styles.cell}>{formatTime(item.time)}</Text>
        <Text style={styles.cell}>{item.match_details.match_time} min</Text> 
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0F3510" style={styles.loader} />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchLiveMatches}>
          <Text style={styles.refreshButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Live Matches</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchLiveMatches}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Home Team</Text>
            <Text style={styles.headerCell}>Score</Text>
            <Text style={styles.headerCell}>Away Team</Text>
            <Text style={styles.headerCell}>Time</Text>
            <Text style={styles.headerCell}>Match Time</Text>
          </View>
          {matches.length > 0 ? matches.map(renderMatchItem) : (
            <View style={styles.row}>
              <Text style={styles.cell}>No live matches available</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    marginTop:'10%',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#0F3510',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  table: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    marginVertical: 5,
  },
  headerCell: {
    flex: 1,
    padding: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
  },
  cell: {
    flex: 1,
    padding: 12,
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
});
