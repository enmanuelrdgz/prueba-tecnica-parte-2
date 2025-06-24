import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';

const CreateProductScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: '',
    imageUri: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // esto deberia venir de un servicio
  const mockCategories = [
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

  // Función para solicitar permisos y abrir la galería/cámara
  const pickImage = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permisos requeridos',
        'Necesitamos permisos para acceder a tu galería de fotos.'
      );
      return;
    }

    Alert.alert(
      'Seleccionar imagen',
      'Elige una opción',
      [
        {
          text: 'Cámara',
          onPress: () => openCamera(),
        },
        {
          text: 'Galería',
          onPress: () => openGallery(),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permisos requeridos',
        'Necesitamos permisos para acceder a tu cámara.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleInputChange('imageUri', result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleInputChange('imageUri', result.assets[0].uri);
    }
  };

  const removeImage = () => {
    Alert.alert(
      'Eliminar imagen',
      '¿Estás seguro de que quieres eliminar esta imagen?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            handleInputChange('imageUri', '');
          },
        },
      ]
    );
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

    // Simulamos una llamada a un servicio
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
              imageUri: '',
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
        {mockCategories.map((cat) => (
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

  const ImageSelector = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Product Image</Text>
      
      {/* Mostrar imagen seleccionada */}
      {(formData.imageUri) && (
        <View style={styles.imagePreviewContainer}>
          <Image
            source={{ uri: formData.imageUri }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={removeImage}
            activeOpacity={0.8}
          >
            <Ionicons name="close-circle" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      )}

      {/* Botones de selección */}
      <View style={styles.imageButtonsContainer}>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={pickImage}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8b5cf6', '#a855f7']}
            style={styles.imageButtonGradient}
          >
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

     
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
              
              {/* Image Selector */}
              <ImageSelector />

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

export default CreateProductScreen;