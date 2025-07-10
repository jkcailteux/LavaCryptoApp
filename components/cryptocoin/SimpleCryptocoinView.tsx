import { DarkTheme } from "@/themes/Themes";
import { Cryptocoin } from "@/types/CryptoTypes";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: DarkTheme.colors.border,
        backgroundColor: DarkTheme.colors.card,
        marginHorizontal: 12,
        marginVertical: 4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    logoImage: {
        width: 30,
        height: 30,
        borderRadius: 10
    },
    headerTextContainer: {
        flex: 1,
        marginRight: 8
    },
    headerText: {
        color: DarkTheme.colors.text,
        fontSize: 16,
        fontWeight: 'bold'
    },
    priceTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        minWidth: 80
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    priceChangeText: {
        fontSize: 12
    }
});

export interface SimpleCryptocoinViewProps {
    coin: Cryptocoin;
    onPress: () => void;
}

export function SimpleCryptocoinView({ coin, onPress }: SimpleCryptocoinViewProps) {
    const priceChangeColor = coin.priceChangePercentage24h >= 0 ? 'green' : 'red';

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image source={{ uri: coin.image }} style={styles.logoImage} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText} numberOfLines={2}>
                        {coin.name} ({coin.symbol.toUpperCase()})
                    </Text>
                </View>
                <View style={styles.priceTextContainer}>
                    <Text style={[styles.priceText, { color: priceChangeColor }]}>
                        ${coin.currentPrice?.toLocaleString()}
                    </Text>
                    <Text style={[styles.priceChangeText, { color: priceChangeColor }]}>
                        {coin.priceChangePercentage24h?.toFixed(2)}% (24h)
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    );
};