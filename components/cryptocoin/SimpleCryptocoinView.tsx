import { Cryptocoin } from "@/types/CryptoTypes";
import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        backgroundColor: '#2a2a2a',
        marginHorizontal: 12,
        marginVertical: 4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    logoImage: {
        width: 20,
        height: 20,
        borderRadius: 10
    },
    priceTextContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    priceText: {
        fontSize: 18
    },
    priceChangeText: {
        fontSize: 12
    }
});

export function SimpleCryptocoinView({ coin }: { coin: Cryptocoin }) {
    const priceChangeColor = coin.price_change_percentage_24h >= 0 ? 'green' : 'red';

    return (
        <View style={styles.container}>
            <Image source={{ uri: coin.image }} style={styles.logoImage} />
            <Text style={styles.headerText}>
                {coin.name} ({coin.symbol.toUpperCase()})
            </Text>
            <View style={styles.priceTextContainer}>
                <Text style={[styles.priceText, { color: priceChangeColor }]}>
                    ${coin.current_price?.toLocaleString()}
                </Text>
                <Text style={[styles.priceChangeText, { color: priceChangeColor }]}>
                    {coin.price_change_percentage_24h?.toFixed(2)}% (24h)
                </Text>
            </View>
        </View>
    );
};