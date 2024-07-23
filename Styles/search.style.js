import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        height: 50,
        margin: SIZES.small,
    },
    searchIcon: {
        color: COLORS.gray,
        marginHorizontal: SIZES.xSmall,
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        marginRight: SIZES.small,
        borderRadius: SIZES.medium,
    },
    searchInput: {
        fontFamily: "Poppins-SemiBold",
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.small,
        color: COLORS.gray,
    },
    searchBtn: {
        width: 50,
        height: "100%",
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
    }
});

export default styles;