import { SimpleCryptocoinView } from "@/components/cryptocoin/SimpleCryptocoinView";
import useDebounce from "@/hooks/useDebounce";
import { useCryptoStore } from "@/stores/CryptocoinStore";
import { Cryptocoin } from "@/types/CryptoTypes";
import { DarkTheme } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Modal, RefreshControl, StyleSheet, Text, TextInput, View } from "react-native";
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

  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const filteredCoins = useMemo(() => {
    if (debouncedSearchQuery.length === 0) {
      return coins;
    }
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [coins, debouncedSearchQuery]);

  useEffect(() => {
    fetchCoins();
  }, []);

  const renderCoin = useCallback(({ item }: { item: Cryptocoin }) => {
    return <SimpleCryptocoinView coin={item} onPress={() => {
      setSelectedCoin(item);
      setIsModalVisible(true);
    }} />;
  }, []);

  const handleRefresh = useCallback(() => {
    fetchCoins();
  }, [fetchCoins]);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

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
        <TextInput
          style={styles.searchInput}
          placeholder="Search Coins"
          onChangeText={handleSearch}
          value={searchQuery}
          autoFocus={true}
          clearButtonMode="while-editing"
          autoCorrect={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Crypto Markets
      </Text>
      {errorView}
      <FlatList
        data={filteredCoins}
        renderItem={renderCoin}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={searchView}
      />

      <Modal
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <CryptocoinDetailsModal
          coin={selectedCoin}
          onClose={handleCloseModal}
        />
      </Modal>

    </SafeAreaView>
  );
}

