import React from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function FAQ({ navigation }) {
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.buttonBack}
                >
                    <Ionicons name="chevron-back-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>FAQ</Text>

                <Text style={styles.section}>
                    Tanaman yang ditampilkan apa saja?
                </Text>
                <Text style={styles.content}>
                    GreenSaver menyediakan daftar tanaman rekomendasi yang cocok untuk ditanam, baik bagi pemula maupun mereka yang sudah berpengalaman. Tanaman-tanaman ini dipilih berdasarkan kemudahan perawatan, manfaat, dan popularitas. Beberapa tanaman yang direkomendasikan antara lain adalah tomat, cabai, basil, mint, lavender, dan bunga matahari.
                </Text>

                <Text style={styles.section}>
                    Apakah beginner-friendly?
                </Text>
                <Text style={styles.content}>
                    Setiap tanaman yang direkomendasikan dilengkapi dengan panduan langkah demi langkah cara menanam yang benar, mulai dari persiapan benih hingga cara merawat tanaman agar tumbuh subur. Selain itu, aplikasi ini juga memberikan tips praktis untuk mengatasi masalah yang sering dihadapi saat menanam, seperti cara mengatasi tanah yang terlalu kering atau cara memperbaiki kualitas tanah.
                </Text>

                <Text style={styles.section}>
                    Ensiklopedia Hama
                </Text>
                <Text style={styles.content}>
                    Salah satu fitur unggulan GreenSaver adalah ensiklopedia hama yang perlu diwaspadai oleh para petani. Ensiklopedia ini mencakup informasi detail mengenai jenis-jenis hama, cara mengenalinya, serta metode alami dan kimia untuk mengatasinya. Dengan fitur ini, pengguna dapat mencegah kerusakan tanaman akibat serangan hama dengan lebih efektif.
                </Text>

                <Text style={styles.section}>
                    Forum Diskusi
                </Text>
                <Text style={styles.content}>
                    GreenSaver juga menyediakan tempat berdiskusi bernama Forum Diskusi, di mana pengguna dapat berdiskusi dan berbagi pengalaman dengan sesama pecinta tanaman. Di sini, Anda bisa menanyakan berbagai hal, mulai dari tips perawatan tanaman tertentu hingga cara mengatasi masalah spesifik. Forum ini merupakan tempat yang tepat untuk mendapatkan saran dan dukungan dari komunitas yang memiliki minat yang sama.
                </Text>

                <Text style={styles.section}>
                    Fitur Deteksi Usia Tanaman
                </Text>
                <Text style={styles.content}>
                    Fitur deteksi usia tanaman di GreenSaver memungkinkan pengguna untuk melihat berapa hari tanaman sudah ditanam. Dengan fitur ini, Anda dapat mengetahui usia tanaman dari awal menanam sampai hari ini.
                </Text>

                <Text style={styles.section}>Mengapa Memilih GreenSaver?</Text>
                <Text style={styles.content}>
                    GreenSaver dirancang untuk menjadi solusi lengkap bagi siapa saja yang ingin memulai atau meningkatkan kemampuan bertanam mereka. Dengan fitur-fitur canggih dan informatif, aplikasi ini tidak hanya memudahkan proses menanam, tetapi juga memberikan pengetahuan yang diperlukan untuk merawat tanaman dengan baik. Selain itu, adanya komunitas dalam Forum memungkinkan pengguna untuk terus belajar dan berkembang bersama.
                </Text>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    section: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
    },
    header: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginTop: 45,
    },
});