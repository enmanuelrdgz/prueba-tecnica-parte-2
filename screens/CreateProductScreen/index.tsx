import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const CreateProductScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: '',
    imageUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Health & Beauty',
    'Toys & Games',
    'Automotive',
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const validateForm = () => {
    const { name, description, price, category, stock } = formData;

    if (!name.trim()) {
      Alert.alert('Error', 'Product name is required');
      return false;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Product description is required');
      return false;
    }

    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return false;
    }

    if (!category.trim()) {
      Alert.alert('Error', 'Please select a category');
      return false;
    }

    if (!stock.trim() || isNaN(Number(stock)) || Number(stock) < 0) {
      Alert.alert('Error', 'Please enter a valid stock quantity');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);

      Alert.alert('Success!', `Product "${formData.name}" has been created successfully.`, [
        {
          text: 'Create Another',
          onPress: () => {
            setFormData({
              name: '',
              description: '',
              price: '',
              category: '',
              stock: '',
              sku: '',
              imageUrl: '',
            });
          },
        },
        {
          text: 'OK',
          style: 'default',
        },
      ]);
    }, 1500);
  };

  const renderInput = (
    field,
    label,
    placeholder,
    options = {}
  ) => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              options.multiline && styles.textArea,
              {
                borderColor: focusedInput === field ? '#8b5cf6' : '#e5e7eb',
                borderWidth: focusedInput === field ? 2 : 1,
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            value={formData[field]}
            onChangeText={(text) => handleInputChange(field, text)}
            onFocus={() => handleInputFocus(field)}
            onBlur={() => handleInputBlur()}
            {...options}
          />
        </View>
      </View>
    );
  };

  const CategorySelector = () => (
    <View style={styles.categoryContainer}>
      <Text style={styles.inputLabel}>Category *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryChip, formData.category === cat && styles.categoryChipSelected]}
            onPress={() => handleInputChange('category', cat)}
            activeOpacity={0.8}
          >
            {formData.category === cat ? (
              <LinearGradient
                colors={['#8b5cf6', '#a855f7']}
                style={styles.categoryChipGradient}
              >
                <Text style={styles.categoryChipTextSelected}>{cat}</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.categoryChipText}>{cat}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient colors={['#ffffff', '#faf5ff']} style={styles.headerGradient}>
          <Text style={styles.headerTitle}>Create Product</Text>
          <Text style={styles.headerSubtitle}>Add a new product to your inventory</Text>
        </LinearGradient>
      </View>

      <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <LinearGradient colors={['#ffffff', '#fefbff']} style={styles.formGradient}>
              {/* Product Name */}
              {renderInput('name', 'Product Name *', 'Enter product name', {
                autoCapitalize: 'words',
              })}

              {/* Product Description */}
              {renderInput('description', 'Description *', 'Enter product description', {
                multiline: true,
                numberOfLines: 4,
                textAlignVertical: 'top',
              })}

              {/* Price and Stock Row */}
              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>Price *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor: focusedInput === 'price' ? '#8b5cf6' : '#e5e7eb',
                          borderWidth: focusedInput === 'price' ? 2 : 1,
                        },
                      ]}
                      placeholder="0.00"
                      placeholderTextColor="#9ca3af"
                      value={formData.price}
                      onChangeText={(text) => handleInputChange('price', text)}
                      onFocus={() => handleInputFocus('price')}
                      onBlur={() => handleInputBlur()}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>Stock Quantity *</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor: focusedInput === 'stock' ? '#8b5cf6' : '#e5e7eb',
                          borderWidth: focusedInput === 'stock' ? 2 : 1,
                        },
                      ]}
                      placeholder="0"
                      placeholderTextColor="#9ca3af"
                      value={formData.stock}
                      onChangeText={(text) => handleInputChange('stock', text)}
                      onFocus={() => handleInputFocus('stock')}
                      onBlur={() => handleInputBlur()}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              </View>

              {/* Category Selector */}
              <CategorySelector />
              
              {/* SKU */}
              {renderInput('sku', 'SKU (Optional)', 'Enter product SKU', {
                autoCapitalize: 'characters',
              })}

              {/* Image URL */}
              {renderInput('imageUrl', 'Image URL (Optional)', 'https://example.com/image.jpg', {
                keyboardType: 'url',
                autoCapitalize: 'none',
              })}

              {/* Submit Button */}
              <View>
                <TouchableOpacity
                  style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={isSubmitting ? ['#9ca3af', '#6b7280'] : ['#8b5cf6', '#a855f7', '#9333ea']}
                    style={styles.submitButtonGradient}
                  >
                    <View style={styles.submitButtonContent}>
                      {isSubmitting ? (
                        <>
                          <Ionicons name="hourglass" size={20} color="#fff" />
                          <Text style={styles.submitButtonText}>Creating Product...</Text>
                        </>
                      ) : (
                        <>
                          <Ionicons name="add-circle" size={20} color="#fff" />
                          <Text style={styles.submitButtonText}>Create Product</Text>
                        </>
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    margin: 16,
    borderRadius: 20,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formGradient: {
    borderRadius: 20,
    padding: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 100,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    marginRight: 8,
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryChipSelected: {
    borderColor: '#8b5cf6',
  },
  categoryChipGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryChipText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryChipTextSelected: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  submitButton: {
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    shadowOpacity: 0.1,
  },
  submitButtonGradient: {
    borderRadius: 16,
    paddingVertical: 16,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});

export default CreateProductScreen;