import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    welcomeTxt: {
        fontFamily: "Poppins-Bold",
        fontSize: SIZES.xxLarge - 7,
        color: COLORS.black,
        marginTop: SIZES.xLarge,
        marginHorizontal: SIZES.small,
    },
    welcomeTxt2: {
        fontFamily: "Poppins-Bold",
        fontSize: SIZES.xxLarge - 7,
        color: COLORS.green,
        marginTop: -4,
        marginHorizontal: SIZES.small,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        height: 50,
        margin: SIZES.small
    },
    searchIcon: {
        color: COLORS.black,
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