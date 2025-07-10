import { Cryptocoin } from "@/types/CryptoTypes";
import { DarkTheme } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DarkTheme.colors.card,
        paddingTop: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: DarkTheme.colors.border,
    },
    coinLogo: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    coinInfo: {
        flex: 1,
    },
    coinName: {
        color: DarkTheme.colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    coinSymbol: {
        color: DarkTheme.colors.text,
        fontSize: 16,
    },
    content: {
        flex: 1,
    },
    detailSection: {
        paddingHorizontal: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: DarkTheme.colors.border,
    },
    detailLabel: {
        color: DarkTheme.colors.text,
        fontSize: 16,
    },
    detailValue: {
        color: DarkTheme.colors.text,
        fontSize: 16,
    },
    priceSection: {
        marginBottom: 30,
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: DarkTheme.colors.border,
    },
    currentPrice: {
        color: DarkTheme.colors.text,
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    priceChange: {
        fontSize: 20,
        fontWeight: '600',
    },
    sectionTitle: {
        color: DarkTheme.colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 4,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: DarkTheme.colors.background,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1000,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: DarkTheme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: DarkTheme.colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    }
});

function renderDetailRow(label: string, value: string | number | undefined | null) {
    let valueText = value?.toLocaleString() || 'Unknown';
    if (value?.toLocaleString() === 'undefined' || value?.toLocaleString() === 'null') {
        valueText = 'Unknown';
    }

    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{valueText}</Text>
        </View>
    );
}

export interface CryptocoinDetailsModalProps {
    coin: Cryptocoin | undefined;
    onClose?: () => void;
}

export default function CryptocoinDetailsModal({ coin, onClose }: CryptocoinDetailsModalProps) {
    if (!coin) {
        return null;
    }

    const priceChangeColor = coin.priceChangePercentage24h >= 0 ? 'green' : 'red';

    return (
        <View style={styles.modalContainer}>
            {onClose && (
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <Text style={styles.closeButtonText}>x</Text>
                </TouchableOpacity>
            )}
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={{ uri: coin.image }} style={styles.coinLogo} />
                    <View style={styles.coinInfo}>
                        <Text style={styles.coinName}>{coin.name}</Text>
                        <Text style={styles.coinSymbol}>{coin.symbol.toUpperCase()}</Text>
                    </View>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.priceSection}>
                        <Text style={styles.currentPrice}>
                            ${coin.currentPrice?.toLocaleString()}
                        </Text>
                        <Text style={[styles.priceChange, { color: priceChangeColor }]}>
                            {coin.priceChangePercentage24h >= 0 ? '+' : ''}
                            {coin.priceChangePercentage24h?.toFixed(2)}% (24h)
                        </Text>
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.sectionTitle}>Market Details</Text>
                        {renderDetailRow('Market Cap', `$${coin.marketCap}`)}
                        {renderDetailRow('Market Cap Rank', `#${coin.marketCapRank}`)}
                        {renderDetailRow('Total Volume', `$${coin.totalVolume}`)}
                        {renderDetailRow('Total Supply', `${coin.totalSupply}`)}
                        {renderDetailRow('Max Supply', `${coin.maxSupply}`)}
                        {renderDetailRow('Circulating Supply', `${coin.circulatingSupply}`)}
                        {renderDetailRow('24h High', `$${coin.high24h}`)}
                        {renderDetailRow('24h Low', `$${coin.low24h}`)}
                    </View>
                </ScrollView>
            </View >
        </View >
    );
}