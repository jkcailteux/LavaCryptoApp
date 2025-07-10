import { RawColors } from "@/constants/RawColors";
import { Theme } from "@react-navigation/native";

export const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: RawColors.White,
        background: RawColors.Dark1,
        text: RawColors.White,
        card: RawColors.Dark2,
        border: RawColors.Dark3,
        notification: RawColors.Dark4,
    },
    fonts: {
        regular: {
            fontFamily: 'SpaceMono',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'SpaceMono',
            fontWeight: 'normal',
        },
        bold: {
            fontFamily: 'SpaceMono',
            fontWeight: 'bold',
        },
        heavy: {
            fontFamily: 'SpaceMono',
            fontWeight: 'normal',
        },
    }
};
