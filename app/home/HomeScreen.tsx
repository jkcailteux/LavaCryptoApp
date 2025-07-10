import { SimpleCryptocoinView } from "@/components/cryptocoin/SimpleCryptocoinView";
import { useCryptoStore } from "@/stores/CryptocoinStore";
import { Cryptocoin } from "@/types/CryptoTypes";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a'
  },
  loadingText: {
    color: 'white',
    marginTop: 10
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 20
  }
});

export default function HomeScreen() {
  const { coins, isLoading: loading, error, fetchCoins } = useCryptoStore();

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading crypto data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderCoin = ({ item }: { item: Cryptocoin }) => {
    return <SimpleCryptocoinView coin={item} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Crypto Markets
      </Text>
      <FlatList
        data={coins}
        renderItem={renderCoin}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchCoins} />
        }
      />
    </View>
  );
}

