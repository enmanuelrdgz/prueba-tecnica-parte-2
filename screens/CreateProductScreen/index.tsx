"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CreateProductScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    imageUrl: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Health & Beauty",
    "Toys & Games",
    "Automotive",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    const { name, description, price, category, stock } = formData

    if (!name.trim()) {
      Alert.alert("Error", "Product name is required")
      return false
    }

    if (!description.trim()) {
      Alert.alert("Error", "Product description is required")
      return false
    }

    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert("Error", "Please enter a valid price")
      return false
    }

    if (!category.trim()) {
      Alert.alert("Error", "Please select a category")
      return false
    }

    if (!stock.trim() || isNaN(Number(stock)) || Number(stock) < 0) {
      Alert.alert("Error", "Please enter a valid stock quantity")
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false)

      // Show success message instead of making API call
      Alert.alert("Success!", `Product "${formData.name}" has been created successfully.`, [
        {
          text: "Create Another",
          onPress: () => {
            setFormData({
              name: "",
              description: "",
              price: "",
              category: "",
              stock: "",
              sku: "",
              imageUrl: "",
            })
          },
        },
        {
          text: "OK",
          style: "default",
        },
      ])
    }, 1500)
  }

  const CategorySelector = () => (
    <View style={styles.categoryContainer}>
      <Text style={styles.inputLabel}>Category *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryChip, formData.category === cat && styles.categoryChipSelected]}
            onPress={() => handleInputChange("category", cat)}
          >
            <Text style={[styles.categoryChipText, formData.category === cat && styles.categoryChipTextSelected]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Product</Text>
        <Text style={styles.headerSubtitle}>Add a new product to your inventory</Text>
      </View>

      <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            {/* Product Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Product Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter product name"
                placeholderTextColor="#6c757d"
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
                autoCapitalize="words"
              />
            </View>

            {/* Product Description */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter product description"
                placeholderTextColor="#6c757d"
                value={formData.description}
                onChangeText={(text) => handleInputChange("description", text)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Price and Stock Row */}
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Price *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#6c757d"
                  value={formData.price}
                  onChangeText={(text) => handleInputChange("price", text)}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Stock Quantity *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  placeholderTextColor="#6c757d"
                  value={formData.stock}
                  onChangeText={(text) => handleInputChange("stock", text)}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            {/* Category Selector */}
            <CategorySelector />

            {/* SKU */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>SKU (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter product SKU"
                placeholderTextColor="#6c757d"
                value={formData.sku}
                onChangeText={(text) => handleInputChange("sku", text)}
                autoCapitalize="characters"
              />
            </View>

            {/* Image URL */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Image URL (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="https://example.com/image.jpg"
                placeholderTextColor="#6c757d"
                value={formData.imageUrl}
                onChangeText={(text) => handleInputChange("imageUrl", text)}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <View style={styles.submitButtonContent}>
                  <Ionicons name="hourglass" size={20} color="#fff" />
                  <Text style={styles.submitButtonText}>Creating Product...</Text>
                </View>
              ) : (
                <View style={styles.submitButtonContent}>
                  <Ionicons name="add-circle" size={20} color="#fff" />
                  <Text style={styles.submitButtonText}>Create Product</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6c757d",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#212529",
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryChip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  categoryChipTextSelected: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#28a745",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: "#adb5bd",
  },
  submitButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
  },
})

export default CreateProductScreen
