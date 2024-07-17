import React, { useEffect, useState } from "react";
import Axios from "../utils/axios";
import * as SecureStore from 'expo-secure-store';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const Dropdown = ({ plant, navigation }) => {
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
      setCurrentPage(plant.length - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < plant.length) {
      setCurrentPage(currentPage + 1);
    }

    if ((currentPage + 1) === plant.length) {
      setCurrentPage(0)
    }
  };


  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[styles.dropdownHeader, styles.shadowProp]}
      >
        <Text style={styles.headerText}>Tanaman {plant[0].Plant.Category.categoryName}</Text>
        <Text style={styles.plantsAmount}>{plant.length} Tanaman</Text>
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
          {plant.length > 0 && (
            <TouchableOpacity style={styles.optionItem} onPress={() => {
              navigation.navigate("PlantProgress", {id: plant[currentPage].Plant.id})
            }}>
              <Image
                style={{ width: 230, height: 300 }}
                source={{ uri: plant[currentPage]?.Plant?.imageUrl }}
              />
              <Text style={{ fontWeight: "500", fontSize: 16, color: "#689867" }}>
                {plant[currentPage]?.Plant?.plantName}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleNextPage}>
            <Feather name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          {/* {plant.map(plantTest => {
            // {console.log(plantTest.Plant.imageUrl, "=-=-=-==-=")}
            <>
              <TouchableOpacity onPress={handlePrevPage}>
                <Feather name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem}>
                <Image
                  style={{ width: 230, height: 300, objectFit: "cover" }}
                  source={{ uri: plantTest.Plant.imageUrl }}
                />
                <Text style={{ fontWeight: "500", fontSize: 16, color: "#689867" }}>
                  {plantTest?.Plant?.plantName}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextPage}>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
            </>
          })} */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 16,
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
