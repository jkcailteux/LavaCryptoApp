import { SimpleCryptocoinView } from "@/components/cryptocoin/SimpleCryptocoinView";
import { RawColors } from "@/constants/RawColors";
import { useCryptoStore } from "@/stores/CryptocoinStore";
import { Cryptocoin } from "@/types/CryptoTypes";
import { DarkTheme } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Modal, RefreshControl, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CryptocoinDetailsModal from "../details/CryptocoinDetailsModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.colors.background
  },
  title: {
    color: DarkTheme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DarkTheme.colors.background,
    margin: 20,
  },
  loadingText: {
    color: DarkTheme.colors.text,
    marginTop: 10
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DarkTheme.colors.background,
    margin: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 20
  },
  searchContainer: {
    marginHorizontal: 12,
    marginVertical: 20,
  },
  searchInput: {
    borderRadius: 10,
    padding: 14,
    backgroundColor: DarkTheme.colors.border,
    color: DarkTheme.colors.text,
    fontSize: 16,
  },
});

export default function HomeScreen() {
  const { coins, isLoading, error, fetchCoins } = useCryptoStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<Cryptocoin | undefined>(undefined);

  const filteredCoins = useMemo(() => {
    if (searchQuery.length === 0) {
      return coins;
    }
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [coins, searchQuery]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  let loadingView = null;
  if (isLoading) {
    loadingView = (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={RawColors.White} />
        <Text style={styles.loadingText}>Loading crypto data...</Text>
      </View>
    );
  }

  let errorView = null;
  if (error) {
    errorView = (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  let searchView = null;
  if (coins.length > 0) {
    searchView = (
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search Coins" onChangeText={setSearchQuery} autoFocus={true} clearButtonMode="while-editing" autoCorrect={false} />
      </View>
    );
  }

  const renderCoin = ({ item }: { item: Cryptocoin }) => {
    return <SimpleCryptocoinView coin={item} onPress={() => {
      setSelectedCoin(item);
      setIsModalVisible(true);
    }} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Crypto Markets
      </Text>
      {loadingView}
      {errorView}
      <FlatList
        data={filteredCoins}
        renderItem={renderCoin}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchCoins} />
        }
        ListHeaderComponent={searchView}
      />

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <CryptocoinDetailsModal
          coin={selectedCoin}
          onClose={() => setIsModalVisible(false)}
        />
      </Modal>

    </SafeAreaView>
  );
}

