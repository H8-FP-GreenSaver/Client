import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export const Dropdown = ({ plants, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(plants.length - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < plants.length) {
      setCurrentPage(currentPage + 1);
    }

    if (currentPage + 1 === plants.length) {
      setCurrentPage(0);
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[styles.dropdownHeader, styles.shadowProp]}
      >
        <Text style={styles.headerText}>{category}</Text>
        <Text style={styles.plantsAmount}>{plants.length} Tanaman</Text>
        <View>
          {!isOpen ? (
            <Feather name="chevron-down" size={24} color="#3D3D3D" />
          ) : (
            <Feather name="chevron-up" size={24} color="#3D3D3D" />
          )}
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            paddingTop: 0,
            gap: 8,
          }}
        >
          <TouchableOpacity onPress={handlePrevPage}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Image
              style={{ width: 230, height: 300, objectFit: "cover" }}
              source={{ uri: plants[currentPage].imageUrl }}
            />
            <Text style={{ fontWeight: "500", fontSize: 16, color: "#689867" }}>
              {plants[currentPage].name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextPage}>
            <Feather name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 24,
    backgroundColor: "white",
    borderRadius: 8,
  },
  dropdownHeader: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 8,
    zIndex: 1,
  },
  headerText: {
    marginEnd: "auto",
    fontSize: 16,
    color: "#689867",
  },
  dropdownList: {
    height: 300,
    backgroundColor: "white",
    borderRadius: 8,
  },
  optionItem: {
    alignItems: "center",
    padding: 10,
  },
  plantsAmount: {
    marginEnd: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#DBF0DA",
    color: "#689867",
  },
  shadowProp: {
    elevation: 8,
    shadowColor: "#3F3F3F",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
